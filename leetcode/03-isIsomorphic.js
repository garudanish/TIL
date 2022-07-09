// Given two strings s and t, determine if they are isomorphic.
// Two strings s and t are isomorphic if the characters in s can be replaced to get t.
// All occurrences of a character must be replaced with another character while preserving the order of characters.
// No two characters may map to the same character, but a character may map to itself.

// Input: s = "egg", t = "add"
// Output: true
// Input: s = "foo", t = "bar"
// Output: false

var isIsomorphic = function (s, t) {
  // 못풀었다...

  if (s.length !== t.length) return false;

  const sMap = new Map();
  const tMap = new Map();

  for (let i = 0; i < s.length; i++) {
    const sCurrent = s[i];
    const tCurrent = t[i];

    if (!(sMap.has(s[i]) || tMap.has(t[i]))) {
      sMap.set(s[i], t[i]);
      tMap.set(t[i], s[i]);
    } else if (sMap.get(s[i]) !== t[i] || tMap.get(t[i]) !== s[i]) {
      return false;
    }
  }

  return true;
};
