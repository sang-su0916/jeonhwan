# PowerShell 스크립트로 Windows에서 브라우저 테스트

# 개발 서버가 실행 중인지 확인
$ports = @(5174, 5173, 3000, 8080)

foreach ($port in $ports) {
    Write-Host "포트 $port 테스트 중..."
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$port" -UseBasicParsing -TimeoutSec 2
        Write-Host "포트 $port 성공! 상태 코드: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "HTML 길이: $($response.Content.Length)"
        
        # 브라우저에서 열기
        Start-Process "http://localhost:$port"
        break
    }
    catch {
        Write-Host "포트 $port 실패: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# WSL IP로도 시도
Write-Host "`nWSL IP로 테스트..."
$wslIp = "172.22.11.5"
foreach ($port in $ports) {
    try {
        $response = Invoke-WebRequest -Uri "http://${wslIp}:$port" -UseBasicParsing -TimeoutSec 2
        Write-Host "WSL IP 포트 $port 성공!" -ForegroundColor Green
        Start-Process "http://${wslIp}:$port"
        break
    }
    catch {
        Write-Host "WSL IP 포트 $port 실패" -ForegroundColor Red
    }
}