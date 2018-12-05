
var webdriver = require("selenium-webdriver"),
By = webdriver.By,
until = webdriver.until;
var test = require("selenium-webdriver/testing");

var driver;
const timeOut = 60000;

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

const firefox = require('selenium-webdriver/firefox');
const options = new firefox.Options();
options.setProfile('C:/Users/davek/AppData/Roaming/Mozilla/Firefox/Profiles/zcdwwjvr.default')

test.describe("Pull Extract", function() {
  test.before(function() {
    this.timeout(timeOut);
    driver = new webdriver.Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();
    driver
      .manage()
      .window()
      .setSize(1280, 720);
    driver
      .manage()
      .window()
      .setPosition(30, 78);
    });
    
    test.beforeEach(function() {
      this.timeout(timeOut);
      driver.get("https://salesnet.marriott.com/oys/ym/oy/OysController/signIn");
    });
    
test.it('User can login successfully', function() {
    driver.get("https://salesnet.marriott.com/oys/ym/oy/OysController/signIn");
    driver.findElement(webdriver.By.name("username")).sendKeys("EID");
    driver.findElement(webdriver.By.name("password")).sendKeys("password");
    driver.findElement(webdriver.By.css("button.btn.btn-block")).click();
  });

  test.it("[4] Select to Hotel", function() {
    this.timeout(timeOut);
    driver.findElement(By.id("propertyCodeText")).sendKeys("SJCCA");
    driver.findElement(By.css("b > a")).click();
    driver.sleep(10000).then(function(){
    return driver.wait(until.elementLocated(By.id("dijit__TemplatedMixin_0")), 20000);
    });
    driver.findElement(By.id("dijit__TemplatedMixin_0")).click();
    driver.findElement(By.id("dijit__TemplatedMixin_0")).click();
        driver.sleep(10000).then(function(){
        return driver.wait(until.elementLocated(By.css("span.icon.settings-button")), 20000);
        });
    driver
    .findElement(By.css("span.icon.settings-button"))
    .click();
    driver.findElement(By.css("#dijit_MenuItem_3_text")).click();
    driver.sleep(30000); //wait 30 seconds for download to complete
  });

});
