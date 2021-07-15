import puppeteer from 'puppeteer';

(async () => {
  
  const browser = await puppeteer.launch({headless: false}); // Open browser  
  const url = 'https://news.ycombinator.com/';              // Set url
  const page = await browser.newPage();                    // Create new page to work with

  await page.goto(url);
  await page.screenshot({ path: 'screenshoot1.jpg'});


  const entries = await page.evaluate(() => {
    const pattern = 'points';

    //Simplifies coding by eliminating duplicate code when selecting selectors

    /* const items = Array.from(document.querySelectorAll('.itemlist tbody'))
      .map( (compact, index) => ({
        rank: ++index,
        title: compact.querySelector('tr.athing td.title a.storylink').innerText.trim(),
        score: compact.querySelector('tr td.subtext span.score').innerText.trim(),
        comments: compact.querySelector('tr td.subtext a').innerText.trim()
      })); */


    const mainInfo = Array.from(document.querySelectorAll('tr.athing td.title a.storylink')).map((comment) => comment.innerText.trim());
    const items = Array.from(document.querySelectorAll('td.subtext')).map((comment, index) => {

      return { 
        rank: ++index,
        title: mainInfo[index],
        score: comment.innerText.indexOf(pattern) >= 0 ? parseFloat(comment.innerText.substr(0, comment.innerText.indexOf(pattern))) : 0,
        comments: comment.innerText.trim().split('|').length === 3 ?  parseFloat(comment.innerText.trim().split('|')[2]) : 0
      }
    });

    let filterdItems = items.filter(item => (item.title || '').split(' ').length > 5);
    const sortedItems = items.sort(function(a , b) {
      return b.score - a.score;
   });

    return filterdItems;
  });

  console.log(entries);
  await browser.close();
})();