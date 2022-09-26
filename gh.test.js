let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

test("h1 heading text content", async () => {
  await page.goto("https://githubuniverse.com/");
  const titleUniverse = await page.$eval("h1", (link) => link.textContent);
  expect(titleUniverse).toEqual("Let's build from here", 6000);
});

test("h1 sponsors text contect", async () => {
  await page.goto("https://github.com/sponsors");
  const sponsorsText = await page.$eval("h123", (link) => link.textContent);
  expect(sponsorsText).toContain(
    "Invest in the software that powers your world"
  );
});

test("pricing title", async () => {
  await page.goto("https://github.com/pricing");
  const pricingTitle = await page.title();
  expect(pricingTitle).toEqual(
    "Pricing · Plans for every developer · GitHub",
    6000
  );
});

test("sign in title", async () => {
  await page.goto("https://github.com/login");
  const signInTitle = await page.title();
  expect(signInTitle).toEqual("Sign in to GitHub · GitHub", 6000);
});

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  afterEach(() => {
    page.close();
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub: Where the world builds software · GitHub",
      6000
    );
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content", 6000);
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free", 6000);
  });
});
