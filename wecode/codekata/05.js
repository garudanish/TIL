// strs은 단어가 담긴 배열입니다. 공통된 시작 단어(prefix)를 반환해주세요.

// 예를 들어 strs = ['start', 'stair', 'step'] return은 'st'
// strs = ['start', 'wework', 'today'] return은 ''

const getPrefix = (strs) => {
  if (!strs.length) {
    return "";
  }

  let prefix = "";

  for (let i = 0; i < strs[0].length; i++) {
    if (strs.every((item) => item.startsWith(prefix + strs[0][i]))) {
      prefix += strs[0][i];
    } else {
      return prefix;
    }
  }

  return prefix;
};
