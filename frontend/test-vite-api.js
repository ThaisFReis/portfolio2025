import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('response', async response => {
    if (response.url().includes('/api/chat')) {
      console.log('API Response Status:', response.status());
      try {
        console.log('API Response text:', await response.text());
      } catch(e) {}
    }
  });

  await page.goto('http://localhost:5174');
  
  // Wait for the Nyx initialization message
  await page.waitForSelector('.w-full.max-w-3xl');
  
  // Type into input
  await page.type('input[placeholder="Ask Nyx..."]', 'projetos');
  await page.click('button[aria-label="Send message"]');
  
  // Wait a bit
  await new Promise(r => setTimeout(r, 5000));
  
  await browser.close();
})();
