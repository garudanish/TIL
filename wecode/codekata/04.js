// 숫자인 num을 인자로 넘겨주면, 뒤집은 모양이 num과 똑같은지 여부를 반환해주세요.
// num: 숫자 return: true or false (뒤집은 모양이 num와 똑같은지 여부)

// 예를 들어, num = 123 return false => 뒤집은 모양이 321 이기 때문
// num = 1221 return true => 뒤집은 모양이 1221 이기 때문
// num = -121 return false => 뒤집은 모양이 121- 이기 때문
// num = 10 return false => 뒤집은 모양이 01 이기 때문

const sameReverse = (num) => {
  return num.toString() === num.toString().split("").reverse().join("");

  // const reversedNum = num.toString().split("").reverse().join("");
  // return num.toString() === reversedNum;
};
