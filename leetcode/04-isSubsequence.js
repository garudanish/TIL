// Given two strings s and t, return true if s is a subsequence of t, or false otherwise.
// A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.
// (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

var isSubsequence = function (s, t) {
  let lastIndex = -1;

  for (let i = 0; i < s.length; i++) {
    lastIndex = t.indexOf(s[i], lastIndex + 1);

    if (lastIndex === -1) return false;

    // 순서에 알맞게 들어있는지를 비교해야 한다
    // s를 돌면서 t에 있는 인덱스를 비교하고, 이전의 인덱스보다 크면 true
    // 같은 글자가 여러개 있으면? 마지막 인덱스부터 찾는 걸 시작하면 된다.
  }

  return true;
};
