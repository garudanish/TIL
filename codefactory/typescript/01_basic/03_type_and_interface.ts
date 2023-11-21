/**
 * Type and Interface
 *
 * 타입은 쉽게 말해서 TS의 타입에 이름을 지어주는 역할을 한다
 */

type NewStringType = string;
type NewNullType = null;
type NewNumberType = number;

type MaleOrFemale = "male" | "female";

const stringVar: NewStringType = "string";

type IdolType = {
  name: string;
  year: number;
};

const yuJin: IdolType = {
  name: "안유진",
  year: 2002,
};

/**
 * Interface
 *
 * 기본적으로 객체형으로 들어가며, primitive를 넣을 수 없다.
 */

interface IdolInterface {
  name: string;
  year: number;
}

const yuJin2: IdolInterface = {
  name: "안유진",
  year: 2002,
};

interface IdolIT {
  name: NewStringType;
  year: NewNumberType;
}

const yuJin3: IdolIT = {
  name: "안유진",
  year: 2002,
};

interface IdolOptional {
  name: string;
  year?: number;
}

const yuJin4: IdolOptional = {
  name: "안유진",
  // year: 2002, // year가 없어도 에러가 나지 않음
};
