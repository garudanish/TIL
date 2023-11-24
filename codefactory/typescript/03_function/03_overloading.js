"use strict";
/**
 * Overloading
 */
Object.defineProperty(exports, "__esModule", { value: true });
// function stringOrString(member: string): number; // 시그니처를 선언하면 반드시 구현해야 한다.
function stringOrString(memberOrMembers, member2, member3) {
    if (member2 && member3) {
        return `아이브: ${memberOrMembers}, ${member2}, ${member3}`;
    }
    else {
        return `아이브: ${memberOrMembers}`;
    }
}
console.log(stringOrString("안유진, 장원영, 레이"));
console.log(stringOrString("안유진", "장원영", "레이"));
// console.log(stringOrString("안유진", "장원영")); // 해당하는 시그니처가 없어서 에러 발생.
