'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Meal {
  name: string;
  calories: number;
}

const recommendedFoods = [
  { name: '견과류 믹스', calories: 600, weight: 100 },
  { name: '프리미엄 초콜릿', calories: 550, weight: 100 },
  { name: '건조 과일', calories: 300, weight: 100 },
  { name: '프리미엄 에너지바', calories: 400, weight: 100 },
];

export default function FoodPlanner() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [newMeal, setNewMeal] = useState({ name: '', calories: '' });

  const addMeal = (name: string, calories: number) => {
    setMeals([...meals, { name, calories }]);
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>식단 계획</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="meal-name">식품명</Label>
              <Input
                id="meal-name"
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                placeholder="식품명을 입력하세요"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="meal-calories">칼로리 (kcal)</Label>
              <Input
                id="meal-calories"
                type="number"
                value={newMeal.calories}
                onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                placeholder="칼로리를 입력하세요"
              />
            </div>
            <Button onClick={() => {
              if (newMeal.name && newMeal.calories) {
                addMeal(newMeal.name, Number(newMeal.calories));
                setNewMeal({ name: '', calories: '' });
              }
            }}>추가</Button>
            
            <div className="mt-4">
              <h3 className="font-medium">추가된 식품</h3>
              <div className="mt-2 space-y-2">
                {meals.map((meal, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-secondary rounded">
                    <span>{meal.name}</span>
                    <span>{meal.calories}kcal</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm">
                총 칼로리: {totalCalories}kcal
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>추천 식품</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">칼로리/무게 효율이 좋은 식품</p>
          <div className="space-y-2">
            {recommendedFoods.map((food, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-secondary rounded">
                <div>
                  <div className="font-medium">{food.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {food.calories}kcal / {food.weight}g
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addMeal(food.name, food.calories)}
                >
                  추가
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 