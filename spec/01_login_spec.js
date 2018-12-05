var webdriver = require('selenium-webdriver'),
                By = webdriver.By,
                until = webdriver.until;
var test = require('selenium-webdriver/testing');
var assert = require('assert');

var driver;
const timeOut = 15000;

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

test.describe('User Authentication', function () {

  test.before(function() {
     this.timeout(timeOut);
     driver = new webdriver.Builder()
          .forBrowser('firefox')
          .build();
     driver.manage().window().setSize(1280, 720);    
     driver.manage().window().setPosition(30, 78);
  });

  test.beforeEach(function() {
    this.timeout(timeOut);
    // driver.get('https://travel.agileway.net');
    driver.get('https://salesnet.marriott.com/oys/ym/oy/OysController/signIn');
  });

  test.after(function() {
    driver.quit();
  });

  // test.it('Invalid user', function() {
  //    this.timeout(timeOut);	  
  //    driver.findElement(webdriver.By.name('username')).sendKeys('drkub294');
  //    driver.findElement(webdriver.By.name('password')).sendKeys('toad789');
  //    driver.findElement(webdriver.By.name('submit')).click();
	// 	 driver.getPageSource().then(function(page_source){
	//      assert(page_source.contains("Invalid email or password"))
	// 	 });
  // });

  test.it('User can login successfully', function() {
     this.timeout(timeOut);	  
     driver.findElement(webdriver.By.name('username')).sendKeys('drkub294');
     driver.findElement(webdriver.By.name('password')).sendKeys('toad789');
     driver.findElement(webdriver.By.css('button.btn.btn-block')).click();
		//  driver.getPageSource().then(function(page_source){
		// 	 assert(page_source.contains("Welcome"))
	  //  });
	  //  driver.findElement(By.linkText("Sign off")).click();
  });

  test.it('[2] One-way trip', function() {
    this.timeout(timeOut);	  
  driver.findElement(By.xpath("//input[@name='tripType' and @value='oneway']")).click();	
  driver.findElement(By.name("fromPort")).sendKeys("New York");
  driver.findElement(By.name("toPort")).sendKeys("Sydney");
  driver.findElement(By.name("departDay")).sendKeys("02");
  driver.findElement(By.name("departMonth")).sendKeys("May 2016");
  driver.findElement(By.xpath("//input[@value='Continue']")).click();
 
  driver.findElement(By.tagName("body")).getText().then(function(the_page_text){
    assert(the_page_text.includes("2016-05-02 New York to Sydney"))
  });
 });


});