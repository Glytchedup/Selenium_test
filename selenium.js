var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder()
.forBrowser('firefox')
.build();
    driver.get('http://www.google.com/ncr');
    // driver.findElement(webdriver.By.name('q')).sendkeys('webdriver');
    // driver.findElement(webdriver.By.name('btnG')).click();
    // driver.wait(webdriver.until.titlels('webdriver - Google Search'), 1000);
    // driver.quit();

