"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Save, ShoppingBag, Filter, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// 식품 데이터베이스
const foodDatabase = [
  {
    id: "1",
    name: "건조 라면",
    category: "dinner",
    calories: 380,
    weight: 100,
    protein: 8,
    carbs: 52,
    fat: 14,
    tags: ["간편식", "따뜻한 식사"],
    purchaseLink: "https://example.com/ramen",
    isLocal: true,
    allergens: ["밀"],
  },
  {
    id: "2",
    name: "에너지바",
    category: "snack",
    calories: 250,
    weight: 60,
    protein: 10,
    carbs: 30,
    fat: 12,
    tags: ["간식", "에너지"],
    purchaseLink: "https://example.com/energybar",
    isLocal: true,
    allergens: ["견과류"],
  },
  {
    id: "3",
    name: "건조 쇠고기 육포",
    category: "snack",
    calories: 150,
    weight: 30,
    protein: 25,
    carbs: 3,
    fat: 5,
    tags: ["단백질", "간식"],
    purchaseLink: "https://example.com/jerky",
    isLocal: true,
    allergens: [],
  },
  {
    id: "4",
    name: "오트밀",
    category: "breakfast",
    calories: 150,
    weight: 40,
    protein: 5,
    carbs: 27,
    fat: 3,
    tags: ["아침식사", "따뜻한 식사"],
    purchaseLink: "https://example.com/oatmeal",
    isLocal: true,
    allergens: ["글루텐"],
  },
  {
    id: "5",
    name: "건조 스크램블 에그",
    category: "breakfast",
    calories: 120,
    weight: 25,
    protein: 12,
    carbs: 2,
    fat: 8,
    tags: ["아침식사", "단백질"],
    purchaseLink: "https://example.com/eggs",
    isLocal: false,
    allergens: ["계란"],
  },
  {
    id: "6",
    name: "동결건조 카레",
    category: "dinner",
    calories: 400,
    weight: 120,
    protein: 15,
    carbs: 45,
    fat: 18,
    tags: ["저녁식사", "따뜻한 식사"],
    purchaseLink: "https://example.com/curry",
    isLocal: true,
    allergens: [],
  },
  {
    id: "7",
    name: "트레일 믹스",
    category: "snack",
    calories: 180,
    weight: 40,
    protein: 6,
    carbs: 20,
    fat: 10,
    tags: ["간식", "에너지"],
    purchaseLink: "https://example.com/trailmix",
    isLocal: true,
    allergens: ["견과류"],
  },
  {
    id: "8",
    name: "건조 파스타",
    category: "dinner",
    calories: 350,
    weight: 100,
    protein: 12,
    carbs: 70,
    fat: 2,
    tags: ["저녁식사", "따뜻한 식사"],
    purchaseLink: "https://example.com/pasta",
    isLocal: true,
    allergens: ["밀"],
  },
  {
    id: "9",
    name: "프로틴 쉐이크 파우더",
    category: "breakfast",
    calories: 120,
    weight: 30,
    protein: 20,
    carbs: 5,
    fat: 2,
    tags: ["아침식사", "단백질"],
    purchaseLink: "https://example.com/protein",
    isLocal: false,
    allergens: ["유제품"],
  },
  {
    id: "10",
    name: "건조 과일 믹스",
    category: "snack",
    calories: 150,
    weight: 40,
    protein: 1,
    carbs: 35,
    fat: 0,
    tags: ["간식", "과일"],
    purchaseLink: "https://example.com/driedfruit",
    isLocal: true,
    allergens: [],
  },
  {
    id: "11",
    name: "초콜릿 바",
    category: "snack",
    calories: 220,
    weight: 50,
    protein: 3,
    carbs: 25,
    fat: 12,
    tags: ["간식", "에너지"],
    purchaseLink: "https://example.com/chocolate",
    isLocal: true,
    allergens: ["유제품"],
  },
  {
    id: "12",
    name: "동결건조 비빔밥",
    category: "dinner",
    calories: 320,
    weight: 110,
    protein: 12,
    carbs: 55,
    fat: 8,
    tags: ["저녁식사", "따뜻한 식사"],
    purchaseLink: "https://example.com/bibimbap",
    isLocal: true,
    allergens: [],
  },
  {
    id: "13",
    name: "에너지 젤",
    category: "snack",
    calories: 100,
    weight: 30,
    protein: 0,
    carbs: 25,
    fat: 0,
    tags: ["간식", "에너지"],
    purchaseLink: "https://example.com/gel",
    isLocal: false,
    allergens: [],
  },
  {
    id: "14",
    name: "인스턴트 커피",
    category: "breakfast",
    calories: 5,
    weight: 5,
    protein: 0,
    carbs: 1,
    fat: 0,
    tags: ["아침식사", "음료"],
    purchaseLink: "https://example.com/coffee",
    isLocal: true,
    allergens: [],
  },
  {
    id: "15",
    name: "건조 수프",
    category: "lunch",
    calories: 150,
    weight: 40,
    protein: 5,
    carbs: 20,
    fat: 5,
    tags: ["점심식사", "따뜻한 식사"],
    purchaseLink: "https://example.com/soup",
    isLocal: true,
    allergens: [],
  },
  {
    id: "16",
    name: "토르티야",
    category: "lunch",
    calories: 150,
    weight: 40,
    protein: 4,
    carbs: 25,
    fat: 4,
    tags: ["점심식사", "랩"],
    purchaseLink: "https://example.com/tortilla",
    isLocal: true,
    allergens: ["밀"],
  },
  {
    id: "17",
    name: "참치 파우치",
    category: "lunch",
    calories: 120,
    weight: 85,
    protein: 25,
    carbs: 0,
    fat: 2,
    tags: ["점심식사", "단백질"],
    purchaseLink: "https://example.com/tuna",
    isLocal: true,
    allergens: ["생선"],
  },
  {
    id: "18",
    name: "땅콩 버터",
    category: "lunch",
    calories: 190,
    weight: 32,
    protein: 8,
    carbs: 6,
    fat: 16,
    tags: ["점심식사", "단백질"],
    purchaseLink: "https://example.com/peanutbutter",
    isLocal: true,
    allergens: ["견과류"],
  },
]

// 식품 카테고리
const mealCategories = [
  { id: "breakfast", name: "아침" },
  { id: "lunch", name: "점심" },
  { id: "dinner", name: "저녁" },
  { id: "snack", name: "간식" },
]

// 알레르기 목록
const allergensList = ["밀", "견과류", "유제품", "계란", "생선", "글루텐"]

// 식품 아이템 타입 정의
type FoodItem = {
  id: string
  name: string
  category: string
  calories: number
  weight: number
  protein: number
  carbs: number
  fat: number
  tags: string[]
  purchaseLink: string
  isLocal: boolean
  allergens: string[]
  quantity?: number
  day?: number
}

// 식단 계획 타입 정의
type MealPlan = {
  id: string
  name: string
  days: number
  items: FoodItem[]
  preferences: {
    calories: number
    allergens: string[]
    localOnly: boolean
  }
}

export default function FoodPlanner() {
  // 여행 일수
  const [tripDays, setTripDays] = useState(3)
  // 하루 목표 칼로리
  const [targetCalories, setTargetCalories] = useState(2500)
  // 현재 식단 계획
  const [mealPlan, setMealPlan] = useState<FoodItem[]>([])
  // 현재 선택된 날짜
  const [selectedDay, setSelectedDay] = useState(1)
  // 현재 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState("breakfast")
  // 알레르기 필터
  const [allergenFilters, setAllergenFilters] = useState<string[]>([])
  // 로컬 식품만 표시
  const [localOnly, setLocalOnly] = useState(false)
  // 저장된 식단 계획 목록
  const [savedMealPlans, setSavedMealPlans] = useState<MealPlan[]>([])
  // 현재 식단 계획 이름
  const [currentPlanName, setCurrentPlanName] = useState("")
  // 현재 식단 계획 ID
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null)
  // 다이얼로그 열림 상태
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // 필터 다이얼로그 열림 상태
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)

  // 로컬 스토리지에서 저장된 식단 계획 불러오기
  useEffect(() => {
    const savedPlans = localStorage.getItem("backpackingMealPlans")
    if (savedPlans) {
      setSavedMealPlans(JSON.parse(savedPlans))
    }
  }, [])

  // 저장된 식단 계획 업데이트 시 로컬 스토리지에 저장
  useEffect(() => {
    if (savedMealPlans.length > 0) {
      localStorage.setItem("backpackingMealPlans", JSON.stringify(savedMealPlans))
    }
  }, [savedMealPlans])

  // 필터링된 식품 목록
  const getFilteredFoods = () => {
    return foodDatabase.filter((food) => {
      // 알레르기 필터
      if (allergenFilters.length > 0 && food.allergens.some((allergen) => allergenFilters.includes(allergen))) {
        return false
      }
      // 로컬 식품만 표시
      if (localOnly && !food.isLocal) {
        return false
      }
      return true
    })
  }

  // 식품 추가
  const addFoodToMealPlan = (food: FoodItem) => {
    const newFood = {
      ...food,
      day: selectedDay,
      quantity: 1,
    }
    setMealPlan([...mealPlan, newFood])
  }

  // 식품 제거
  const removeFoodFromMealPlan = (index: number) => {
    const newMealPlan = [...mealPlan]
    newMealPlan.splice(index, 1)
    setMealPlan(newMealPlan)
  }

  // 식품 수량 변경
  const updateFoodQuantity = (index: number, quantity: number) => {
    const newMealPlan = [...mealPlan]
    newMealPlan[index] = { ...newMealPlan[index], quantity }
    setMealPlan(newMealPlan)
  }

  // 현재 식단 계획 저장
  const saveCurrentMealPlan = () => {
    if (!currentPlanName || mealPlan.length === 0) return

    const newPlan: MealPlan = {
      id: currentPlanId || Date.now().toString(),
      name: currentPlanName,
      days: tripDays,
      items: [...mealPlan],
      preferences: {
        calories: targetCalories,
        allergens: allergenFilters,
        localOnly: localOnly,
      },
    }

    if (currentPlanId) {
      // 기존 계획 업데이트
      setSavedMealPlans(savedMealPlans.map((plan) => (plan.id === currentPlanId ? newPlan : plan)))
    } else {
      // 새 계획 추가
      setSavedMealPlans([...savedMealPlans, newPlan])
    }

    setCurrentPlanId(newPlan.id)
    setIsDialogOpen(false)
  }

  // 저장된 식단 계획 불러오기
  const loadMealPlan = (planId: string) => {
    const plan = savedMealPlans.find((p) => p.id === planId)
    if (plan) {
      setMealPlan(plan.items)
      setTripDays(plan.days)
      setTargetCalories(plan.preferences.calories)
      setAllergenFilters(plan.preferences.allergens)
      setLocalOnly(plan.preferences.localOnly)
      setCurrentPlanName(plan.name)
      setCurrentPlanId(plan.id)
    }
  }

  // 저장된 식단 계획 삭제
  const deleteMealPlan = (planId: string) => {
    setSavedMealPlans(savedMealPlans.filter((plan) => plan.id !== planId))
    if (currentPlanId === planId) {
      setMealPlan([])
      setCurrentPlanName("")
      setCurrentPlanId(null)
    }
  }

  // 새 식단 계획 시작
  const startNewMealPlan = () => {
    setMealPlan([])
    setCurrentPlanName("")
    setCurrentPlanId(null)
  }

  // 특정 날짜와 카테고리의 식품 목록
  const getMealsByDayAndCategory = (day: number, category: string) => {
    return mealPlan.filter((meal) => meal.day === day && meal.category === category)
  }

  // 특정 날짜의 총 칼로리
  const getTotalCaloriesByDay = (day: number) => {
    return mealPlan
      .filter((meal) => meal.day === day)
      .reduce((total, meal) => total + meal.calories * (meal.quantity || 1), 0)
  }

  // 특정 날짜의 총 무게
  const getTotalWeightByDay = (day: number) => {
    return mealPlan
      .filter((meal) => meal.day === day)
      .reduce((total, meal) => total + meal.weight * (meal.quantity || 1), 0)
  }

  // 총 무게
  const getTotalWeight = () => {
    return mealPlan.reduce((total, meal) => total + meal.weight * (meal.quantity || 1), 0)
  }

  // 총 칼로리
  const getTotalCalories = () => {
    return mealPlan.reduce((total, meal) => total + meal.calories * (meal.quantity || 1), 0)
  }

  // 칼로리 대비 무게 효율성 (칼로리/g)
  const getCalorieToWeightRatio = () => {
    const totalWeight = getTotalWeight()
    if (totalWeight === 0) return 0
    return getTotalCalories() / totalWeight
  }

  // 식품 추천
  const getRecommendedFoods = () => {
    // 현재 선택된 날짜의 칼로리
    const currentDayCalories = getTotalCaloriesByDay(selectedDay)
    // 남은 칼로리
    const remainingCalories = targetCalories - currentDayCalories

    // 필터링된 식품 중 현재 카테고리에 맞는 식품
    const categoryFoods = getFilteredFoods().filter((food) => food.category === selectedCategory)

    // 칼로리 효율이 좋은 순으로 정렬 (칼로리/g)
    return categoryFoods
      .map((food) => ({
        ...food,
        efficiency: food.calories / food.weight,
      }))
      .sort((a, b) => b.efficiency - a.efficiency)
      .slice(0, 3)
  }

  // 식재료 리스트 생성
  const generateIngredientList = () => {
    const ingredients: { [key: string]: { item: FoodItem; totalQuantity: number } } = {}

    mealPlan.forEach((meal) => {
      if (!ingredients[meal.id]) {
        ingredients[meal.id] = {
          item: meal,
          totalQuantity: 0,
        }
      }
      ingredients[meal.id].totalQuantity += meal.quantity || 1
    })

    return Object.values(ingredients)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{currentPlanName ? currentPlanName : "새 식단 계획"}</CardTitle>
              <div className="flex gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      저장
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>식단 계획 저장</DialogTitle>
                      <DialogDescription>현재 식단 계획에 이름을 지정하고 저장하세요.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="plan-name">계획 이름</Label>
                        <Input
                          id="plan-name"
                          value={currentPlanName}
                          onChange={(e) => setCurrentPlanName(e.target.value)}
                          placeholder="예: 3일 백패킹 식단"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={saveCurrentMealPlan}>저장하기</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" onClick={startNewMealPlan}>
                  새 계획
                </Button>
                <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      필터
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>식품 필터 설정</DialogTitle>
                      <DialogDescription>알레르기 및 기타 선호도를 설정하세요.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>알레르기 제외</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {allergensList.map((allergen) => (
                            <div key={allergen} className="flex items-center space-x-2">
                              <Checkbox
                                id={`allergen-${allergen}`}
                                checked={allergenFilters.includes(allergen)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setAllergenFilters([...allergenFilters, allergen])
                                  } else {
                                    setAllergenFilters(allergenFilters.filter((a) => a !== allergen))
                                  }
                                }}
                              />
                              <Label htmlFor={`allergen-${allergen}`}>{allergen}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="local-only"
                          checked={localOnly}
                          onCheckedChange={(checked) => setLocalOnly(!!checked)}
                        />
                        <Label htmlFor="local-only">로컬 식품만 표시</Label>
                      </div>
                      <div className="grid gap-2">
                        <Label>하루 목표 칼로리: {targetCalories}kcal</Label>
                        <Slider
                          value={[targetCalories]}
                          min={1500}
                          max={4000}
                          step={100}
                          onValueChange={(value) => setTargetCalories(value[0])}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>여행 일수: {tripDays}일</Label>
                        <Slider
                          value={[tripDays]}
                          min={1}
                          max={14}
                          step={1}
                          onValueChange={(value) => {
                            setTripDays(value[0])
                            if (selectedDay > value[0]) {
                              setSelectedDay(value[0])
                            }
                          }}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setIsFilterDialogOpen(false)}>적용</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <CardDescription>
              {tripDays}일 여행을 위한 식단을 계획하세요. 하루 목표 칼로리: {targetCalories}kcal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Label>날짜 선택</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from({ length: tripDays }, (_, i) => i + 1).map((day) => (
                  <Button
                    key={day}
                    variant={selectedDay === day ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}일차
                  </Button>
                ))}
              </div>
            </div>

            <Tabs defaultValue="breakfast" onValueChange={setSelectedCategory}>
              <TabsList className="mb-4">
                {mealCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {mealCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            {selectedDay}일차 {category.name}
                          </CardTitle>
                          <CardDescription>
                            현재 선택: {getTotalCaloriesByDay(selectedDay)}kcal / {targetCalories}kcal
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {getMealsByDayAndCategory(selectedDay, category.id).length === 0 ? (
                            <div className="text-center text-muted-foreground p-4">
                              아직 추가된 식품이 없습니다. 오른쪽 목록에서 식품을 추가하세요.
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {getMealsByDayAndCategory(selectedDay, category.id).map((meal, index) => {
                                const mealIndex = mealPlan.findIndex(
                                  (m) => m.id === meal.id && m.day === meal.day && m.category === meal.category,
                                )
                                return (
                                  <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                                    <div>
                                      <div className="font-medium">{meal.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {meal.calories * (meal.quantity || 1)}kcal /{" "}
                                        {meal.weight * (meal.quantity || 1)}g
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Select
                                        value={String(meal.quantity || 1)}
                                        onValueChange={(value) => updateFoodQuantity(mealIndex, Number(value))}
                                      >
                                        <SelectTrigger className="w-16">
                                          <SelectValue placeholder="수량" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {[1, 2, 3, 4, 5].map((num) => (
                                            <SelectItem key={num} value={String(num)}>
                                              {num}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFoodFromMealPlan(mealIndex)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>추천 식품</CardTitle>
                          <CardDescription>칼로리/무게 효율이 좋은 식품</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {getRecommendedFoods().map((food) => (
                              <div key={food.id} className="flex justify-between items-center p-2 border rounded-md">
                                <div>
                                  <div className="font-medium">{food.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {food.calories}kcal / {food.weight}g
                                    <span className="ml-2">
                                      <Badge variant="outline">{(food.calories / food.weight).toFixed(1)}kcal/g</Badge>
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {food.tags.map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                    {food.isLocal && (
                                      <Badge variant="success" className="text-xs">
                                        로컬
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <Button size="sm" onClick={() => addFoodToMealPlan(food)}>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="w-full">
                                더 많은 식품 보기
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                              {getFilteredFoods()
                                .filter((food) => food.category === category.id)
                                .map((food) => (
                                  <DropdownMenuItem key={food.id} onClick={() => addFoodToMealPlan(food)}>
                                    {food.name} ({food.calories}kcal)
                                  </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>식단 요약</CardTitle>
            <CardDescription>일자별 칼로리 및 무게</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: tripDays }, (_, i) => i + 1).map((day) => {
                const calories = getTotalCaloriesByDay(day)
                const weight = getTotalWeightByDay(day)
                const calorieRatio = (calories / targetCalories) * 100
                return (
                  <div key={day} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span>{day}일차</span>
                      <div className="flex items-center gap-2">
                        <span>{calories}kcal</span>
                        <Badge variant={calorieRatio >= 90 ? "success" : "secondary"}>{calorieRatio.toFixed(0)}%</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>무게</span>
                      <span>{weight}g</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: `${Math.min(calorieRatio, 100)}%` }}></div>
                    </div>
                  </div>
                )
              })}

              <div className="pt-4 mt-4 border-t">
                <div className="flex justify-between items-center font-bold">
                  <span>총 무게</span>
                  <span>{getTotalWeight()}g</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>총 칼로리</span>
                  <span>{getTotalCalories()}kcal</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>칼로리/무게 효율</span>
                  <Badge variant="outline">{getCalorieToWeightRatio().toFixed(1)}kcal/g</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>식재료 리스트</CardTitle>
            <CardDescription>필요한 모든 식재료</CardDescription>
          </CardHeader>
          <CardContent>
            {mealPlan.length === 0 ? (
              <div className="text-center text-muted-foreground p-4">
                아직 추가된 식품이 없습니다. 식단을 구성하면 자동으로 식재료 리스트가 생성됩니다.
              </div>
            ) : (
              <div className="space-y-2">
                {generateIngredientList().map(({ item, totalQuantity }) => (
                  <div key={item.id} className="flex justify-between items-center p-2 border rounded-md">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.weight * totalQuantity}g / {item.calories * totalQuantity}kcal
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>{totalQuantity}개</Badge>
                      {item.purchaseLink && (
                        <a href={item.purchaseLink} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm">
                            <ShoppingBag className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>저장된 식단 계획</CardTitle>
            <CardDescription>저장한 식단 계획을 불러오거나 관리하세요</CardDescription>
          </CardHeader>
          <CardContent>
            {savedMealPlans.length === 0 ? (
              <div className="text-center text-muted-foreground p-4">저장된 식단 계획이 없습니다.</div>
            ) : (
              <div className="space-y-2">
                {savedMealPlans.map((plan) => (
                  <div key={plan.id} className="flex justify-between items-center p-2 border rounded-md">
                    <span className="cursor-pointer flex-grow" onClick={() => loadMealPlan(plan.id)}>
                      {plan.name} ({plan.days}일)
                    </span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => loadMealPlan(plan.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteMealPlan(plan.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>백패킹 식품 팁</CardTitle>
            <CardDescription>효율적인 식품 선택을 위한 팁</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <strong>칼로리 밀도가 높은 식품</strong>을 선택하세요. 무게 대비 칼로리가 높을수록 효율적입니다.
              </p>
              <p>
                <strong>물 없이 먹을 수 있는 식품</strong>을 포함하면 물 사용을 최소화할 수 있습니다.
              </p>
              <p>
                <strong>조리가 간편한 식품</strong>을 선택하면 연료와 시간을 절약할 수 있습니다.
              </p>
              <p>
                <strong>단백질, 탄수화물, 지방의 균형</strong>을 맞추면 지속적인 에너지를 공급받을 수 있습니다.
              </p>
              <p>
                <strong>개별 포장된 식품</strong>은 보관과 관리가 용이하지만 쓰레기가 많이 발생할 수 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
