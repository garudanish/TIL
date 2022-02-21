# 클래스

> 프레임워크를 위한 JavaScript ES6

클래스, 객체지향, 상속의 개념은 자바스크립트에서 매우 중요하다.

자바스크립트엔 원래 클래스 개념이 없었다. 자바스크립트는 '프로토타입' 기반의 언어이기 때문에 원래 클래스 개념이 없고 쓸 일이 없어야 했다. 하지만 클래스를 사용한 프로그래밍이 너무 유용하기 때문에, ES5부터 함수로 클래스를 비슷하게 이용하고 있다.

클래스를 사용하면 **객체 지향 프로그래밍**이 가능해진다.

> ## 객체 지향 프로그래밍:
>
> 세상 만물을 **상태**와 **동작**으로 정의하고, 그렇게 정의한 **틀**을 가지고 객체들을 **찍어내는** 프로그래밍 방법론

## 클래스의 구조

```js
class 클래스이름 {
  constructor() {
    // 클래스의 상태를 초기화
  }
  method() {
    // 클래스의 동작을 정의
  }
}
```

클래스의 상태는 `constructor` 메서드를 통해서 초기화하고, 동작은 메서드로 추가한다.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`안녕 나는 ${this.name}이야!`);
  }
}

const hyeonsu = new Person("김현수");
const goorm = new Person("김구름");
```

클래스를 통해 새 객체를 생성할 때는 `new` 예약어를 사용한다.

## 상속

부모 클래스가 갖고 있는 것을 다 가지면서 추가로 상태와 동작을 추가해야 될 경우, 상속을 사용한다.

```js
class Student extends Person {
  constructor(name, school, major) {
    super(name);
    this.school = school;
    this.major = major;
  }

  getMajor() {
    console.log(`나는 ${school} 학교의 ${major}에 다니고 있어`);
  }
}

const yeongsu = new Student("김영수", "숭실대", "철학과");
```

`super`는 부모 클래스의 생성자로 초기화한다는 뜻이다. 부모 클래스를 초기화하기 위해 부모 클래스를 호출하는 것이다.

즉, 위의 코드는 `Student`가 상속한 `Person` 의 `constructor` 속 `name`을, 인스턴스가 만들어질 때 받아온 `name` 값으로 초기화한다는 뜻이다.

자식만의 상태를 갖고 싶다면(즉, 자식 클래스의 `constructor`에서 `this` 키워드를 사용하고 싶다면), 반드시 부모 클래스의 생성자(`super`)가 먼저 호출되어야 한다.
