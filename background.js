console.log('FACEBOOK FEEDS ARE FILTERED');
const filteredWords = ['루다', '코로나', '코다리', '콩진호', 'ai', '개발자님'];

addEventListener('scroll', () => {
  feed = [...document.querySelectorAll('[role="feed"] > div')];

  feed.map((v) => {
    const text = v.innerText;
    const isFiltered = filteredWords.some((word) => text.includes(word));
    if (isFiltered) {
      v.remove();
    }
  });
});
