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
  test.describe("GPO Shop", function() {
      test.before(function() {
        this.timeout(timeOut);
        driver
          .manage()
          .window()
          .setSize(1280, 720);
      });

      test.it("GPO interaction", async function(done, err) {
        // console.log(s);
        this.timeout(timeOut);
        driver.get(gpourl)
.then(_ => driver.wait(until.elementLocated(By.css("#uniqName_1_0-mode-above-property"))), 20000)
.then(_ => console.log('1'))
.then(_ => driver.sleep(5000))
.then(_ => driver.findElement(By.css("#uniqName_1_0-mode-above-property")).click(), 10000)
.then(_ => console.log('2'))
.then(_ => driver.sleep(5000))
.then(_ => driver.findElement(By.xpath("//a[contains(@data-dojo-attach-event, 'click:_onSubmit')]")).click(), 1000)
.then(_ => console.log('3'))
.then(_ => driver.sleep(5000))

  
driver.sleep(20000);
        //PRICE link

        // driver.findElement(By.css("heading > a")).click();
        // //TEST PRICE Link
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
