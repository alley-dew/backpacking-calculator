import type { Metadata } from 'next'
import './globals.css'
import { StagewiseProvider } from './components/StagewiseProvider'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

// UserMessage 타입 정의
interface UserMessage {
  text: string;
  type: string;
}

// Stagewise 커스텀 플러그인 설정
const stagewiseConfig = {
  plugins: [
    {
      name: 'weight-calculator',
      description: '백패킹 무게 계산기 관련 정보',
      shortInfoForPrompt: () => "이 요소는 백패킹 무게 계산기의 일부입니다. 무게 계산, 장비 관리, 식량 계획 등의 기능을 포함합니다.",
      mcp: null,
      actions: [
        {
          name: '무게 계산',
          description: '선택한 장비의 무게를 계산합니다',
          execute: () => {
            console.log('무게 계산 액션 실행');
          },
        },
        {
          name: '장비 정보',
          description: '선택한 장비의 상세 정보를 표시합니다',
          execute: () => {
            console.log('장비 정보 액션 실행');
          },
        },
      ],
    },
    {
      name: 'ui-components',
      description: 'Radix UI 컴포넌트 정보',
      shortInfoForPrompt: () => "이 요소는 Radix UI 컴포넌트를 사용하여 구현되었습니다. 접근성과 사용자 경험을 고려한 컴포넌트입니다.",
      mcp: null,
      actions: [],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StagewiseProvider />
        {children}
      </body>
    </html>
  )
}
