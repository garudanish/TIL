// nums는 숫자로 이루어진 배열입니다. 가장 자주 등장한 숫자를 k 개수만큼 return해주세요.

// nums = [1,1,1,2,2,3], k = 2
// return [1,2]

// nums = [1], k = 1
// return [1]

function topK(nums, k) {
  // 여기에 코드를 작성해주세요.
  const hashTable = new Map();

  nums.map((num) =>
    hashTable.get(num)
      ? hashTable.set(num, hashTable.get(num) + 1)
      : hashTable.set(num, 1)
  );

  return Array.from(hashTable.entries())
    .sort(([a, b], [x, y]) => y - b)
    .map((entry) => entry[0])
    .slice(0, k);
}
