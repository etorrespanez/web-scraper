import puppeteer from 'puppeteer';

(async () => {
  
  const browser = await puppeteer.launch({headless:false}); // Open browser  
  const page = await browser.newPage();     // Create new page to work with

  await page.goto('https://news.ycombinator.com/');
  await page.screenshot({ path: 'screenshoot1.jpg'});


  const entries = await page.evaluate(() => {
    let items = [];
    const elements = Array.from(document.querySelectorAll('tr.athing td.title a.storylink')).map((comment) => {
      return  { title: comment.innerText.trim() };
    });
    


    return items;
  });

  await browser.close();
})();