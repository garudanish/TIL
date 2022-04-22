// 인자인 height는 숫자로 이루어진 배열입니다.
// 그래프로 생각한다면 y축의 값이고, 높이 값을 갖고 있습니다.
// 아래의 그래프라면 height 배열은 [1, 8, 6, 2, 5, 4, 8, 3, 7] 입니다.
// https://storage.googleapis.com/replit/images/1555380144403_97221ca23fbb92beaae5b6c800ceb5c8.pn
// 저 그래프에 물을 담는다고 생각하고, 물을 담을 수 있는 가장 넓은 면적의 값을 반환해주세요.

function getMaxArea(height) {
  let maxArea = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const currentArea = (j - i) * Math.min(height[i], height[j]);

      maxArea = maxArea > currentArea ? maxArea : currentArea;
    }
  }

  return maxArea;

  // let left = 0;
  // let right = height.length - 1;
  // let maxArea = 0;

  // while (left < right) {
  //   const currentArea = (right - left) * Math.min(height[left], height[right]);
  //   maxArea = maxArea > currentArea ? maxArea : currentArea;

  //   height[left] > height[right] ? (right -= 1) : (left += 1);
  // }

  // return maxArea;
}
