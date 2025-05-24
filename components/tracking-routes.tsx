"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Calendar, Clock, Mountain, ThumbsUp, MessageSquare, Share2, Search, Plus } from "lucide-react"
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// 트래킹 루트 데이터
const trackingRoutes = [
  {
    id: "1",
    name: "지리산 종주",
    location: "한국, 지리산",
    region: "domestic",
    difficulty: "hard",
    distance: 65.3,
    duration: 4,
    season: ["spring", "summer", "fall"],
    elevation: 1915,
    description:
      "지리산 종주는 한국에서 가장 유명한 장거리 트레일 중 하나입니다. 천왕봉을 포함한 여러 봉우리를 지나며 아름다운 자연 경관을 감상할 수 있습니다. 종주 코스는 보통 4-5일이 소요되며, 중간에 여러 산장에서 숙박이 가능합니다.",
    tips: [
      "여름에는 폭우와 안개가 자주 발생하니 우비와 방수 장비 필수",
      "봄과 가을이 가장 적합한 시즌",
      "산장 예약은 최소 1개월 전에 완료하는 것이 좋음",
      "식수는 산장에서 구할 수 있으나 정수 필터 지참 권장",
    ],
    recommendedGear: ["방수 등산화", "트레킹 폴", "침낭", "우의", "헤드랜턴"],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    reviews: [
      {
        id: "r1",
        userId: "user1",
        userName: "산악인",
        rating: 5,
        date: "2023-05-15",
        content:
          "지리산 종주는 정말 잊을 수 없는 경험이었습니다. 천왕봉에서 본 일출은 그 어떤 것과도 비교할 수 없을 정도로 아름다웠습니다. 다만 중간에 비가 많이 와서 우비가 필수였어요. 트레킹 폴도 정말 유용했습니다.",
        recommendedGear: ["방수 등산화", "트레킹 폴", "우의"],
        likes: 24,
      },
      {
        id: "r2",
        userId: "user2",
        userName: "백패커",
        rating: 4,
        date: "2023-09-22",
        content:
          "가을에 다녀왔는데 단풍이 정말 아름다웠습니다. 코스가 생각보다 험해서 체력 소모가 컸어요. 산장은 시설이 기본적이지만 따뜻한 잠자리를 제공해 줍니다. 헤드랜턴은 꼭 챙기세요!",
        recommendedGear: ["헤드랜턴", "침낭", "보온병"],
        likes: 18,
      },
    ],
  },
  {
    id: "2",
    name: "설악산 대청봉",
    location: "한국, 설악산",
    region: "domestic",
    difficulty: "medium",
    distance: 16.8,
    duration: 1,
    season: ["spring", "summer", "fall"],
    elevation: 1708,
    description:
      "설악산 대청봉은 한국에서 세 번째로 높은 산으로, 아름다운 경관과 기암괴석으로 유명합니다. 대청봉 코스는 하루 동안 완주할 수 있으며, 정상에서는 동해와 설악산의 장엄한 전망을 감상할 수 있습니다.",
    tips: [
      "초봄과 늦가을에는 정상 부근에 결빙 구간이 있을 수 있음",
      "주말에는 매우 혼잡하니 평일 방문 권장",
      "오색약수터에서 출발하는 코스가 가장 인기 있음",
    ],
    recommendedGear: ["등산화", "트레킹 폴", "방풍 자켓"],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    reviews: [
      {
        id: "r3",
        userId: "user3",
        userName: "등산러버",
        rating: 5,
        date: "2023-10-05",
        content:
          "설악산 대청봉은 정말 아름다웠습니다. 단풍 시즌에 방문했는데, 색색의 단풍이 장관이었어요. 코스는 중간 난이도로 적당히 힘들었지만 보람찼습니다. 트레킹 폴이 정말 도움이 많이 됐어요.",
        recommendedGear: ["트레킹 폴", "방풍 자켓"],
        likes: 15,
      },
    ],
  },
  {
    id: "3",
    name: "제주 올레길 7코스",
    location: "한국, 제주도",
    region: "domestic",
    difficulty: "easy",
    distance: 17.6,
    duration: 1,
    season: ["spring", "summer", "fall", "winter"],
    elevation: 150,
    description:
      "제주 올레길 7코스는 제주도 서귀포시 색달동에서 대정읍 모슬포까지 이어지는 해안 트레일입니다. 아름다운 해안선과 오름, 마을을 지나며 제주의 자연과 문화를 경험할 수 있습니다.",
    tips: [
      "사계절 모두 걷기 좋지만 여름에는 자외선 차단제 필수",
      "물과 간식을 충분히 준비하세요",
      "제주 날씨는 변덕스러우니 우비를 챙기는 것이 좋음",
    ],
    recommendedGear: ["편안한 운동화", "모자", "자외선 차단제", "우의"],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    reviews: [
      {
        id: "r4",
        userId: "user4",
        userName: "제주사랑",
        rating: 5,
        date: "2023-04-18",
        content:
          "올레길 7코스는 제주의 아름다운 해안을 감상하기에 최고의 코스입니다. 난이도가 낮아 가족과 함께 걷기 좋았어요. 중간중간 카페와 식당이 있어 편리했습니다. 모자와 자외선 차단제는 필수입니다!",
        recommendedGear: ["모자", "자외선 차단제", "편안한 운동화"],
        likes: 22,
      },
    ],
  },
  {
    id: "4",
    name: "존 뮤어 트레일",
    location: "미국, 캘리포니아",
    region: "international",
    difficulty: "hard",
    distance: 340,
    duration: 21,
    season: ["summer", "fall"],
    elevation: 4421,
    description:
      "존 뮤어 트레일(JMT)은 미국 캘리포니아의 요세미티 국립공원에서 휘트니 산까지 이어지는 장거리 트레일입니다. 시에라 네바다 산맥의 아름다운 고산 풍경을 감상할 수 있으며, 완주하는 데 보통 2-3주가 소요됩니다.",
    tips: [
      "허가증은 최소 6개월 전에 신청해야 함",
      "베어 캐니스터(곰 방지 식품 보관함) 필수",
      "고산병에 대비하여 충분한 적응 기간 필요",
      "물 정수 필터는 필수 장비",
    ],
    recommendedGear: ["초경량 텐트", "침낭(-7°C)", "베어 캐니스터", "물 정수 필터", "등산화"],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    reviews: [
      {
        id: "r5",
        userId: "user5",
        userName: "트레일러너",
        rating: 5,
        date: "2023-08-10",
        content:
          "존 뮤어 트레일은 제 인생에서 가장 아름다운 트레킹 경험이었습니다. 3주 동안 완주했는데, 매일 아침 일어나면 새로운 절경이 펼쳐졌어요. 고도가 높아 고산병 적응이 필요했고, 베어 캐니스터는 정말 중요했습니다. 초경량 장비를 준비하는 것이 좋아요.",
        recommendedGear: ["초경량 텐트", "침낭(-7°C)", "베어 캐니스터", "물 정수 필터"],
        likes: 35,
      },
    ],
  },
  {
    id: "5",
    name: "토레스 델 파이네 W 트레일",
    location: "칠레, 파타고니아",
    region: "international",
    difficulty: "medium",
    distance: 80,
    duration: 5,
    season: ["summer", "fall"],
    elevation: 1200,
    description:
      "토레스 델 파이네 W 트레일은 칠레 파타고니아의 토레스 델 파이네 국립공원에 위치한 인기 트레킹 코스입니다. W 모양의 경로를 따라 빙하, 호수, 산맥 등 파타고니아의 장엄한 자연 경관을 감상할 수 있습니다.",
    tips: [
      "남반구이므로 12월-2월이 여름 시즌",
      "바람이 매우 강하므로 방풍 장비 필수",
      "레푸지오(산장) 예약은 최소 6개월 전에 완료해야 함",
      "날씨가 매우 변덕스러우니 사계절 장비 준비",
    ],
    recommendedGear: ["4계절 텐트", "방풍 자켓", "방수 등산화", "트레킹 폴", "보온 의류"],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    reviews: [
      {
        id: "r6",
        userId: "user6",
        userName: "세계여행자",
        rating: 5,
        date: "2023-01-15",
        content:
          "파타고니아의 W 트레일은 정말 환상적이었습니다. 토레스 델 파이네의 웅장한 산맥과 빙하, 에메랄드 호수는 말로 표현할 수 없을 정도로 아름다웠어요. 바람이 정말 강해서 방풍 자켓이 필수였고, 날씨가 하루에도 여러 번 바뀌어서 레이어링이 중요했습니다.",
        recommendedGear: ["방풍 자켓", "방수 등산화", "트레킹 폴"],
        likes: 42,
      },
    ],
  },
  {
    id: "6",
    name: "안나푸르나 서킷",
    location: "네팔, 히말라야",
    region: "international",
    difficulty: "hard",
    distance: 160,
    duration: 14,
    season: ["spring", "fall"],
    elevation: 5416,
    description:
      "안나푸르나 서킷은 네팔 히말라야의 안나푸르나 산맥을 일주하는 트레킹 코스입니다. 토롱라 패스(5,416m)를 넘으며 다양한 고도와 기후대, 문화를 경험할 수 있는 세계적으로 유명한 트레일입니다.",
    tips: [
      "고산병 예방을 위해 충분한 적응 기간 필요",
      "TIMS 카드와 ACAP 허가증 필수",
      "10월-11월, 3월-4월이 최적의 시즌",
      "티하우스(숙소)가 있어 텐트 없이도 가능",
    ],
    recommendedGear: ["다운 자켓", "침낭(-15°C)", "고산용 등산화", "트레킹 폴", "자외선 차단제"],
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    reviews: [
      {
        id: "r7",
        userId: "user7",
        userName: "히말라야러버",
        rating: 5,
        date: "2023-04-05",
        content:
          "안나푸르나 서킷은 제 인생에서 가장 도전적이고 보람찬 트레킹이었습니다. 토롱라 패스를 넘을 때의 성취감은 말로 표현할 수 없었어요. 고산병 예방을 위해 다이아목스를 준비했고, 따뜻한 침낭과 다운 자켓이 정말 유용했습니다. 네팔 사람들의 따뜻한 환대도 잊을 수 없어요.",
        recommendedGear: ["다운 자켓", "침낭(-15°C)", "고산용 등산화", "트레킹 폴"],
        likes: 38,
      },
    ],
  },
]

// 리뷰 타입 정의
type Review = {
  id: string
  userId: string
  userName: string
  rating: number
  date: string
  content: string
  recommendedGear: string[]
  likes: number
}

// 트래킹 루트 타입 정의
type TrackingRoute = {
  id: string
  name: string
  location: string
  region: string
  difficulty: string
  distance: number
  duration: number
  season: string[]
  elevation: number
  description: string
  tips: string[]
  recommendedGear: string[]
  images: string[]
  reviews: Review[]
}

// 난이도 표시 함수
const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return <Badge className="bg-green-500">쉬움</Badge>
    case "medium":
      return <Badge className="bg-yellow-500">중간</Badge>
    case "hard":
      return <Badge className="bg-red-500">어려움</Badge>
    default:
      return <Badge>알 수 없음</Badge>
  }
}

// 계절 표시 함수
const getSeasonBadges = (seasons: string[]) => {
  const seasonColors: Record<string, string> = {
    spring: "bg-green-400",
    summer: "bg-red-400",
    fall: "bg-orange-400",
    winter: "bg-blue-400",
  }

  const seasonNames: Record<string, string> = {
    spring: "봄",
    summer: "여름",
    fall: "가을",
    winter: "겨울",
  }

  return seasons.map((season) => (
    <Badge key={season} className={`mr-1 ${seasonColors[season]}`}>
      {seasonNames[season]}
    </Badge>
  ))
}

// 별점 표시 함수
const renderStars = (rating: number) => {
  return Array(5)
    .fill(0)
    .map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
    ))
}

export default function TrackingRoutes() {
  // 현재 선택된 지역 (국내/해외)
  const [selectedRegion, setSelectedRegion] = useState<string>("all")
  // 현재 선택된 난이도
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  // 현재 선택된 계절
  const [selectedSeason, setSelectedSeason] = useState<string>("all")
  // 검색어
  const [searchQuery, setSearchQuery] = useState<string>("")
  // 현재 선택된 루트
  const [selectedRoute, setSelectedRoute] = useState<TrackingRoute | null>(null)
  // 리뷰 작성 다이얼로그 열림 상태
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState<boolean>(false)
  // 새 리뷰 내용
  const [newReview, setNewReview] = useState({
    rating: 5,
    content: "",
    recommendedGear: [] as string[],
  })
  // 트래킹 루트 데이터
  const [routes, setRoutes] = useState<TrackingRoute[]>(trackingRoutes)

  // 필터링된 루트 목록
  const getFilteredRoutes = () => {
    return routes.filter((route) => {
      // 지역 필터
      if (selectedRegion !== "all" && route.region !== selectedRegion) {
        return false
      }
      // 난이도 필터
      if (selectedDifficulty !== "all" && route.difficulty !== selectedDifficulty) {
        return false
      }
      // 계절 필터
      if (selectedSeason !== "all" && !route.season.includes(selectedSeason)) {
        return false
      }
      // 검색어 필터
      if (
        searchQuery &&
        !route.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !route.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      return true
    })
  }

  // 리뷰 추가 함수
  const addReview = () => {
    if (!selectedRoute || !newReview.content) return

    const review: Review = {
      id: `r${Date.now()}`,
      userId: "currentUser",
      userName: "나",
      rating: newReview.rating,
      date: new Date().toISOString().split("T")[0],
      content: newReview.content,
      recommendedGear: newReview.recommendedGear,
      likes: 0,
    }

    const updatedRoutes = routes.map((route) => {
      if (route.id === selectedRoute.id) {
        return {
          ...route,
          reviews: [review, ...route.reviews],
        }
      }
      return route
    })

    setRoutes(updatedRoutes)
    setSelectedRoute({
      ...selectedRoute,
      reviews: [review, ...selectedRoute.reviews],
    })
    setNewReview({
      rating: 5,
      content: "",
      recommendedGear: [],
    })
    setIsReviewDialogOpen(false)
  }

  // 리뷰 좋아요 함수
  const likeReview = (routeId: string, reviewId: string) => {
    const updatedRoutes = routes.map((route) => {
      if (route.id === routeId) {
        const updatedReviews = route.reviews.map((review) => {
          if (review.id === reviewId) {
            return {
              ...review,
              likes: review.likes + 1,
            }
          }
          return review
        })
        return {
          ...route,
          reviews: updatedReviews,
        }
      }
      return route
    })

    setRoutes(updatedRoutes)
    if (selectedRoute && selectedRoute.id === routeId) {
      const updatedReviews = selectedRoute.reviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            likes: review.likes + 1,
          }
        }
        return review
      })
      setSelectedRoute({
        ...selectedRoute,
        reviews: updatedReviews,
      })
    }
  }

  // 장비 추천 토글 함수
  const toggleGear = (gear: string) => {
    if (newReview.recommendedGear.includes(gear)) {
      setNewReview({
        ...newReview,
        recommendedGear: newReview.recommendedGear.filter((g) => g !== gear),
      })
    } else {
      setNewReview({
        ...newReview,
        recommendedGear: [...newReview.recommendedGear, gear],
      })
    }
  }

  // 루트 상세 정보로 돌아가기
  const backToList = () => {
    setSelectedRoute(null)
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {!selectedRoute ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>유명 트래킹 루트 정보</CardTitle>
              <CardDescription>국내외 인기 트래킹 코스를 찾아보세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="트래킹 코스 또는 지역 검색"
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="지역" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="domestic">국내</SelectItem>
                      <SelectItem value="international">해외</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="난이도" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="easy">쉬움</SelectItem>
                      <SelectItem value="medium">중간</SelectItem>
                      <SelectItem value="hard">어려움</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="계절" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="spring">봄</SelectItem>
                      <SelectItem value="summer">여름</SelectItem>
                      <SelectItem value="fall">가을</SelectItem>
                      <SelectItem value="winter">겨울</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getFilteredRoutes().map((route) => (
                  <Card key={route.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-0" onClick={() => setSelectedRoute(route)}>
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={route.images[0] || "/placeholder.svg"}
                          alt={route.name}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {getDifficultyBadge(route.difficulty)}
                          {route.region === "domestic" ? (
                            <Badge className="bg-blue-500">국내</Badge>
                          ) : (
                            <Badge className="bg-purple-500">해외</Badge>
                          )}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold">{route.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-4 w-4 mr-1" /> {route.location}
                        </p>
                        <div className="flex items-center mt-2 text-sm">
                          <div className="flex items-center mr-4">
                            <Mountain className="h-4 w-4 mr-1" />
                            {route.elevation}m
                          </div>
                          <div className="flex items-center mr-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            {route.duration}일
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {route.distance}km
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap">{getSeasonBadges(route.season)}</div>
                        <div className="mt-2 flex items-center">
                          <div className="flex">
                            {renderStars(
                              route.reviews.length > 0
                                ? route.reviews.reduce((acc, review) => acc + review.rating, 0) / route.reviews.length
                                : 0,
                            )}
                          </div>
                          <span className="ml-2 text-sm text-muted-foreground">({route.reviews.length} 리뷰)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {getFilteredRoutes().length === 0 && (
                <div className="text-center py-8 text-muted-foreground">검색 조건에 맞는 트래킹 루트가 없습니다.</div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <Button variant="ghost" onClick={backToList} className="mr-2">
              ← 목록으로
            </Button>
            <h2 className="text-2xl font-bold">{selectedRoute.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-video relative">
                    <img
                      src={selectedRoute.images[0] || "/placeholder.svg"}
                      alt={selectedRoute.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {getDifficultyBadge(selectedRoute.difficulty)}
                      {selectedRoute.region === "domestic" ? (
                        <Badge className="bg-blue-500">국내</Badge>
                      ) : (
                        <Badge className="bg-purple-500">해외</Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{selectedRoute.location}</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center">
                        <Mountain className="h-4 w-4 mr-1" />
                        <span>고도 {selectedRoute.elevation}m</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>소요 기간 {selectedRoute.duration}일</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>거리 {selectedRoute.distance}km</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-medium mb-2">추천 계절</h3>
                      <div className="flex flex-wrap gap-1">{getSeasonBadges(selectedRoute.season)}</div>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-medium mb-2">코스 설명</h3>
                      <p className="text-muted-foreground">{selectedRoute.description}</p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="tips">
                        <AccordionTrigger>계절별 팁</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedRoute.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>유저 후기 ({selectedRoute.reviews.length})</CardTitle>
                    <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          후기 작성
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>트래킹 후기 작성</DialogTitle>
                          <DialogDescription>
                            {selectedRoute.name}에 대한 경험을 공유하고 추천 장비를 알려주세요.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label>별점</Label>
                            <div className="flex items-center mt-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-6 w-6 cursor-pointer ${
                                    star <= newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                  onClick={() => setNewReview({ ...newReview, rating: star })}
                                />
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="review">후기 내용</Label>
                            <Textarea
                              id="review"
                              placeholder="트래킹 경험을 자세히 공유해주세요."
                              rows={5}
                              value={newReview.content}
                              onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>추천 장비</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedRoute.recommendedGear.map((gear) => (
                                <Badge
                                  key={gear}
                                  variant={newReview.recommendedGear.includes(gear) ? "default" : "outline"}
                                  className="cursor-pointer"
                                  onClick={() => toggleGear(gear)}
                                >
                                  {gear}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={addReview}>후기 등록</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedRoute.reviews.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      아직 작성된 후기가 없습니다. 첫 번째 후기를 작성해보세요!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedRoute.reviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-2">
                                <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{review.userName}</div>
                                <div className="text-sm text-muted-foreground">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex">{renderStars(review.rating)}</div>
                          </div>
                          <p className="mt-3">{review.content}</p>
                          {review.recommendedGear.length > 0 && (
                            <div className="mt-3">
                              <div className="text-sm font-medium">추천 장비</div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {review.recommendedGear.map((gear) => (
                                  <Badge key={gear} variant="outline">
                                    {gear}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex items-center mt-3 text-sm">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground"
                              onClick={() => likeReview(selectedRoute.id, review.id)}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {review.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              댓글
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Share2 className="h-4 w-4 mr-1" />
                              공유
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>추천 장비</CardTitle>
                  <CardDescription>이 코스에 적합한 장비</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedRoute.recommendedGear.map((gear) => (
                      <div key={gear} className="flex items-center justify-between p-2 border rounded-md">
                        <span>{gear}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>장비 리스트에 추가</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    모든 장비 무게 계산기에 추가
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>유사한 트래킹 코스</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {routes
                      .filter(
                        (route) =>
                          route.id !== selectedRoute.id &&
                          (route.region === selectedRoute.region || route.difficulty === selectedRoute.difficulty),
                      )
                      .slice(0, 3)
                      .map((route) => (
                        <div
                          key={route.id}
                          className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-muted/50"
                          onClick={() => setSelectedRoute(route)}
                        >
                          <div className="w-16 h-16 mr-3 overflow-hidden rounded">
                            <img
                              src={route.images[0] || "/placeholder.svg"}
                              alt={route.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{route.name}</div>
                            <div className="text-sm text-muted-foreground">{route.location}</div>
                            <div className="flex mt-1">
                              {renderStars(
                                route.reviews.length > 0
                                  ? route.reviews.reduce((acc, review) => acc + review.rating, 0) / route.reviews.length
                                  : 0,
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
