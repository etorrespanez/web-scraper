import puppeteer from 'puppeteer';

(async () => {
  
  const browser = await puppeteer.launch({headless:false}); // Open browser  
  const page = await browser.newPage();     // Create new page to work with

  await page.goto('https://news.ycombinator.com/');
  await page.screenshot({ path: 'screenshoot1.jpg'});

  const titulos = await page.evaluate(() => {
    const elements = document.querySelectorAll('tr.athing a');
    const titles = [];

    for(let element of elements) {
      titles.push(element);
    }
    return titles;

  });


  console.log(titulos.length);
  await browser.close();
})();