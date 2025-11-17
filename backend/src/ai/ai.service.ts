import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { MealAnalysis, ChatMessage, DailySummary } from '../shared/types';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GOOGLE_AI_API_KEY');

    if (!apiKey) {
      throw new Error('GOOGLE_AI_API_KEY is not set in environment variables');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash or gemini-1.5-pro for vision capabilities
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  }

  async analyzeMealImage(imageBuffer: Buffer, mimeType: string): Promise<MealAnalysis> {
    try {
      const prompt = `
Analyze this image and determine if it contains food/meal items.

STEP 1 - VALIDATION:
First, validate if this image contains actual food or meal items. The image must show:
- Edible food items (meals, dishes, ingredients, snacks, beverages)
- NOT: people, animals, objects, text documents, landscapes, or non-food items

If the image does NOT contain food, return:
{
  "isFood": false,
  "foodItems": [],
  "calories": 0,
  "protein": 0,
  "carbs": 0,
  "fats": 0,
  "confidence": 0
}

STEP 2 - ANALYSIS (only if isFood is true):
If the image contains food, provide a detailed nutritional breakdown:
1. Identify ALL food items visible in the image
2. Estimate portion sizes realistically
3. Calculate total calories for the entire meal
4. Calculate macronutrients:
   - Protein (in grams)
   - Carbohydrates (in grams)
   - Fats (in grams)
5. Calculate health score (1-10) based on:
   - Nutritional balance (protein, carbs, fats ratios)
   - Food quality (whole foods, vegetables, lean proteins = higher score)
   - Processing level (highly processed foods = lower score)
   - Calorie density (moderate portions = better score)
   - Overall meal composition (balanced meals = higher score)
   Score guidelines:
   - 8-10: Excellent (balanced, whole foods, nutrient-dense)
   - 6-7: Good (mostly healthy, minor issues)
   - 4-5: Average (mixed quality, some processed items)
   - 1-3: Poor (highly processed, unbalanced, low nutritional value)

Return the response in this exact JSON format (no markdown, just JSON):
{
  "isFood": true,
  "foodItems": ["item1", "item2"],
  "calories": 650,
  "protein": 45,
  "carbs": 60,
  "fats": 20,
  "healthScore": 7,
  "confidence": 0.85
}

Be accurate and realistic with portion size estimates. If you cannot identify the food, estimate based on visual appearance.
`;

      // Convert image buffer to base64
      const imageBase64 = imageBuffer.toString('base64');

      const result = await this.model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageBase64,
            mimeType: mimeType,
          },
        },
      ]);

      const response = await result.response;
      console.log(response);
      const text = response.text();
      console.log('AI Response Text:', text);

      // Parse JSON from response
      // Remove markdown code blocks if present
      let jsonText = text.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/g, '');
      }

      const analysis = JSON.parse(jsonText) as MealAnalysis;

      // Validate and ensure all required fields
      const isFood = analysis.isFood !== false; // Default to true if not specified
      
      // Validate and clamp health score to 1-10
      let healthScore = analysis.healthScore;
      if (healthScore !== undefined) {
        healthScore = Math.max(1, Math.min(10, Math.round(healthScore)));
      }
      
      return {
        isFood,
        foodItems: analysis.foodItems || [],
        calories: analysis.calories || 0,
        protein: analysis.protein || 0,
        carbs: analysis.carbs || 0,
        fats: analysis.fats || 0,
        healthScore: isFood ? healthScore : undefined,
        confidence: analysis.confidence || (isFood ? 0.5 : 0),
      };
    } catch (error) {
      console.error('Error analyzing meal image:', error);
      throw new Error(`Failed to analyze meal image: ${error.message}`);
    }
  }

  private stripMarkdown(text: string): string {
    return text
      .replace(/```[\s\S]*?```/g, (match) => match.replace(/```/g, ''))
      .replace(/`([^`]*)`/g, '$1')
      .replace(/[*_~]+/g, '')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/^\s*-\s+/gm, '• ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  private formatClientContext(summary?: DailySummary): string {
    if (!summary) {
      return '';
    }

    const { targets, consumed, remaining, date, meals } = summary;

    const formatRow = (label: string, macros: { calories: number; protein: number; carbs: number; fats: number }) =>
      `${label}: ${macros.calories} cal, P ${macros.protein}g, C ${macros.carbs}g, F ${macros.fats}g`;

    const parts = [
      `Date: ${date}`,
      formatRow('Targets', targets),
      formatRow('Consumed', consumed),
      formatRow('Remaining', remaining),
    ];

    if (meals?.length) {
      const topMeals = meals.slice(0, 3).map((meal) => `${meal.name} (${meal.calories} cal)`);
      parts.push(`Recent meals: ${topMeals.join('; ')}${meals.length > 3 ? '...' : ''}`);
    }

    return parts.join('\n');
  }

  async generateMeatCoachAdvice(
    prompt: string,
    history: ChatMessage[] = [],
    summary?: DailySummary,
  ): Promise<string> {
    try {
      const guardrails = `You are Cal AI's meat-focused nutrition coach.
Respond with concise (<=180 words) and practical guidance about meats, proteins, cooking methods, and macro alignment.
Keep a supportive tone, mention portion sizes when relevant, and list quick action steps when possible.
Return plain text only. Never use markdown, headings, bullet markup, or special formatting symbols.`;

      const historyBlock = history
        .map((message) => `${message.role === 'user' ? 'User' : 'Coach'}: ${message.content}`)
        .join('\n')
        .trim();

      const finalPromptParts = [guardrails];

      const clientContext = this.formatClientContext(summary);
      if (clientContext) {
        finalPromptParts.push(`Client stats:\n${clientContext}`);
      }
      if (historyBlock) {
        finalPromptParts.push(`Conversation so far:\n${historyBlock}`);
      }
      finalPromptParts.push(`User: ${prompt}\nCoach:`);

      const result = await this.model.generateContent(finalPromptParts);
      const response = await result.response;
      const text = response.text().trim();
      const cleaned = this.stripMarkdown(text);

      return cleaned || 'I need a bit more detail to help with that meat question.';
    } catch (error) {
      console.error('Error generating meat chat advice:', error);
      throw new Error('Failed to generate meat chat response');
    }
  }
}
