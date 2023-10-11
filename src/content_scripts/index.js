// https://developer.chrome.com/docs/extensions/mv3/content_scripts/
// console.log('loaded krasty')

(async () => {
  const src = chrome.runtime.getURL('src/content_scripts/blocker');
  const { main } = await import(src);
  console.log('krasty before loading main file')
  main();
  console.log('krasty after loading main file')
})();