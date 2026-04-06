import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserProfile, MacroTargets } from '../shared/types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string, role: 'user' | 'admin' = 'user') {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        age: true,
        gender: true,
        height: true,
        weight: true,
        birthDate: true,
        workoutsPerWeek: true,
        activityLevel: true,
        goal: true,
        targetWeight: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
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
    await this.prisma.user.update({
      where: { id: userId },
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
    const now = new Date();
    // End the current active period(s)
    await this.prisma.targetPeriod.updateMany({
      where: { userId, endDate: null },
      data: { endDate: now },
    });

    // Create new active period
    await this.prisma.targetPeriod.create({
      data: {
        userId,
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

  async updateUserRole(userId: string, role: 'user' | 'admin'): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }

  async getUserTargets(userId: string): Promise<MacroTargets | null> {
    const period = await this.prisma.targetPeriod.findFirst({
      where: { userId, endDate: null },
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

