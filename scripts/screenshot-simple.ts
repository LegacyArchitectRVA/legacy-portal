import { chromium } from "playwright";

const BASE = "http://localhost:4173";
const OUT = "tmp";

async function main() {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });

  // Desktop
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await ctx.newPage();

  console.log("📸 Landing...");
  await page.goto(BASE);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/landing.png` });

  console.log("📸 Login...");
  await page.goto(`${BASE}/login`);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/login.png` });

  // Sign up
  console.log("🔐 Signing up...");
  await page.goto(`${BASE}/signup`);
  await page.waitForTimeout(1000);
  await page.locator('input[name="name"]').fill("Test Agent");
  await page.locator('input[name="email"]').fill("screener@test.local");
  await page.locator('input[name="password"]').fill("testpass123");
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(4000);
  console.log("  URL now:", page.url());
  await page.screenshot({ path: `${OUT}/post-signup.png` });

  // Dashboard
  console.log("📸 Dashboard...");
  await page.goto(`${BASE}/dashboard`);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/dashboard.png`, fullPage: true });

  // Chapter
  console.log("📸 Chapter (digital)...");
  await page.goto(`${BASE}/chapter/digital`);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/chapter.png`, fullPage: true });

  // Upgrade
  console.log("📸 Upgrade...");
  await page.goto(`${BASE}/upgrade`);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/upgrade.png`, fullPage: true });

  // Settings
  console.log("📸 Settings...");
  await page.goto(`${BASE}/settings`);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/settings.png` });

  // Messages
  console.log("📸 Messages...");
  await page.goto(`${BASE}/messages`);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/messages.png` });

  // Mobile
  console.log("📱 Mobile landing...");
  const mctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const mp = await mctx.newPage();
  await mp.goto(BASE);
  await mp.waitForTimeout(2000);
  await mp.screenshot({ path: `${OUT}/mobile-landing.png` });

  // Mobile signup + dashboard
  console.log("📱 Mobile dashboard...");
  await mp.goto(`${BASE}/signup`);
  await mp.waitForTimeout(1000);
  await mp.locator('input[name="name"]').fill("Mobile Test");
  await mp.locator('input[name="email"]').fill("mobile2@test.local");
  await mp.locator('input[name="password"]').fill("testpass123");
  await mp.locator('button[type="submit"]').click();
  await mp.waitForTimeout(4000);
  await mp.goto(`${BASE}/dashboard`);
  await mp.waitForTimeout(2000);
  await mp.screenshot({ path: `${OUT}/mobile-dashboard.png`, fullPage: true });

  await browser.close();
  console.log("\n✅ Done! Screenshots in tmp/");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
