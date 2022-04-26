// 두 개의 input에 복소수(complex number)가 string 으로 주어집니다. 복소수란 a+bi 의 형태로, 실수와 허수로 이루어진 수입니다.
// input으로 받은 두 수를 곱해서 반환해주세요. 반환하는 표현도 복소수 형태의 string 이어야 합니다.
// 복소수 정의에 의하면 (i^2)는 -1 이므로 (i^2) 일때는 -1로 계산해주세요.

// 예제 1:
// Input: "1+1i", "1+1i" / Output: "0+2i"

// 예제 2:
// Input: "1+-1i", "1+-1i" / Output: "0+-2i"

// 예제 3:
// Input: "1+3i", "1+-2i" / Output: "7+1i"

// 가정
// input은 항상 a+bi 형태입니다. output도 a+bi 형태로 나와야 합니다.

const complexNumberMultiply = (a, b) => {
  // 여기에 코드를 작성해주세요.
  let answer = "";

  const splittedNumber = [a, b]
    .map((num) => num.split("+"))
    .map((el) => el.map((num) => parseInt(num)));

  const realNumbers = [splittedNumber[0][0], splittedNumber[1][0]];
  const imaginaryNumbers = [splittedNumber[0][1], splittedNumber[1][1]];

  const answerRealNumbers =
    realNumbers.reduce((pre, cur) => pre * cur) -
    imaginaryNumbers.reduce((pre, cur) => pre * cur);

  const answerImaginaryNumbers =
    realNumbers[0] * imaginaryNumbers[1] +
    realNumbers[1] * imaginaryNumbers[0] +
    "i";

  answer += `${answerRealNumbers}+${answerImaginaryNumbers}`;

  return answer;

  // return (splittedNumber[0][0] * splittedNumber[1][0] - splittedNumber[0][1] * splittedNumber[1][1]) + "+" + (splittedNumber[0][1] * splittedNumber[1][0] + splittedNumber[0][0] * splittedNumber[1][1]) + "i"
};
