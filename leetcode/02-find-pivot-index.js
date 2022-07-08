// Given an array of integers nums, calculate the pivot index of this array.
// The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.
// If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.
// Return the leftmost pivot index. If no such index exists, return -1.

// Input: nums = [1,7,3,6,5,6]
// Output: 3
// Explanation:
// The pivot index is 3.
// Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
// Right sum = nums[4] + nums[5] = 5 + 6 = 11

var pivotIndex = function (nums) {
  // 정수 배열 nums의 pivot index 구하기
  // pivot 인덱스는 그 인덱스를 기준으로 왼쪽 요소들의 합과 오른쪽 요소들의 합이 같아지는 지점
  // 만일 인덱스가 0이라면 left sum은 0이다.
  // 가장 왼쪽의 피벗 인덱스를 리턴하라. 없다면 -1을 리턴한다.

  if (nums.length === 2 && nums[1] === 0) {
    return 0;
  }

  let leftSum = 0;
  let rightSum = nums.reduce((acc, cur) => acc + cur);

  for (let i = 0; i < nums.length; i++) {
    if (leftSum === rightSum - nums[i]) {
      return i;
    }
    leftSum += nums[i];
    rightSum -= nums[i];
  }

  return -1;
};
