import { chromium } from "playwright";

const BASE = "http://localhost:4173";
const OUT = "tmp";

async function main() {
  // Start preview server
  console.log("🚀 Starting preview server...");
  const server = Bun.spawn(["bun", "run", "preview"], {
    cwd: import.meta.dir + "/..",
    stdout: "pipe",
    stderr: "pipe",
  });
  await new Promise((r) => setTimeout(r, 3000));
  console.log("✅ Server ready");

  const browser = await chromium.launch({ args: ["--no-sandbox"] });

  // Desktop screenshots
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await desktop.newPage();

  // Landing
  console.log("📸 Landing page...");
  await page.goto(BASE);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/landing.png` });

  // Login
  console.log("📸 Login page...");
  await page.goto(`${BASE}/login`);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}/login.png` });

  // Auth - sign up as test user
  console.log("🔐 Signing in...");
  await page.goto(`${BASE}/signup`);
  await page.waitForTimeout(1000);
  await page.locator('input[name="name"]').fill("Test Agent");
  await page.locator('input[name="email"]').fill("agent@test.local");
  await page.locator('input[name="password"]').fill("testpass123");
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(3000);
  console.log("  URL:", page.url());

  // Dashboard
  console.log("📸 Dashboard...");
  await page.goto(`${BASE}/dashboard`);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/dashboard.png`, fullPage: true });

  // Chapter
  console.log("📸 Chapter...");
  await page.goto(`${BASE}/chapter/digital`);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/chapter.png`, fullPage: true });

  // Upgrade
  console.log("📸 Upgrade...");
  await page.goto(`${BASE}/upgrade`);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/upgrade.png`, fullPage: true });

  // Payment
  console.log("📸 Payment...");
  await page.goto(`${BASE}/payment?from=vault&to=archive`);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/payment.png` });

  // Admin
  console.log("📸 Admin...");
  await page.goto(`${BASE}/admin`);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/admin.png` });

  // Generate
  console.log("📸 Generate Manual...");
  await page.goto(`${BASE}/generate`);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/generate.png` });

  // Mobile screenshots
  console.log("📱 Mobile screenshots...");
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mpage = await mobile.newPage();

  // Mobile landing
  await mpage.goto(BASE);
  await mpage.waitForTimeout(1500);
  await mpage.screenshot({ path: `${OUT}/mobile-landing.png` });

  // Mobile auth
  await mpage.goto(`${BASE}/signup`);
  await mpage.waitForTimeout(1000);
  await mpage.locator('input[name="name"]').fill("Mobile Test");
  await mpage.locator('input[name="email"]').fill("mobile@test.local");
  await mpage.locator('input[name="password"]').fill("testpass123");
  await mpage.locator('button[type="submit"]').click();
  await mpage.waitForTimeout(3000);

  // Mobile dashboard
  await mpage.goto(`${BASE}/dashboard`);
  await mpage.waitForTimeout(2000);
  await mpage.screenshot({ path: `${OUT}/mobile-dashboard.png`, fullPage: true });

  // Mobile sidebar open then close
  console.log("📱 Mobile sidebar...");
  const trigger = mpage.locator('[data-sidebar="trigger"]');
  if (await trigger.isVisible()) {
    await trigger.click();
    await mpage.waitForTimeout(500);
    await mpage.screenshot({ path: `${OUT}/mobile-sidebar.png` });
    // Click a nav item to verify sidebar closes
    await mpage.locator('text=2. Emergency').click();
    await mpage.waitForTimeout(1000);
    await mpage.screenshot({ path: `${OUT}/mobile-after-nav.png` });
  }

  await browser.close();
  server.kill();
  console.log("\n✅ All screenshots saved to tmp/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
