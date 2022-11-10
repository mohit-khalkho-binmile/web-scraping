const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const URL = "https://www.easemytrip.com";

(async function example() {
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    /* 1. Navigate to URL */
    await driver.get(URL);

    /* 2. Find destination textbox and perform a focus. */
    await driver.findElement(By.id("Editbox13_show")).click();

    /* 3. Enter destination  */
    await driver.findElement(By.id("a_Editbox13_show")).sendKeys("Bangalore");

    /* 4. Find search button and perform click */
    await driver.findElement(By.css("srchBtnSe")).click();

    /* 5. Wait for page to be available */
    await driver.wait(until.elementLocated(By.css("top_bar_flgt_1")), 10 * 1000);

    /* 6. Once page is available, select first child and perform click "Book Now" */
    await driver.findElement(By.css("row:nth-child(2) > btn:nth-child(2)")).click();

    /* 7. Wait for booking details page to be available */
    await driver.wait(until.elementLocated(By.css("coupn_inr")), 10 * 1000);

    /* 8. Select all coupon elements */
    const couponList = await driver.findElements(By.css("coupn_col"));

    /* 9. Iterate over all coupons and find title and para for each coupon item */
    for(let item of couponList) {
      const title = await item.findElements(By.css("coupn_ttl"));
      const para = await item.findElements(By.css("coupn_para"));

      console.log(`${title} - ${para}`);
    }
  } finally {
    await driver.quit();
  }
})();