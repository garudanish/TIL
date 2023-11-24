/**
 * Overloading
 */

/**
 * 파라미터를
 * 1) 하나를 받거나
 * 2) 세개를 받는 함수
 */

// 만일 파라미터가 하나라면, 아이돌 멤버들을 하나의 스트링으로 입력받는다.
// e.g.) '안유진, 장원영, 레이'
// 만일 파라미터가 세개라면, 아이돌 멤버들을 각각 파라미터로 입력받는다.
// e.g.) '안유진', '장원영', '레이'

// function body를 안 적고 시그니처만 적으면 함수를 구현할 때 시그니처에 해당하는 것만 구현할 수 있다.
function stringOrString(members: string): string;
function stringOrString(
  member1: string,
  member2: string,
  member3: string
): string;

// function stringOrString(member: string): number; // 시그니처를 선언하면 반드시 구현해야 한다.

function stringOrString(
  memberOrMembers: string,
  member2?: string,
  member3?: string
) {
  if (member2 && member3) {
    return `아이브: ${memberOrMembers}, ${member2}, ${member3}`;
  } else {
    return `아이브: ${memberOrMembers}`;
  }
}

console.log(stringOrString("안유진, 장원영, 레이"));
console.log(stringOrString("안유진", "장원영", "레이"));
// console.log(stringOrString("안유진", "장원영")); // 해당하는 시그니처가 없어서 에러 발생.
