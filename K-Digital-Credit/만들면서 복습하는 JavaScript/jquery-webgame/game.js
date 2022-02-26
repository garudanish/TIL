$(document).ready(function () {
  // 데이터 정의
  // 공의 개수
  var circleNumber = 0;
  // 공의 종류 - 지름, 반지름, 색, 속도(한 지점에서 다른 지점으로 움직일 때 걸리는 ms)
  var circleTypes = {
    option: ["color", "diameter", "radius", "speed"],
    small: ["black", 5, 2.5, 3000],
    medium: ["blue", 15, 7.5, 4000],
    large: ["yellow", 30, 15, 5000],
  };
  // 시간을 찍어주는 변수
  var t = 0;
  // 게임 실행 여부
  var gameOn = false;
  // 마우스 좌표
  var mouseX, mouseY;
});
