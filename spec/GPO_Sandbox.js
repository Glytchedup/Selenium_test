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
const timeOut = 900000;
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
var marsha = ["SJCCA", "SFOSB", "FATCH", "FATRI", "SFOFC"];

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
  test.describe("GpoShop", async function() {
    test.before(function() {
      this.timeout(timeOut);
      driver
        .manage()
        .window()
        .setSize(1360, 768);
    });

    test.it("PropertyShop", function(done, err) {
      this.timeout(timeOut);
      driver.get(gpourl).then(_ =>
        driver
          .manage()
          .timeouts()
          .pageLoadTimeout(10000)
      );

      function handleFailure(err) {
        console.log("Something went wrong", err.stack);
        after();
      }

      driver.sleep(2000);

      var above = By.css("#uniqName_1_0-mode-above-property");
      driver
        .wait(until.elementLocated(above))
        .then(_ => driver.findElement(above).click(), 10000);

      driver.sleep(1000);

      driver
        .findElement(
          By.xpath("//a[contains(@data-dojo-attach-event, 'click:_onSubmit')]")
        )
        .click();

      driver.sleep(1000);

      var pricing = By.xpath(
        "//a[contains(@data-dojo-attach-event, 'click:_onPricingClick')]"
      );

      driver.sleep(1000);

      driver.findElement(pricing).click();

      driver.sleep(1000);

      driver
        .findElement(By.xpath("//a[@data-child-id='testPrice']"))
        .click()
        .then(_ => driver.sleep(3000));

      var los = driver.findElement(
        By.xpath(
          "//input[@class='dijitReset dijitInputInner'][contains(@id,'lengthOfStay')]"
        )
      );
      driver
        .wait(
          until.elementLocated(
            By.xpath(
              "//input[@class='dijitReset dijitInputInner'][contains(@id,'lengthOfStay')]"
            )
          ),
          10000
        )
        .then(_ => los.click());
      los.clear();
      los.sendKeys("2");

      marsha.forEach(s => {
        driver.findElement(By.xpath("//button[contains(.,'New')]")).click();

        driver.sleep(1000);

        var pcode = driver.findElement(
          By.id("dijit__WidgetsInTemplateMixin_1_propertyCode")
        );
        pcode.click();
        pcode.sendKeys(s);

        driver.sleep(1000);

        driver
          .findElement(
            By.xpath("//div[@id='widget_uniqName_1_2_arrivalDateEnd']/div")
          )
          .click()
          .then(_ =>
            driver
              .findElement(
                By.xpath(
                  "//table[@id='uniqName_1_2_arrivalDateEnd_popup']/thead/tr[2]/th[3]/span"
                )
              )
              .click()
          )
          .then(_ =>
            driver
              .findElement(
                By.xpath(
                  "//table[@id='uniqName_1_2_arrivalDateEnd_popup']/tbody/tr[6]/td[7]/span"
                )
              )
              .click()
          )
          .then(_ =>
            driver
              .findElement(
                By.xpath("//button[@type='submit'][contains(.,'Update')]")
              )
              .click()
          );

        //Scroll to bottom
        driver.sleep(2000);
        driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
        driver.sleep(2000);

        // var elem = driver.findElement(By.xpath("//div[@class='container']//table[2]//tbody[1]//tr[1]//td[3]"));
        // driver.actions()
        //       .doubleClick(elem)
        //       .perform();
        // elem.getAttribute("class").then(function(selected) {
        // 	assert.equal("selected");
        // })
        // driver.actions().doubleClick(tues).perform()

        var rooms = driver.findElement(By.xpath("(//input[@name='rooms'])[1]"));
        driver
          .wait(
            until.elementLocated(By.xpath("(//input[@name='rooms'])[1]")),
            5000
          )
          .then(_ => rooms.click())
          .then(_ => rooms.clear())
          .then(_ => rooms.sendKeys("20"));

        var rooms2 = driver.findElement(
          By.xpath("(//input[@name='rooms'])[2]")
        );
        driver
          .wait(
            until.elementLocated(By.xpath("(//input[@name='rooms'])[2]")),
            5000
          )
          .then(_ => rooms2.click())
          .then(_ => rooms2.clear())
          .then(_ => rooms2.sendKeys("20"))
          .then(_ => driver.sleep(1000));
       
          // var fri = driver.findElement(By.xpath("//div[@class='container']//table[2]//tbody[1]//tr[1]//td[6]"));
          // var sun = driver.findElement(By.xpath("//div[@class='container']//table[2]//tbody[1]//tr[2]//td[1]"));
          // var tues2 = driver.findElement(By.xpath("//div[@class='container']//table[2]//tbody[1]//tr[2]//td[3]"));
   var script = 'let ele=document.evaluate("//div[@class=\'container\']//table[2]//tbody[1]//tr[1]//td[3]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;var clickEvent=document.createEvent("MouseEvents");clickEvent.initEvent("dblclick",!0,!0),ele.dispatchEvent(clickEvent);'

          driver.executeScript(script).then(function(return_value) {
            console.log('returned ', return_value)
            });
         driver.sleep(2000);
         
          //manually selecting dates
        // var el = driver.findElement(
        //   By.xpath("//div[@class='container']//table[2]//tbody[1]//tr[1]//td[3]"));
        //   el.click();
        //   driver.sleep(50);
        //   el.click();


          // let ele =document.evaluate("//div[@class='container']//table[2]//tbody[1]//tr[1]//td[3]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

          // var clickEvent = document.createEvent ('MouseEvents');
          // clickEvent.initEvent ('dblclick', true, true);
          // ele.dispatchEvent (clickEvent);
                  // driver.actions()
                  // .doubleClick(el)
                  // .perform();

// el.click();
// driver.sleep(1000);
// el.click();
        

//Time to click dates
        driver.sleep(15000);



        driver
          .findElement(
            By.xpath(
              "//button[@type='button'][contains(.,'Get Recommendation')]"
            )
          )
          .then(_ =>
            driver
              .findElement(
                By.xpath(
                  "//button[@type='button'][contains(.,'Get Recommendation')]"
                )
              )
              .click()
          );
        driver.sleep(6000);
        //Ideally this would be wait until all 5 tests are "done" assert?

        driver
          .findElement(By.xpath("(//input[@type='checkbox'])[7]"))
          .click()
          .then(_ =>
            driver
              .findElement(By.xpath("(//input[@type='checkbox'])[8]"))
              .click()
          )
          .then(_ =>
            driver
              .findElement(By.xpath("(//input[@type='checkbox'])[9]"))
              .click()
          )
          .then(_ =>
            driver
              .findElement(By.xpath("//span[@id='dijit_form_Button_5_label']"))
              .click()
          )
          .then(_ => driver.sleep(2000))
          .then(_ =>
            driver
              .findElement(By.xpath("//span[@id='dijit_form_Button_7_label']"))
              .click()
          )
          .then(_ => driver.sleep(2000));

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
                driver.sleep(10000).then(function test() {
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
          //Scroll to bottom
          driver.sleep(2000);
          driver.executeScript(
            "window.scrollTo(0, document.body.scrollHeight);"
          );
          driver.sleep(2000);
          //Add check for downloaded file then click close
          driver
            .findElement(By.xpath("//span[@id='dijit_form_Button_8_label']"))
            .click();
        });
      });
    });
  });
});
