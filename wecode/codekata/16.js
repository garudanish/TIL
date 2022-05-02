// 문제
// 양수 N을 이진법으로 바꿨을 때, 연속으로 이어지는 0의 갯수가 가장 큰 값을 return해 주세요.
// 이어지는 0은 1과 1사이에 있는 것을 의미합니다.
// 1과 1사이에 있는 0을 binary gap 이라고 하겠습니다.

// input: 9
// output: 2
// 설명: 9의 이진수는 1001 입니다. 1과 1사이에 있는 0은 2 이므로, 2를 return

// input: 529
// output: 4
// 설명: 529의 이진수는 1000010001 입니다. binary gap은 4와 3 두개가 있습니다. 이 중 큰 값은 4이므로 4를 return

// input: 20
// output: 1
// 설명: 20의 이진수는 10100 입니다. 1과 1사이에 있는 연속된 0의 수는 1 뿐입니다. (뒤에 있는 0은 1사이에 있는 것이 아니므로)

// input: 15
// output: 0
// 설명: 15의 이진수는 1111 입니다. binary gap이 없으므로 0을 return

// input: 32
// output: 0
// 설명: 32의 이진수는 100000 입니다. binary gap이 없으므로 0을 return

const solution = (N) => {
  const split = N.toString(2).split("1");
  let longestBinaryGap = 0;

  for (let i = 0; i < split.length; i++) {
    const isBinaryGap =
      split[i - 1] !== undefined && split[i + 1] !== undefined;

    if (isBinaryGap) {
      const currentBinaryGap = split[i].length;

      longestBinaryGap =
        longestBinaryGap < currentBinaryGap
          ? currentBinaryGap
          : longestBinaryGap;
    }
  }

  return longestBinaryGap;
};
