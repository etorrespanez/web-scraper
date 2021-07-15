import puppeteer from 'puppeteer';

(async () => {
  
  const browser = await puppeteer.launch({headless: true}); // Open browser  
  const url = 'https://news.ycombinator.com/';              // Set url
  const page = await browser.newPage();                    // Create new page to work with

  await page.goto(url);
  await page.screenshot({ path: 'screenshoot1.jpg'});


  const entries = await page.evaluate(() => {
    let item = {};
    const pattern = 'points';
  
    const mainInfo = Array.from(document.querySelectorAll('tr.athing td.title a.storylink')).map((comment) => comment.innerText.trim());
    const additionalInfo = Array.from(document.querySelectorAll('td.subtext')).map((comment, index) => {

      return { 
        rank: ++index,
        title: mainInfo[index],
        score: comment.innerText.indexOf(pattern) >= 0 ? comment.innerText.substr(0, comment.innerText.indexOf(pattern) + pattern.length) : 'no score',
        comments: comment.innerText.trim().split('|').length === 3 ?  comment.innerText.trim().split('|')[2] : 'no comments'
      }
    });
    //return items;
    return additionalInfo;
  });

  console.log(entries);
  await browser.close();
})();