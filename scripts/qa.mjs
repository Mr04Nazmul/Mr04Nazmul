import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const base = process.env.QA_URL || "http://127.0.0.1:4173";
const server = process.env.QA_URL
  ? null
  : spawn(
      process.execPath,
      [
        "node_modules/vite/bin/vite.js",
        "preview",
        "--host",
        "127.0.0.1",
        "--port",
        "4173",
      ],
      { stdio: "pipe" },
    );
let browser;
try {
  if (server)
    for (let i = 0; i < 100; i++) {
      try {
        if ((await fetch(base)).ok) break;
      } catch {}
      await new Promise((r) => setTimeout(r, 100));
    }
  await mkdir("test-results", { recursive: true });
  browser = await chromium.launch({
    ...(process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH }
      : {}),
    args: ["--no-sandbox", "--disable-gpu", "--disable-accelerated-video-decode"],
  });
  const reports = [];
  const layouts = [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "iphone", width: 390, height: 844, isMobile: true, hasTouch: true },
    {
      name: "android",
      width: 412,
      height: 915,
      isMobile: true,
      hasTouch: true,
    },
    {
      name: "small-mobile",
      width: 320,
      height: 700,
      isMobile: true,
      hasTouch: true,
    },
    {
      name: "reduced-motion",
      width: 375,
      height: 812,
      isMobile: true,
      hasTouch: true,
      reducedMotion: "reduce",
    },
  ];
  for (const layout of layouts) {
    const { name, width, height, ...device } = layout;
    const context = await browser.newContext({
      viewport: { width, height },
      ...device,
    });
    const page = await context.newPage();
    const errors = [],
      failed = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("response", (r) => {
      if (r.status() >= 400 && r.url().startsWith(base))
        failed.push({ url: r.url(), status: r.status() });
    });
    await page.goto(base, { waitUntil: "networkidle", timeout: 60000 });
    await expect.poll(() => page.locator("video").evaluate(v => v.readyState), {timeout:20000}).toBeGreaterThanOrEqual(2);
    await page.waitForTimeout(1000);
    assert.equal(await page.locator("h1").count(), 1);
    for (const id of [
      "home",
      "about",
      "projects",
      "achievements",
      "skills",
      "contact",
    ])
      assert.equal(await page.locator("#" + id).count(), 1);
    assert.equal(await page.locator(".project-card").count(), 3);
    assert.equal(await page.locator('a[href*="Halal-japan"]').count(), 0);
    assert.equal(await page.locator('footer').getByRole('link', {name:'Skiper UI', exact:true}).count(), 0);
    assert.equal(await page.locator('footer').getByRole('link', {name:'React Bits', exact:true}).count(), 0);
    assert.equal(await page.locator('footer').getByRole('link', {name:'Magic UI', exact:true}).count(), 0);
    assert.equal(await page.locator('footer').getByRole('link', {name:'21st.dev', exact:true}).count(), 0);
    assert.equal(await page.locator('.identity-portrait img').getAttribute('src'), '/images/hossain-portrait.jpg');
    assert.equal(
      await page.locator("video source").last().getAttribute("src"),
      "https://japan-halal-checker-najmul.floot.app/_cdn/static/cdda02a5-a496-4e6d-a54a-eaa375b28a39-devnazu-portfolio-background.mp4",
    );
    assert.equal(await page.locator("video").getAttribute("loop"), "");
    const video = await page
      .locator("video")
      .evaluate((v) => ({
        muted: v.muted,
        loop: v.loop,
        inline: v.playsInline,
        width: v.videoWidth,
        height: v.videoHeight,
        error: v.error?.message,
        paused: v.paused,
      }));
    console.log(name, "initial media", JSON.stringify(video));
    assert.equal(video.muted, true);
    assert.equal(video.inline, true);
    await page.screenshot({ path: `test-results/${name}-hero.png` });
    if (width < 761) {
      const menu = page.locator("#menu-toggle");
      await menu.click();
      assert.equal(await menu.getAttribute("aria-expanded"), "true");
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
      await menu.click();
      await page
        .locator("#main-nav")
        .getByRole("link", { name: "Work", exact: true })
        .click();
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
    }
    const overflows = [];
    for (const id of [
      "about",
      "projects",
      "achievements",
      "skills",
      "contact",
    ]) {
      await page.locator("#" + id).scrollIntoViewIfNeeded();
      await page.waitForTimeout(650);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      if (overflow) overflows.push(id);
      await page.screenshot({ path: `test-results/${name}-${id}.png` });
    }
    assert.deepEqual(overflows, [], `Horizontal overflow on ${name}`);
    await page
      .getByRole("button", { name: "Next milestone", exact: true })
      .click();
    await page.waitForTimeout(600);
    assert.match(await page.locator(".carousel-count").innerText(), /02/);
    await page
      .getByRole("button", { name: "Go to milestone 3", exact: true })
      .click();
    await page.waitForTimeout(600);
    assert.match(await page.locator(".carousel-count").innerText(), /03/);
    await page
      .getByRole("button", { name: "Previous milestone", exact: true })
      .click();
    await page.waitForTimeout(600);
    assert.match(await page.locator(".carousel-count").innerText(), /02/);
    await page
      .getByRole("button", { name: "Expand video sound controls" })
      .click();
    console.log(name, "media at controls", await page.locator("video").evaluate(v => ({src:v.currentSrc,error:v.error?.message,code:v.error?.code,ready:v.readyState,network:v.networkState,canPlay:v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')})), {errors,failed});
    assert.equal(
      await page
        .getByRole("button", { name: "Enable background video sound" })
        .isEnabled(),
      true,
    );
    await page
      .getByRole("button", { name: "Enable background video sound" })
      .click();
    await page.waitForTimeout(500);
    assert.equal(await page.locator("video").evaluate((v) => v.muted), false);
    await page.getByRole("button", { name: "Mute background video" }).click();
    assert.equal(await page.locator("video").evaluate((v) => v.muted), true);
    await page
      .getByRole("button", { name: "Pause background video", exact: true })
      .click();
    assert.equal(await page.locator("video").evaluate((v) => v.paused), true);
    await page
      .getByRole("button", { name: "Collapse video sound controls" })
      .click();
    const broken = await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs
          .filter((i) => !i.complete || i.naturalWidth === 0)
          .map((i) => i.src),
      );
    assert.deepEqual(broken, [], `Broken images ${name}`);
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    const violations = accessibility.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    }));
    reports.push({
      layout: name,
      viewport: { width, height },
      video,
      errors,
      failed,
      overflows,
      brokenImages: broken,
      accessibilityViolations: violations,
    });
    console.log(name, JSON.stringify(reports.at(-1)));
    assert.deepEqual(errors, [], `Console errors ${name}`);
    assert.deepEqual(failed, [], `Failed requests ${name}`);
    assert.deepEqual(violations, [], `Accessibility violations ${name}`);
    await context.close();
  }
  await writeFile(
    "test-results/report.json",
    JSON.stringify(
      { testedAt: new Date().toISOString(), base, reports },
      null,
      2,
    ),
  );
  console.log(
    "PASS: all viewport, interaction, media, image, console and accessibility checks.",
  );
} finally {
  await browser?.close();
  server?.kill();
}
