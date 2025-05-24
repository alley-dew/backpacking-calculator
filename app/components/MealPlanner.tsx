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

export function MealPlanner() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [newMeal, setNewMeal] = useState({ name: '', calories: '' });

  const addMeal = () => {
    if (newMeal.name && newMeal.calories) {
      setMeals([...meals, { 
        name: newMeal.name, 
        calories: Number(newMeal.calories) 
      }]);
      setNewMeal({ name: '', calories: '' });
    }
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>식단 추가</CardTitle>
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
          <Button onClick={addMeal}>추가</Button>
          
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
  );
} 