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
        targetDate: true,
        dietaryPreferences: true,
        targetCalories: true,
        targetProtein: true,
        targetCarbs: true,
        targetFats: true,
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
        targetDate: profile.targetDate,
        dietaryPreferences: profile.dietaryPreferences || [],
      },
    });
  }

  async updateUserTargets(userId: string, targets: MacroTargets): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        targetCalories: targets.calories,
        targetProtein: targets.protein,
        targetCarbs: targets.carbs,
        targetFats: targets.fats,
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
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        targetCalories: true,
        targetProtein: true,
        targetCarbs: true,
        targetFats: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      calories: user.targetCalories,
      protein: user.targetProtein,
      carbs: user.targetCarbs,
      fats: user.targetFats,
    };
  }
}

