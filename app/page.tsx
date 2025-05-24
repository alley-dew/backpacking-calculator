"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WeightCalculator from "@/components/weight-calculator"
import FoodPlanner from "@/components/food-planner"
import TrackingRoutes from "@/components/tracking-routes"

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4">
      <div className="flex flex-col items-center mb-16">
        <h1 className="text-3xl font-bold mb-4">백패킹 도구</h1>
        <p className="text-muted-foreground text-center max-w-4xl">
          장비 무게 계산, 식단 계획, 트래킹 루트 정보를 통해 효율적인 백패킹 여행을 준비하세요.
        </p>
      </div>

      <Tabs defaultValue="weight" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="weight">무게 계산기</TabsTrigger>
          <TabsTrigger value="food">음식 플래너</TabsTrigger>
          <TabsTrigger value="routes">트래킹 루트</TabsTrigger>
        </TabsList>
        <TabsContent value="weight" className="h-[1504px]">
          <WeightCalculator />
        </TabsContent>
        <TabsContent value="food">
          <FoodPlanner />
        </TabsContent>
        <TabsContent value="routes">
          <TrackingRoutes />
        </TabsContent>
      </Tabs>
    </main>
  )
}
