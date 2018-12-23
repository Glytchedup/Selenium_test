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

driver.findElement(By.id("dijit__WidgetsInTemplateMixin_1_pricingType")).click();

driver.sleep(1000);

driver.findElement(By.xpath("//button[@type='submit'][contains(.,'Update')]")).click();

driver.sleep(3000);

//Click on End Date Pull-down
var enddate = By.xpath("//input[@class='dijitReset dijitInputInner'][contains(@id,'dijit_form_DateTextBox_0')]")
driver.wait(until.elementLocated(enddate), 10000)
.then(_ => driver.findElement(enddate).click())
.then(_ => driver.findElement(By.xpath("//span[@class='dijitCalendarDateLabel'][contains(@text,'5')]")).click())


driver.sleep(10000);
});

      test.it("CalendarPicker", function(done, err) {
//Select Dates -- DOUBLECLICK AINT WORKIN
driver.sleep(5000).then(_ => driver.findElement(By.xpath("//table[@class='month'][(@ddata-date, '2018-12-23')]")).doubleclick(), 10000)
.then(_ => driver.sleep(5000))
.then(_ => driver.findElement(By.xpath("//a[contains(@ddata-date, '2018-12-25')]")).doubleclick(), 10000)
.then(_ => driver.sleep(5000))
.then(_ => driver.findElement(By.xpath("//a[contains(@ddata-date, '2018-12-27')]")).doubleclick(), 10000)
.then(_ => driver.sleep(5000))
.then(_ => driver.sleep(5000))
//Add 20 Rooms
.then(_ => driver.findElement(webdriver.By.name("rooms")).sendKeys('20'))
.then(_ => driver.findElement(webdriver.By.name("rooms")).sendKeys('20'))
.then(_ => driver.sleep(5000))
//Get Recommendations
.then(_ => driver.findElement(By.xpath("//a[contains(@data-dojo-attach-event, 'testPrice')]")).click(), 10000)
.then(_ => driver.sleep(5000))
//Export
.then(_ => driver.findElement(By.xpath("//a[contains(@data-child-id, 'getRecommendationButtons')]")).click(), 10000)
.then(_ => driver.sleep(5000))
//Confirm File
.then(_ => driver.findElement(By.xpath("//a[contains(@data-child-id, 'testPrice')]")).click(), 10000)
.then(_ => driver.sleep(5000))
//Close
.then(_ => driver.findElement(By.xpath("//a[contains(@data-child-id, 'testPrice')]")).click(), 10000)
.then(_ => driver.sleep(5000))




        // driver.findElement(By.css("marriottSubMenuBar > a.marriottMenuItem")).click();
        // //LOS pull down
        // driver.findElement(By.id("marriottSubMenuBar > a.marriottMenuItem")).click();
        // //NEW button
        // driver.findElement(By.css("#dijit_form_Form_1 > button")).click();

        // driver.sleep(45000).then(function test() {
        //   const testFolder = myDownloadFolder;
        //   const fs = require("fs");

        //   //Checking for file in app downloads folder
        //   fs.readdir(testFolder, (err, files) => {
        //     files.forEach(file => {
        //       if (file.indexOf(s) > -1) {
        //         console.log(file + " was successfully pulled");
        //         return done();

        //         // use those file and return it as a REST API
        //       } else if (file.indexOf(s) >= 0) {
        //         console.log("Going into Overtime");
        //         driver.sleep(30000).then(function test() {
        //           const testFolder = myDownloadFolder;
        //           const fs = require("fs");
        //           fs.readdir(testFolder, (err, files) => {
        //             files.forEach(file => {
        //               if (file.indexOf(s) > -1) {
        //                 console.log(
        //                   file + " successfully pulled after a delay"
        //                 );
        //                 return done();
        //                 // use those file and return it as a REST API
        //               } else if (file.indexOf(s) >= 0) {
        //                 console.log("Extract failed for " + s);
        //                 return done(err);
        //               }
        //             });
        //           });
        //         });
        //       }
        //     });
        //   });
        // });
      });
    });
  });
// });
