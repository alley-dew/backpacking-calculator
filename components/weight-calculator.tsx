"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Trash2, Edit, Info } from "lucide-react"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// 장비 카테고리 정의
const categories = [
  { id: "clothing", name: "의류" },
  { id: "shelter", name: "텐트/쉘터" },
  { id: "sleep", name: "수면 장비" },
  { id: "kitchen", name: "취사 도구" },
  { id: "food", name: "음식/물" },
  { id: "backpack", name: "배낭" },
  { id: "electronics", name: "전자기기" },
  { id: "misc", name: "기타" },
]

// UL 기준 정의 (그램 단위)
const ulStandards = {
  clothing: 1500,
  shelter: 1000,
  sleep: 1000,
  kitchen: 500,
  food: 2000,
  backpack: 1000,
  electronics: 500,
  misc: 500,
  total: 7000, // 총 7kg이 UL 기준
}

// 장비 아이템 타입 정의
type Item = {
  id: string
  name: string
  weight: number
  category: string
}

// 저장된 장비 리스트 타입 정의
type SavedList = {
  id: string
  name: string
  items: Item[]
  createdAt: number
}

export default function WeightCalculator() {
  // 현재 아이템 목록 상태
  const [items, setItems] = useState<Item[]>([])
  // 새 아이템 입력 상태
  const [newItem, setNewItem] = useState<Partial<Item>>({
    name: "",
    weight: 0,
    category: "clothing",
  })
  // 저장된 장비 리스트 상태
  const [savedLists, setSavedLists] = useState<SavedList[]>([])
  // 현재 리스트 이름 상태
  const [currentListName, setCurrentListName] = useState<string>("")
  // 현재 리스트 ID 상태
  const [currentListId, setCurrentListId] = useState<string | null>(null)
  // 다이얼로그 열림 상태
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // 로컬 스토리지에서 저장된 리스트 불러오기
  useEffect(() => {
    const savedListsFromStorage = localStorage.getItem("backpackingLists")
    if (savedListsFromStorage) {
      setSavedLists(JSON.parse(savedListsFromStorage))
    }
  }, [])

  // 저장된 리스트 업데이트 시 로컬 스토리지에 저장
  useEffect(() => {
    if (savedLists.length > 0) {
      localStorage.setItem("backpackingLists", JSON.stringify(savedLists))
    }
  }, [savedLists])

  // 새 아이템 추가 함수
  const addItem = () => {
    if (!newItem.name || !newItem.weight) return

    const item: Item = {
      id: Date.now().toString(),
      name: newItem.name,
      weight: newItem.weight,
      category: newItem.category || "clothing",
    }

    setItems([...items, item])
    setNewItem({ name: "", weight: 0, category: newItem.category })
  }

  // 아이템 삭제 함수
  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  // 현재 리스트 저장 함수
  const saveCurrentList = () => {
    if (!currentListName || items.length === 0) return

    const newList: SavedList = {
      id: currentListId || Date.now().toString(),
      name: currentListName,
      items: [...items],
      createdAt: Date.now(),
    }

    if (currentListId) {
      // 기존 리스트 업데이트
      setSavedLists(savedLists.map((list) => (list.id === currentListId ? newList : list)))
    } else {
      // 새 리스트 추가
      setSavedLists([...savedLists, newList])
    }

    setCurrentListId(newList.id)
    setIsDialogOpen(false)
  }

  // 저장된 리스트 불러오기 함수
  const loadList = (listId: string) => {
    const list = savedLists.find((l) => l.id === listId)
    if (list) {
      setItems(list.items)
      setCurrentListName(list.name)
      setCurrentListId(list.id)
    }
  }

  // 저장된 리스트 삭제 함수
  const deleteList = (listId: string) => {
    setSavedLists(savedLists.filter((list) => list.id !== listId))
    if (currentListId === listId) {
      setItems([])
      setCurrentListName("")
      setCurrentListId(null)
    }
  }

  // 새 리스트 시작 함수
  const startNewList = () => {
    setItems([])
    setCurrentListName("")
    setCurrentListId(null)
  }

  // 카테고리별 무게 계산
  const calculateCategoryWeight = (category: string) => {
    return items.filter((item) => item.category === category).reduce((sum, item) => sum + item.weight, 0)
  }

  // 총 무게 계산
  const calculateTotalWeight = () => {
    return items.reduce((sum, item) => sum + item.weight, 0)
  }

  // UL 기준 대비 비율 계산
  const calculateUlRatio = (category: string) => {
    const weight = calculateCategoryWeight(category)
    return (weight / ulStandards[category as keyof typeof ulStandards]) * 100
  }

  // 총 UL 기준 대비 비율 계산
  const calculateTotalUlRatio = () => {
    const totalWeight = calculateTotalWeight()
    return (totalWeight / ulStandards.total) * 100
  }

  // UL 상태에 따른 배지 색상 결정
  const getBadgeVariant = (ratio: number) => {
    if (ratio <= 80) return "success"
    if (ratio <= 100) return "default"
    if (ratio <= 120) return "secondary"
    return "destructive"
  }

  // UL 상태에 따른 텍스트 결정
  const getUlStatusText = (ratio: number) => {
    if (ratio <= 80) return "매우 가벼움"
    if (ratio <= 100) return "울트라라이트"
    if (ratio <= 120) return "경량"
    return "무거움"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{currentListName ? currentListName : "새 장비 리스트"}</CardTitle>
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
                      <DialogTitle>장비 리스트 저장</DialogTitle>
                      <DialogDescription>현재 장비 리스트에 이름을 지정하고 저장하세요.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="list-name">리스트 이름</Label>
                        <Input
                          id="list-name"
                          value={currentListName}
                          onChange={(e) => setCurrentListName(e.target.value)}
                          placeholder="예: 여름 백패킹 장비"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={saveCurrentList}>저장하기</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" onClick={startNewList}>
                  새 리스트
                </Button>
              </div>
            </div>
            <CardDescription>장비 항목을 추가하고 총 무게를 확인하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-1">
                <Label htmlFor="item-name">장비명</Label>
                <Input
                  id="item-name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="예: 다운 재킷"
                />
              </div>
              <div>
                <Label htmlFor="item-weight">무게 (g)</Label>
                <Input
                  id="item-weight"
                  type="number"
                  value={newItem.weight || ""}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      weight: Number.parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="예: 350"
                />
              </div>
              <div>
                <Label htmlFor="item-category">카테고리</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger id="item-category">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={addItem} className="w-full mb-6">
              <Plus className="h-4 w-4 mr-2" />
              항목 추가
            </Button>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">전체</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all">
                <div className="border rounded-md">
                  {items.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      아직 추가된 장비가 없습니다. 위 폼을 통해 장비를 추가하세요.
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">장비명</th>
                          <th className="text-left p-2">카테고리</th>
                          <th className="text-right p-2">무게 (g)</th>
                          <th className="text-right p-2">작업</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="p-2">{item.name}</td>
                            <td className="p-2">{categories.find((c) => c.id === item.category)?.name}</td>
                            <td className="text-right p-2">{item.weight}g</td>
                            <td className="text-right p-2">
                              <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </TabsContent>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="border rounded-md">
                    {items.filter((item) => item.category === category.id).length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">이 카테고리에 추가된 장비가 없습니다.</div>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">장비명</th>
                            <th className="text-right p-2">무게 (g)</th>
                            <th className="text-right p-2">작업</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items
                            .filter((item) => item.category === category.id)
                            .map((item) => (
                              <tr key={item.id} className="border-b">
                                <td className="p-2">{item.name}</td>
                                <td className="text-right p-2">{item.weight}g</td>
                                <td className="text-right p-2">
                                  <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
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
            <CardTitle>무게 요약</CardTitle>
            <CardDescription>카테고리별 무게와 UL 기준 비교</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => {
                const weight = calculateCategoryWeight(category.id)
                const ratio = calculateUlRatio(category.id)
                return (
                  <div key={category.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>{category.name}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>UL 기준: {ulStandards[category.id as keyof typeof ulStandards]}g</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{weight}g</span>
                      {weight > 0 && <Badge variant={getBadgeVariant(ratio)}>{ratio.toFixed(0)}%</Badge>}
                    </div>
                  </div>
                )
              })}

              <div className="pt-4 mt-4 border-t flex justify-between items-center font-bold">
                <span>총 무게</span>
                <div className="flex items-center gap-2">
                  <span>{calculateTotalWeight()}g</span>
                  {calculateTotalWeight() > 0 && (
                    <Badge variant={getBadgeVariant(calculateTotalUlRatio())}>
                      {getUlStatusText(calculateTotalUlRatio())}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>저장된 장비 리스트</CardTitle>
            <CardDescription>저장한 장비 리스트를 불러오거나 관리하세요</CardDescription>
          </CardHeader>
          <CardContent>
            {savedLists.length === 0 ? (
              <div className="text-center text-muted-foreground p-4">저장된 장비 리스트가 없습니다.</div>
            ) : (
              <div className="space-y-2">
                {savedLists.map((list) => (
                  <div key={list.id} className="flex justify-between items-center p-2 border rounded-md">
                    <span className="cursor-pointer flex-grow" onClick={() => loadList(list.id)}>
                      {list.name}
                    </span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => loadList(list.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteList(list.id)}>
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
            <CardTitle>UL 백패킹 가이드</CardTitle>
            <CardDescription>울트라라이트 백패킹을 위한 팁</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <strong>울트라라이트(UL) 백패킹</strong>은 총 장비 무게를 7kg(15.4lbs) 이하로 유지하는 것을 목표로
                합니다.
              </p>
              <p>
                <strong>경량화 팁:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>다용도로 사용할 수 있는 장비를 선택하세요.</li>
                <li>필수적이지 않은 항목은 과감히 제외하세요.</li>
                <li>경량 소재(다이니마, DCF 등)로 만들어진 장비를 고려하세요.</li>
                <li>음식과 물은 구간별로 계획하여 과도한 무게를 피하세요.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
