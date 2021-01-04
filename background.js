console.log('FACEBOOK FEEDS ARE FILTERED');

const getCurrentKeywords = () =>
  new Promise((resolve) => {
    chrome.storage.local.get(['keywords'], function (result) {
      resolve(result['keywords'] || []);
    });
  });

addEventListener('scroll', async () => {
  feed = [...document.querySelectorAll('[role="feed"] > div')];
  filteredWords = await getCurrentKeywords();
  console.log(filteredWords);

  feed.forEach((v) => {
    const text = v.innerText;
    const isFiltered = filteredWords.some((word) => text.includes(word));
    if (isFiltered) {
      v.remove();
    }
  });
});
