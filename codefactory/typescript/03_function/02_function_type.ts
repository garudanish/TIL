/**
 * Function Type
 */

type Mapper = (x: string) => string;

const runner = (callback: Mapper) => {
  return ["안유진", "장원영", "레이"].map(callback);
};

runner((x) => `아이브 멤버: ${x}`);
// runner((x, i) => i); // Mapper type은 string을 반환해야 하는데 number를 반환해서 에러

type MultiplyTwoNumbers = (x: number, y: number) => number;

const multiplyTwoNumbers: MultiplyTwoNumbers = (x, y) => x * y;

/**
 * Interface로 함수 타입 선언하기
 */

interface IMultiplyTwoNumbers {
  (x: number, y: number): number;
}

const multiplyTwoNumbers2: IMultiplyTwoNumbers = (x, y) => x * y;
