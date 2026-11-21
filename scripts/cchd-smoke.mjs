import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE
  ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
  : 'playwright');

const base = new URL(process.env.CCHD_BASE_URL || 'http://127.0.0.1:4173');
const attempts = Number(process.env.CCHD_DEPLOY_ATTEMPTS || 1);
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});

async function check(run) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    serviceWorkers: 'block',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(6_000);
  const issues = [];
  page.on('pageerror', (error) => issues.push(error.message));
  const address = new URL(base);
  address.searchParams.set('cchd-smoke', Date.now() + '-' + run);
  address.hash = '/chd?s=screening';
  const tool = page.locator('[data-tool="Critical CHD pulse-oximetry screen"]');
  async function show(title) {
    await tool.getByText(title, { exact: true }).waitFor();
  }
  try {
    const response = await page.goto(address.href, { waitUntil: 'domcontentloaded', timeout: 15_000 });
    assert(response?.ok(), 'Page response was ' + response?.status());
    const hand = tool.getByLabel('Right hand SpO₂');
    const foot = tool.getByLabel('Foot SpO₂');
    await tool.getByRole('link', { name: 'Read the 2025 AAP screening algorithm' }).waitFor();
    await show('Enter both saturations (0% to 100%) to see the result.');
    await hand.fill('95');
    await foot.fill('92');
    await show('REPEAT in 1 hour');
    await show('The foot is below 95%.');
    await tool.getByRole('button', { name: 'Enter repeat values' }).click();
    assert.equal(await hand.inputValue(), '', 'Repeat reused initial hand measurement');
    assert.equal(await foot.inputValue(), '', 'Repeat reused initial foot measurement');
    await show('Enter both saturations (0% to 100%) to see the result.');
    await hand.fill('95');
    await foot.fill('92');
    await show('FAIL on repeat screen');
    await foot.fill('98');
    await show('PASS');
    await foot.fill('99');
    await show('FAIL on repeat screen');
    await tool.getByRole('radio', { name: 'Initial' }).click();
    assert.equal(await hand.inputValue(), '95');
    assert.equal(await foot.inputValue(), '92');
    await show('REPEAT in 1 hour');
    await hand.fill('89');
    await show('FAIL — SpO₂ <90% in either site');
    await hand.fill('101');
    await show('Invalid reading. Enter oxygen saturations from 0% to 100%. No result.');
    assert.equal(await tool.getByText(/^(PASS|FAIL|REPEAT)/).count(), 0);
    await foot.fill('');
    await hand.fill('89');
    await show('Enter both saturations (0% to 100%) to see the result.');
    assert.equal(await tool.getByText(/^(PASS|FAIL|REPEAT)/).count(), 0);
    assert.deepEqual(issues, [], 'Unhandled browser errors');
  } catch (error) {
    const visible = await tool.innerText({ timeout: 1_000 }).catch(() => '');
    console.error('Checked', page.url(), visible || '(calculator not visible)');
    throw error;
  } finally {
    await context.close();
  }
}

try {
  for (let run = 1; run <= attempts; run += 1) {
    try {
      await check(run);
      console.log('CCHD browser smoke passed at', base.href);
      break;
    } catch (error) {
      if (run === attempts) throw error;
      console.warn('Waiting for Vercel rollout; attempt', run, 'of', attempts, String(error));
      await new Promise((resolve) => setTimeout(resolve, 12_000));
    }
  }
} finally {
  await browser.close();
}
