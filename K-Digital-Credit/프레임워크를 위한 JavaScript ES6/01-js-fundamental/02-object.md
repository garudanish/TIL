# 객체

> 프레임워크를 위한 JavaScript ES6

자바스크립트는 **객체** 기반의 **스크립트 프로그래밍 언어**이기 때문에, 다른 프로그래밍 언어와 다른 양상을 보이기 시작하는 부분이 객체이다.

- 객체: **키**와 그에 매칭되는 **값(데이터)** 혹은 **동작**의 집합.
  - 키에 매칭되는 값(데이터)을 속성(Property)라고 부른다.
  - 키에 매칭되는 동작을 메서드라고 부른다.

키는 문자열 혹은 문자열로 해석될 수 있는 기호여야 한다. 일반적으로 문자열을 쓴다.
값으로는 모든 자료형이 올 수 있다.

```javascript
object = {
  key1: "key1에 매칭되는 데이터(property)",
  key2: "key2에 매칭되는 데이터(property)",
  method1: function () {
    // method는 함수로 정의
  },
};
```

```javascript
var osClass = {
  name: "운영체제",
  professor: "이동희",
  classno: 2,
  printInfo: function () {
    console.log(
      `${this.name} 강의 ${this.classno} 분반입니다. 교수는 ${this.professor}입니다.`
    );
  },
};

typeof osClass; // object
osClass.name; // "운영체제"
osClass.classno; // 2
osClass.printInfo(); // '운영체제 강의 2 분반입니다. 교수는 이동희입니다.'
```

메서드를 실행하기 위해선 메서드 뒤에 `()`를 붙여줘야 실행된다.

```javascript
osClass.students = 50;

osClass.students; // 50
```

객체에 새로운 키와 값을 추가하고 싶을 땐 `객체.새로운키 = 값`으로 추가한다.

```javascript
delete osClass.students;
```

객체에 있던 키를 삭제하고 싶을 땐 `delete 객체.키`를 사용한다.

```javascript
Object.keys(osClass); // (4) ["name", "professor", "classno", "printInfo"]
```

`Object.keys(객체)`를 사용하면 객체 안의 키들이 반환된다.
