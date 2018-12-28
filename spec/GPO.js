//credentials in app-env
var eid = process.env.EID;
var password = process.env.PASSWORD;
var url = process.env.URL;
var gpourl = process.env.GPOURL;
//Webdriver setup
var assert = require("assert");
var webdriver = require("selenium-webdriver"),
           By = webdriver.By,
            until = webdriver.until;
var test = require("selenium-webdriver/testing");
const timeOut = 90000;
var extract;
var firefox = require("selenium-webdriver/firefox");
var path = require("path");
var myDownloadFolder = path.normalize(__dirname + "/../Downloads/");

// Create Firefox Profile
var profile = new firefox.Profile();
profile.setPreference("browser.download.folderList", 2);
profile.setPreference("browser.download.dir", myDownloadFolder);
profile.setPreference(
  "browser.helperApps.neverAsk.saveToDisk",
  "application/vnd.ms-excel"
  );
  
  // disable Firefox's built-in PDF viewer
  profile.setPreference("pdfjs.disabled", true);
  var options = new firefox.Options().setProfile(profile);
  var driver = new webdriver.Builder();

//Array of codes
var marsha = 'SJCCA'
var s = 'SJCCA'
// //Build Webdriver with Firefox profile setup
test.describe("GPO Clicker", function() {
  test.before(function() {
    this.timeout(timeOut);
    driver = new webdriver.Builder()
      .forBrowser("firefox")
      .setFirefoxOptions(options)
      .build();
  });

  //Quit after last case finishes
  after(async () => driver.quit());

  //Login
  test.it("login successful", function() {
    this.timeout(timeOut);
    driver.get(url);
    // driver.executeScript("document.getElementsByName('username').value=arguments[0];", eid);
    // driver.executeScript("document.getElementById('password').value=arguments[0];", password);
    driver.findElement(webdriver.By.name("username")).sendKeys(eid);
    driver.findElement(webdriver.By.name("password")).sendKeys(password);
    driver.findElement(webdriver.By.css("button.btn.btn-block")).click();
  });

  //Shop Loop 
  // marsha.forEach(s => {
  test.describe("GpoShop", async function() {

test.before(function() {
        this.timeout(timeOut);
        driver
          .manage()
          .window()
          .setSize(1280, 720);
      });

      test.it("PropertySelect", function(done, err) {
        this.timeout(timeOut);
        driver.get(gpourl)
        .then(_ => driver.manage().timeouts().pageLoadTimeout(10000));

 function handleFailure(err) {
  console.log('Something went wrong', err.stack);
  after();
}

driver.sleep(1000);

var above = By.css("#uniqName_1_0-mode-above-property")
driver.wait(until.elementLocated(above))
.then(_ => driver.findElement(above).click(), 10000);

driver.sleep(1000);

driver.findElement(By.xpath("//a[contains(@data-dojo-attach-event, 'click:_onSubmit')]")).click();

var pricing = By.xpath("//a[contains(@data-dojo-attach-event, 'click:_onPricingClick')]")

driver.sleep(1000);

driver.findElement(pricing).click();

driver.sleep(1000);

driver.findElement(By.xpath("//a[@data-child-id='testPrice']")).click()
.then(_ => driver.sleep(3000));

var los = driver.findElement(By.xpath("//input[@class='dijitReset dijitInputInner'][contains(@id,'lengthOfStay')]"));
driver.wait(until.elementLocated(By.xpath("//input[@class='dijitReset dijitInputInner'][contains(@id,'lengthOfStay')]")), 10000)
.then(_ => los.click());
los.clear();
los.sendKeys('2');

driver.findElement(By.xpath("//button[contains(.,'New')]")).click();

driver.sleep(1000);

var pcode = driver.findElement(By.id("dijit__WidgetsInTemplateMixin_1_propertyCode"))
pcode.click();
pcode.sendKeys('SJCCA');

driver.sleep(1000);

driver.findElement(By.xpath("//div[@id='widget_uniqName_1_2_arrivalDateEnd']/div")).click()
.then(_ => driver.findElement(By.xpath("//table[@id='uniqName_1_2_arrivalDateEnd_popup']/thead/tr[2]/th[3]/span")).click())
.then(_ => driver.findElement(By.xpath("//table[@id='uniqName_1_2_arrivalDateEnd_popup']/tbody/tr[6]/td[7]/span")).click())
.then(_ => driver.findElement(By.xpath("//button[@type='submit'][contains(.,'Update')]")).click());

//Scroll to bottom
driver.sleep(3000);
driver.executeScript("window.scrollTo(0, document.body.scrollHeight);")


var rooms = driver.findElement(By.xpath("(//input[@name='rooms'])[1]"));
driver.wait(until.elementLocated(By.xpath("(//input[@name='rooms'])[1]")), 5000)
.then(_ => rooms.click())
.then(_ =>rooms.clear())
.then(_ =>rooms.sendKeys('20'));

var rooms2 = driver.findElement(By.xpath("(//input[@name='rooms'])[2]"));
driver.wait(until.elementLocated(By.xpath("(//input[@name='rooms'])[2]")), 5000)
.then(_ => rooms2.click())
.then(_ =>rooms2.clear())
.then(_ =>rooms2.sendKeys('20'));



          driver.findElements(By.className("dateCell available needDate dateCellEnabled dateCellToday dateCellSeed")).then(function(links) {
            console.log('found', links.length, 'table elements');
            driver.sleep(20000);

driver.findElement(By.xpath("//button[@type='button'][contains(.,'Get Recommendation')]"))
.then(_ =>
driver.findElement(By.xpath("//button[@type='button'][contains(.,'Get Recommendation')]")).click());
driver.sleep(5000)

driver.findElement(By.xpath("(//input[@type='checkbox'])[7]")).click()
.then(_ =>
  driver.findElement(By.xpath("(//input[@type='checkbox'])[8]")).click())
  .then(_ => 
    driver.findElement(By.xpath("(//input[@type='checkbox'])[9]")).click())
    .then(_ => 
      driver.findElement(By.xpath("//span[@id='dijit_form_Button_5_label']")).click())
      .then(_ => 
        driver.sleep(3000))
        .then(_ => 
          driver.findElement(By.xpath("//span[@id='dijit_form_Button_7_label']")).click())
          .then(_ => 
            driver.sleep(5000));
            
            driver.sleep(3000).then(function test() {
              const testFolder = myDownloadFolder;
              const fs = require("fs");
              
              //Checking for file in app downloads folder
              fs.readdir(testFolder, (err, files) => {
                files.forEach(file => {
                  if (file.indexOf(s) > -1) {
                    console.log(file + " was successfully pulled");
                    return done();
                    
                    // use those file and return it as a REST API
                  } else if (file.indexOf(s) >= 0) {
                    console.log("Going into Overtime");
                    driver.sleep(30000).then(function test() {
                      const testFolder = myDownloadFolder;
                      const fs = require("fs");
                      fs.readdir(testFolder, (err, files) => {
                        files.forEach(file => {
                          if (file.indexOf(s) > -1) {
                            console.log(
                              file + " successfully pulled after a delay"
                              );
                              return done();
                              // use those file and return it as a REST API
                            } else if (file.indexOf(s) >= 0) {
                              console.log("Extract failed for " + s);
                              return done(err);
                            }
                          });
                        });
                      });
                    }
                  });
                });
              });
    //Add check for downloaded file then click close
    driver.findElement(By.xpath("//span[@id='dijit_form_Button_8_label']")).click();

          });
      });
  });
});

