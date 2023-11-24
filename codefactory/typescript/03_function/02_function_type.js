"use strict";
/**
 * Function Type
 */
Object.defineProperty(exports, "__esModule", { value: true });
const runner = (callback) => {
    return ["안유진", "장원영", "레이"].map(callback);
};
runner((x) => `아이브 멤버: ${x}`);
const multiplyTwoNumbers = (x, y) => x * y;
const multiplyTwoNumbers2 = (x, y) => x * y;
