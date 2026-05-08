import { runTest } from "./auth";

runTest("Portal E2E Test", async (helper) => {
  const { page } = helper;

  // Test Landing Page
  console.log("→ Testing landing page...");
  await helper.goto("/");
  await page.waitForTimeout(3000);
  await helper.screenshot("test-landing");
  
  const heroText = await page.locator("text=Legacy Architect").first().isVisible();
  console.log("  Hero text visible:", heroText);
  if (!heroText) {
    await helper.printDebugInfo();
    throw new Error("Landing page hero text missing");
  }
  console.log("✅ Landing page OK");

  // Test Login Page
  console.log("→ Testing login page...");
  await helper.goto("/login");
  await page.waitForTimeout(2000);
  await helper.screenshot("test-login");
  console.log("✅ Login page OK");

  // Dashboard (already logged in from test helper)
  console.log("→ Testing dashboard...");
  await helper.goto("/dashboard");
  await page.waitForTimeout(3000);
  await helper.screenshot("test-dashboard");
  console.log("✅ Dashboard OK, URL:", page.url());

  // Test chapter page
  console.log("→ Testing chapter page...");
  await helper.goto("/chapter/digital");
  await page.waitForTimeout(3000);
  await helper.screenshot("test-chapter");
  console.log("✅ Chapter page OK");

  // Upgrade page
  console.log("→ Testing upgrade page...");
  await helper.goto("/upgrade");
  await page.waitForTimeout(2000);
  await helper.screenshot("test-upgrade");
  console.log("✅ Upgrade page OK");

  console.log("✅ All tests passed");
}).catch((e) => {
  console.error("Test error:", e);
  process.exit(1);
});
