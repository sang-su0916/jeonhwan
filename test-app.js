import { chromium } from 'playwright';

async function testApp() {
  console.log('브라우저 시작...');
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // 콘솔 로그 캡처
  page.on('console', msg => {
    console.log('콘솔:', msg.type(), msg.text());
  });
  
  // 에러 캡처
  page.on('pageerror', err => {
    console.error('페이지 에러:', err.message);
  });
  
  // 네트워크 요청 캡처
  page.on('request', request => {
    console.log('요청:', request.method(), request.url());
  });
  
  page.on('response', response => {
    if (response.status() >= 400) {
      console.error('응답 에러:', response.status(), response.url());
    }
  });
  
  try {
    console.log('localhost:5174 접속 시도...');
    await page.goto('http://localhost:5174/', { 
      waitUntil: 'domcontentloaded',
      timeout: 10000 
    });
    
    console.log('페이지 로드 완료');
    
    // 스크린샷 찍기
    await page.screenshot({ path: 'screenshot-5174.png', fullPage: true });
    console.log('스크린샷 저장: screenshot-5174.png');
    
    // HTML 내용 확인
    const html = await page.content();
    console.log('HTML 길이:', html.length);
    
    // root 요소 확인
    const rootElement = await page.$('#root');
    if (rootElement) {
      const innerHTML = await rootElement.innerHTML();
      console.log('Root 요소 내용:', innerHTML.substring(0, 200) + '...');
    } else {
      console.log('Root 요소를 찾을 수 없음');
    }
    
    // 타이틀 확인
    const title = await page.title();
    console.log('페이지 타이틀:', title);
    
  } catch (error) {
    console.error('테스트 실패:', error.message);
    
    // 다른 포트 시도
    try {
      console.log('localhost:3000 접속 시도...');
      await page.goto('http://localhost:3000/', { 
        waitUntil: 'domcontentloaded',
        timeout: 10000 
      });
      
      await page.screenshot({ path: 'screenshot-3000.png', fullPage: true });
      console.log('포트 3000에서 성공');
      
    } catch (err2) {
      console.error('포트 3000도 실패:', err2.message);
      
      // WSL IP로 시도
      try {
        console.log('172.22.11.5:5174 접속 시도...');
        await page.goto('http://172.22.11.5:5174/', { 
          waitUntil: 'domcontentloaded',
          timeout: 10000 
        });
        
        await page.screenshot({ path: 'screenshot-wsl.png', fullPage: true });
        console.log('WSL IP로 성공');
        
      } catch (err3) {
        console.error('WSL IP도 실패:', err3.message);
      }
    }
  }
  
  await browser.close();
  console.log('브라우저 종료');
}

testApp().catch(console.error);