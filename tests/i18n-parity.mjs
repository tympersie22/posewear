import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const base = process.env.U || 'http://localhost:8787';
const browser = await chromium.launch();
const results = [];
const check = (name, value, detail = '') => {
  results.push({ name, value: Boolean(value), detail });
  console.log(`${value ? 'PASS' : 'FAIL'} ${name}${detail ? ` :: ${detail}` : ''}`);
};

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  const page = await context.newPage();
  await page.addInitScript(() => { if (!sessionStorage.posewearTestSeeded) { localStorage.clear(); sessionStorage.posewearTestSeeded = '1'; } });
  await page.goto(`${base}/`);
  await page.waitForFunction(() => window.APP && document.querySelectorAll('#grid .card').length >= 5);

  check('first visit defaults to English', await page.getAttribute('html', 'lang') === 'en');
  check('English navigation rendered', await page.locator('[data-tab=studio]').innerText() === 'Studio');
  check('English page has no visible CJK UI', !/[\u3400-\u9fff]/.test(await page.locator('body').innerText()));

  await page.click('[data-lang=sw]');
  check('Kiswahili switch is visible and works', await page.locator('button[data-tab=pose]').innerText().then(text => text.includes('Mikao')));
  await page.reload();
  await page.waitForFunction(() => window.APP && document.querySelectorAll('#grid .card').length >= 5);
  check('language persists across refresh', await page.getAttribute('html', 'lang') === 'sw');
  check('Kiswahili page has no visible CJK UI', !/[\u3400-\u9fff]/.test(await page.locator('body').innerText()));
  await page.click('[data-lang=en]');

  const expected = { pose: 280, depth: 270, costume: 427, anime: 440, portrait: 1499, expr: 36, hair: 122, dyn: 57, scene: 64, light: 50, prop: 32, furn: 41 };
  const catalogCounts = await page.evaluate(async expected => {
    const output = {};
    for (const key of Object.keys(expected)) output[key] = (await APP.load(key)).length;
    return output;
  }, expected);
  check('every gallery matches imported catalog counts', Object.entries(expected).every(([key, count]) => catalogCounts[key] === count), JSON.stringify(catalogCounts));

  const galleryTabs = Object.keys(expected);
  for (const lang of ['en', 'sw']) {
    await page.click(`[data-lang=${lang}]`);
    const residue = {};
    for (const tab of galleryTabs) {
      if (await page.locator('#lb').isVisible()) await page.keyboard.press('Escape');
      await page.click(`.tabs [data-tab=${tab}]`);
      await page.waitForFunction(tab => window.APP?.st.tab === tab && !document.querySelector('#grid').classList.contains('gbusy'), tab);
      await page.waitForTimeout(80);
      const found = await page.evaluate(() => {
        const output = [], cjk = /[\u3400-\u9fff]/;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          const parent = node.parentElement;
          if (parent && parent.offsetParent !== null && cjk.test(node.nodeValue || '')) output.push(node.nodeValue.trim());
        }
        for (const element of document.querySelectorAll('[aria-label],[title],[placeholder]')) {
          if (element.offsetParent === null) continue;
          for (const attribute of ['aria-label', 'title', 'placeholder']) {
            const value = element.getAttribute(attribute);
            if (value && cjk.test(value)) output.push(`${attribute}:${value}`);
          }
        }
        return [...new Set(output)].filter(Boolean);
      });
      if (found.length) residue[tab] = found;
    }
    check(`${lang === 'en' ? 'English' : 'Kiswahili'} has no visible CJK across every gallery`, Object.keys(residue).length === 0, JSON.stringify(residue));
  }
  await page.click('[data-lang=en]');

  await page.click('.tabs [data-tab=costume]');
  await page.waitForFunction(() => APP.st.tab === 'costume' && document.querySelector('#grid .card'));
  const total = await page.evaluate(() => APP.st.list.length);
  const term = await page.evaluate(() => APP.DATA.costume[0].id);
  await page.fill('#q', term);
  await page.waitForTimeout(250);
  check('search reduces and matches results', await page.evaluate(total => APP.st.list.length > 0 && APP.st.list.length < total, total));
  await page.fill('#q', '');
  await page.selectOption('#sort', 'id');
  await page.waitForFunction(() => APP.st.sort === 'id' && APP.st.list[0]?.ord > APP.st.list.at(-1)?.ord);
  check('reverse-ID sorting works', await page.evaluate(() => APP.st.list[0].ord > APP.st.list.at(-1).ord));
  await page.click('#rand');
  await page.waitForFunction(() => !document.querySelector('#lb').hidden);
  check('random selection opens a detail deep link', /#costume\//.test(page.url()), page.url());
  await page.keyboard.press('Escape');

  await page.evaluate(() => APP.toggleFav(APP.DATA.costume[0].k));
  await page.click('.tabs [data-tab=fav]');
  await page.waitForFunction(() => APP.st.tab === 'fav' && document.querySelector('#grid .card'));
  const [download] = await Promise.all([page.waitForEvent('download'), page.click('#exp')]);
  const downloadPath = await download.path();
  const exported = JSON.parse(await fs.readFile(downloadPath, 'utf8'));
  check('favourites export is v2 and backward compatible', exported.version === 2 && exported.favorites?.length === 1 && exported.收藏?.length === 1);
  await page.click('#clrFav');
  await page.setInputFiles('#impF', downloadPath);
  await page.waitForFunction(() => APP.st.fav.size === 1);
  check('favourites import restores the saved item', await page.evaluate(() => APP.st.fav.size === 1));

  await page.click('.tabs [data-tab=pose]');
  await page.waitForFunction(() => APP.st.tab === 'pose' && document.querySelector('#grid .card'));
  await page.click('#grid .card .phk');
  await page.waitForFunction(() => !document.querySelector('#lb').hidden);
  const openedId = await page.evaluate(() => APP.st.list.find(item => location.hash.endsWith(`/${item.id}`))?.id);
  await page.keyboard.press('Escape');
  await page.click('.tabs [data-tab=recent]');
  check('recent history records opened details', await page.waitForFunction(() => APP.st.tab === 'recent' && APP.st.list.length >= 1).then(() => true));

  await page.goto(`${base}/pose/${encodeURIComponent(openedId)}/`);
  await page.waitForFunction(() => window.APP && !document.querySelector('#lb').hidden);
  check('static direct route restores the detail modal', page.url().includes(`#pose/${openedId}`), page.url());
  check('deep link remains English by saved preference', await page.getAttribute('html', 'lang') === 'en');

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${base}/#studio`);
  await mobilePage.waitForFunction(() => window.WB && document.body.classList.contains('studio'));
  const overflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  check('mobile studio has no horizontal page overflow', !overflow);
  check('studio reports missing setup in English', /Still needed|API key|required/i.test(await mobilePage.locator('#studio').innerText()));
  await mobile.close();
  await context.close();
} finally {
  await browser.close();
}

const failed = results.filter(result => !result.value);
console.log(`\n${results.length - failed.length} passed, ${failed.length} failed`);
if (failed.length) process.exit(1);
