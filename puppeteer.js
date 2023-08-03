const puppeteer = require('puppeteer');

(async () => {
    try{
        const browser = await puppeteer.launch({
            headless: 'new',
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 })

        //go to addUser.html and click addUser
        await page.goto('http://localhost:3000/addUser.html');
        const addUserButton = await page.waitForSelector('#addUser', {timeout: 30000});
        await addUserButton.click();
        page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

        //go to data.html and clicik showAllData
        await page.goto('http://localhost:3000/data.html');
        const showDataButton = await page.waitForSelector('#showAllData', {timeout: 10000});
        await showDataButton.click();

        //wait for data to populate status div
        await page.waitForSelector('#status:not(:empty)');

        //read status data
        let status = await page.$('#status');
        console.log(await status.evaluate(node => node.innerHTML));

        //go to allUsers, take screenshot
        await page.goto('http://localhost:3000/allUsers.html');
        await page.click('#showAllData');
        await page.waitForSelector('$status:not(:empty)');
        await page.screenshot({path: 'screen.png'});

        //shutdown
        browser.close();
    }

    catch(e){
        console.log(e);
    }

})();