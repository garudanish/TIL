// String 형인 str 인자에서 중복되지 않은 알파벳으로 이루어진 제일 긴 단어의 길이를 반환해주세요.
// str: 텍스트 return: 중복되지 않은 알파벳 길이 (숫자 반환)

// 예를 들어, str = "abcabcabc" return 은 3 => 'abc' 가 제일 길기 때문
// str = "aaaaa" return 은 1 => 'a' 가 제일 길기 때문
// str = "sttrg" return 은 3 => 'trg' 가 제일 길기 때문

const getLengthOfStr = (str) => {
  // 아래 코드를 작성해주세요.

  let hashTable = new Map();
  let answer = "";
  let compare = "";

  // 글자를 하나하나 돌면서 hashTable에 기록한다.

  // 만일 hashTable에 글자가 없다면 => 비교 대상인 compare에 글자를 추가한다.

  // 만일 hashTable에 글자가 있다면 = 중복되는 글자가 있다면 =>
  // answer와 compare의 글자 수를 비교한다.
  // compare의 글자 수가 더 길다면 = 새로운 답이 나왔다면

  // 조건 추가: 만일 돌고 있는 인덱스가 인풋의 length의 절반을 넘기지 못했다면
  // 즉, 반복문을 돌았을 때 현재 인덱스의 첫 글자부터 돌았을 때 더 긴 단어가 존재할 가능성이 있다면
  // answer에 compare를 대입하고,
  // hashTable과 compare를 해당 글자부터 초기화한다.

  // 인덱스가 인풋의 length의 절반을 넘겼다면, 현재 가진 단어들보다 긴 단어가 존재할 수 없으므로
  // 반복문을 종료한다.

  // 반복문을 종료했을 때, answer와 compare의 글자 수를 비교해 더 긴 문자열의 숫자를 리턴한다.

  for (let i = 0; i < str.length; i++) {
    if (hashTable.get(str[i])) {
      if (answer.length < compare.length) {
        if (i < str.length / 2) {
          answer = compare;
          hashTable = new Map([[str[i], true]]);
          compare = str[i];
          i = str.indexOf(str[i]);
        } else {
          break;
        }
      }
    } else {
      hashTable.set(str[i], true);
      compare += str[i];
    }
  }

  return answer.length > compare.length ? answer.length : compare.length;
};
