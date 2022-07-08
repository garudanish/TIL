// Given an array nums.
// We define a running sum of an array as runningSum[i] = sum(nums[0]…nums[i]).
// Return the running sum of nums.

// Input: nums = [1,2,3,4]
// Output: [1,3,6,10]
// Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].

var runningSum = function (nums) {
  const answer = [];
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    answer.push((sum += nums[i]));
  }

  return answer;
};
