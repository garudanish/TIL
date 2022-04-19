// 문제
// 숫자로 이루어진 배열인 nums를 인자로 전달합니다. 숫자중에서 과반수(majority, more than a half)가 넘은 숫자를 반환해주세요.

// 예를 들어,
// nums = [3,2,3] => return 3
// nums = [2,2,1,1,1,2,2] => return 2

// 가정
// nums 배열의 길이는 무조건 2개 이상

function moreThanHalf(nums) {
  // 여기에 코드를 작성해주세요.
  // return nums.sort((a, b) => a - b)[Math.floor(nums.length / 2)]

  const hashTable = new Map();

  nums.map((num) => {
    hashTable.get(num)
      ? hashTable.set(num, hashTable.get(num) + 1)
      : hashTable.set(num, 1);
  });

  console.log(hashTable);

  for (let entry of hashTable.entries()) {
    console.log(entry);
    if (entry[1] >= nums.length / 2) {
      return entry[0];
    }
  }
}
