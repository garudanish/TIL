// twoSum함수에 숫자배열과 '특정 수'를 인자로 넘기면, 더해서 '특정 수'가 나오는 index를 배열에 담아 return해 주세요.

// nums: 숫자 배열
// target: 두 수를 더해서 나올 수 있는 합계
// return: 두 수의 index를 가진 숫자 배열

// 예를 들어,
// nums은 [4, 9, 11, 14] target은 13
// nums[0] + nums[1] = 4 + 9 = 13 이죠?
// 그러면 [0, 1]이 return 되어야 합니다.

// # 가정
// target으로 보내는 합계의 조합은 배열 전체 중에 2개 밖에 없다고 가정하겠습니다.

const twoSum = (nums, target) => {
  // 아래 코드를 작성해주세요.

  const answer = [];
  const hashTable = new Map();

  // 1. nums를 map 메서드를 통해 순회한다.
  // 2. hashTable에서 num을 구한다.
  // 2-1. num을 구한 값이 없다면, hashTable에 target - num을 뺀 값을 키로, num의 index를 밸류로 저장한다.
  // 2-2. num을 구한 값이 있다면, 구한 값과, num의 인덱스를 answer에 푸시한다.

  nums.map((num, index) => {
    if (hashTable.get(num) !== undefined) {
      answer.push(hashTable.get(num), index);
    } else {
      hashTable.set(target - num, index);
    }
  });

  return answer;
};
