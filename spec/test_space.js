//credentials in app-env
var eid = process.env.EID;
var password = process.env.PASSWORD;
var url = process.env.URL;

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
var marsha = ["SJCCA", "SLCSR"];

//Build Webdriver with Firefox profile setup
test.describe("Pull OYV2 Extracts", function() {
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

  //Loop to pull all extracts
  marsha.forEach(s => {
    test.describe("Pull Extract for " + s, function() {
      test.before(function() {
        this.timeout(timeOut);
        driver
          .manage()
          .window()
          .setSize(1280, 720);
      });

      test.it("Pull Extract", function(done, err) {
        console.log(s);
        this.timeout(timeOut);
        driver.get(url);
        driver.findElement(By.id("propertyCodeText")).sendKeys(s);
        driver.findElement(By.css("b > a")).click();
        driver.sleep(5000).then(function() {
          return driver.wait(
            until.elementLocated(By.id("dijit__TemplatedMixin_0")),
            20000
          );
        });
        driver.findElement(By.id("dijit__TemplatedMixin_0")).click();
        driver.findElement(By.id("dijit__TemplatedMixin_0")).click();
        driver.sleep(10000).then(function() {
          return driver.wait(
            until.elementLocated(By.css("span.icon.settings-button")),
            20000
          );
        });
        driver.findElement(By.css("span.icon.settings-button")).click();
        driver.findElement(By.css("#dijit_MenuItem_3_text")).click();

        driver.sleep(45000).then(function test() {
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
      });
    });
  });
});
