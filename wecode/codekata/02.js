// reverse 함수에 정수인 숫자를 인자로 받습니다. 그 숫자를 뒤집어서 return해주세요.

// x: 숫자 return: 뒤집어진 숫자를 반환!

// 예들 들어, x: 1234 return: 4321
// x: -1234 return: -4321
// x: 1230 return: 321

const reverse = (x) => {
  // 여기에 코드를 작성해주세요.

  const reversedNumber = parseInt(x.toString().split("").reverse().join(""));

  return x < 0 ? reversedNumber * -1 : reversedNumber;
};
