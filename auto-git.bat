@echo off
setlocal enabledelayedexpansion

:: 현재 날짜와 시간 가져오기
set "current_date=%date%"
set "current_time=%time%"

:: 변경된 파일 목록 가져오기
set "changed_files="
for /f "tokens=*" %%a in ('git status --porcelain') do (
    set "changed_files=!changed_files!%%a "
)

:: 커밋 메시지 생성
set "commit_message=자동 커밋 - %current_date% %current_time% - 변경: %changed_files%"

:: 커밋 및 푸시
git add .
git commit -m "%commit_message%"
git push origin main

echo 커밋 메시지: %commit_message%
pause
