import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserProfile, MacroTargets } from '../shared/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
          create: {},
        },
      },
      include: {
        profile: true,
      },
    });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
    await this.prisma.profile.update({
      where: { userId },
      data: {
        age: profile.age,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        birthDate: profile.birthDate,
        workoutsPerWeek: profile.workoutsPerWeek,
        activityLevel: profile.activityLevel,
        goal: profile.goal,
        targetWeight: profile.targetWeight,
      },
    });
  }

  async updateUserTargets(userId: string, targets: MacroTargets, goal?: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user || !user.profile) return;

    const now = new Date();
    // End the current active period(s)
    await this.prisma.targetPeriod.updateMany({
      where: { profileId: user.profile.id, endDate: null },
      data: { endDate: now },
    });

    // Create new active period
    await this.prisma.targetPeriod.create({
      data: {
        profileId: user.profile.id,
        startDate: now,
        endDate: null,
        calories: targets.calories,
        protein: targets.protein,
        carbs: targets.carbs,
        fats: targets.fats,
        goal: goal,
      },
    });
  }

  async getUserTargets(userId: string): Promise<MacroTargets | null> {
    const user = await this.getUserById(userId);
    if (!user || !user.profile) return null;

    const period = await this.prisma.targetPeriod.findFirst({
      where: { profileId: user.profile.id, endDate: null },
      orderBy: { startDate: 'desc' },
    });

    if (!period) {
      return null;
    }

    return {
      calories: period.calories,
      protein: period.protein,
      carbs: period.carbs,
      fats: period.fats,
    };
  }
}

