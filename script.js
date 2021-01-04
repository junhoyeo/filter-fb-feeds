const keywords = [];

const getCurrentKeywords = () =>
  new Promise((resolve) => {
    chrome.storage.local.get(['keywords'], function (result) {
      resolve(result['keywords'] || []);
    });
  });

const loadKeywords = async () => {
  const keywords = await getCurrentKeywords();
  const KeywordList = document.getElementById('keywords');
  KeywordList.innerHTML = '';

  keywords.forEach((keyword) => {
    const KeywordItem = document.createElement('li');
    KeywordItem.innerHTML = `
      <input disabled value="${keyword}" />
      <button class="remove" data-keyword="${keyword}">Remove</button>
    `;
    KeywordList.appendChild(KeywordItem);
  });

  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};

const onClickAddKeyword = async () => {
  const value = NewKeywordInput.value;

  if (!value) {
    window.alert('추가할 키워드를 입력해 주세요!');
    return;
  }

  const keywords = await getCurrentKeywords();
  if (keywords.includes(value)) {
    window.alert('이미 등록된 키워드입니다!');
    return;
  }

  chrome.storage.local.set({ keywords: [...keywords, value] }, () => {
    NewKeywordInput.value = '';
    NewKeywordInput.focus();
    loadKeywords();
  });
};

const onClickRemove = async (ButtonElement) => {
  const { keyword: currentKeyword } = ButtonElement.dataset;
  const keywords = await getCurrentKeywords();

  chrome.storage.local.set(
    { keywords: keywords.filter((value) => value !== currentKeyword) },
    () => {
      window.alert(`키워드 '${currentKeyword}'를 삭제했습니다!`);
      loadKeywords();
    },
  );
};

const AddKeywordButton = document.getElementById('add-keyword');
AddKeywordButton.addEventListener('click', onClickAddKeyword);

const NewKeywordInput = document.getElementById('new-keyword');
NewKeywordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    onClickAddKeyword();
  }
});

window.addEventListener('click', async (e) => {
  const ButtonElement = e.target;
  if (![...ButtonElement.classList].includes('remove')) {
    return;
  }
  onClickRemove(ButtonElement);
});

window.addEventListener('load', () => {
  NewKeywordInput.focus();
  loadKeywords();
});
