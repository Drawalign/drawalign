const { webkit } = require('@playwright/test');

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const cards = document.querySelectorAll('div.bg-accent-peach');
    return Array.from(cards).map((card) => {
      const imgWrap = card.querySelector('div.relative');
      const cs = imgWrap ? getComputedStyle(imgWrap) : null;
      const rect = imgWrap ? imgWrap.getBoundingClientRect() : null;
      const img = imgWrap ? imgWrap.querySelector('img') : null;
      const imgCs = img ? getComputedStyle(img) : null;
      return {
        computedHeight: cs ? cs.height : null,
        computedWidth: cs ? cs.width : null,
        computedAspectRatio: cs ? cs.aspectRatio : null,
        rectHeight: rect ? rect.height : null,
        rectWidth: rect ? rect.width : null,
        hasImg: !!img,
        imgPosition: imgCs ? imgCs.position : null,
        imgHeight: imgCs ? imgCs.height : null,
      };
    });
  });

  console.log('WebKit (Safari engine):');
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
