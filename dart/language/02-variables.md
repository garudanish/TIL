# Variables

다음은 변수를 생성하고 초기화하는 예제입니다:

```dart
var name = '김현수';
```

변수는 참조를 저장합니다. `name`이라는 변수는 `'김현수'`이라는 값을 가지고 있는 `String` 객체의 참조를 갖고 있습니다.

`name` 변수의 타입은 `String`으로 추론됩니다. 하지만 타입을 명시함으로써 바꿀 수 있습니다. 어떤 객체가 하나의 타입으로 제한되지 않는다면, `Object` 타입이나 필요한 경우 `dynamic` 타입으로 명시하면 됩니다.

```dart
Object name = '김현수';
```

다른 방법으론 추론될 형식을 명시적으로 선언하는 방법이 있습니다.

```dart
String name = '김현수';
```

> 이 문서는 지역 변수에 타입 어노테이션 대신 `var`를 사용하는 [스타일 가이드 권장사항](https://dart.dev/guides/language/effective-dart/design#types)을 따릅니다.

## Default value

`null`이 될 수 있는 타입이면서 초기화되지 않은 변수는 초깃값으로 `null`을 가집니다. Dart의 모든 것처럼, 숫자 역시 객체이므로 숫자 자료형을 가진다고 하더라도 변수의 초깃값은 `null`입니다.

```dart
int? lintCount;
assert(lineCount == null);
```

> 프로덕션 코드는 `assert()` 호출을 무시합니다. 반면 개발 중에는 `assert(condition)`은 `condition`이 `false`일 경우 예외를 던집니다. 자세한 정보는 [Assert 문서](https://dart.dev/language/control-flow#assert)를 참고하세요.

null safety를 활성화했다면, 변수를 사용하기 전에 null이 아닌 값으로 초기화해야 합니다.

```dart
int lineCount = 0;
```

지역 변수가 선언된 곳에서 초기화할 필요는 없지만, 사용하기 전에는 반드시 값을 할당해야 합니다. 예를 들어, 다음 코드는 `print()`로 전달될 때 `lineCount`가 null이 아닌 것을 Dart가 감지할 수 있기 때문에 유효합니다:

```dart
int lineCount;

if (weLikeToCount) {
  lineCount = countLines();
} else {
  lineCount = 0;
}

print(lineCount);
```

최상위와 클래스 변수는 느리게(lazily) 초기화되며, 초기화 코드는 변수가 처음 사용될 때 실행됩니다.

## Late variables

`late` 수정자는 두 가지 유즈케이스가 있습니다:

- 선언 후에 초기화되는 null이 아닌 변수를 선언할 때
- 변수를 느리게 초기화할 때

대체로 Dart의 제어 흐름 분석은 null이 아닌 변수가 사용되기 전에 null이 아닌 값으로 설정되는 것을 추적할 수 있지만, 때때로 분석이 실패할 때도 있습니다. 주로 최상위 변수와 인스턴스 변수일 때 그렇습니다. Dart는 종종 변수에 값이 설정되었는지를 결정할 수 없으므로, 시도하지 않습니다.

변수가 사용되기 전에 설정되었다고 확신하지만 Dart에서 동의하지 않는 경우, 변수를 `late`으로 표시하여 에러를 수정할 수 있습니다:

```dart
late String description;

void main() {
  description = '김치찌개!';
  print(description);
}
```

> `late` 변수를 초기화하는 데 실패한다면 변수가 사용될 때 런타임 에러가 발생합니다.

변수를 `late`로 선언하면서 초기화하면, 변수가 처음 사용될 때 초기화됩니다. 이 지연 초기화(lazy initialization)는 몇 가지 경우에 유용합니다:

- 변수가 사용될 지 확실하지 않고, 초기화하는 게 비쌀 때
- 인스턴스 변수를 초기화하면서 `this` 에 접근해야 할 때

다음의 예시에서 `temperature` 변수가 사용되지 않는다면, 비싼 작업인 `readThermometer()` 함수는 호출되지 않습니다:

```dart
// 이것이 프로그램의 유일한 readThermometer() 호출입니다.
late String temperature = readThermometer(); // 지연 초기화됨
```

## Final and const

변수를 변경하지 않으려면 `var`나 타입 대신 `final` 혹은 `const`을 사용하세요. `final` 변수는 한 번만 할당될 수 있고, `const` 변수는 컴파일 타임에서 상수입니다. (`const` 변수는 암묵적으로 `final`입니다.)

> [인스턴스 변수](https://dart.dev/language/classes#instance-variables)는 `final`일 수 있지만 `const`일 수는 없습니다.

다음은 `final` 변수를 생성하고 할당하는 예제입니다:

```dart
final name = '김현수'; // 타입 어노테이션 없는 경우
final String nickname = '가루다';
```

`final` 변수의 값을 변경할 수 없습니다.

```dart
name = '김수한무'; // Error: a final variable can only be set once.
```

**컴파일 타임에서 상수**이길 원한다면 변수를 `const`로 선언하세요. `const` 변수가 클래스 레벨이라면, `static const`라고 적어야 합니다. 변수를 선언하는 위치에서 값을 숫자나 문자열 리터럴, `const` 변수 또는 상수에 대한 산술 연산 결과와 같은 컴파일 타임 상수로 설정합니다.

```dart
const bar = 100000; // 압력의 단위 (dynes/cm2)
const double atm = 1.01325 * bar; // 표준 대기압
```

`const` 키워드는 상수 변수를 선언하는 데에만 쓰이지 않습니다. 상수 *값*을 만들 때에도 쓸 수 있으며, 상수 값을 _생성하는_ 생성자를 선언할 때에도 쓸 수 있습니다. 모든 변수는 상수 값을 가질 수 있습니다.

```dart
var foo = const [];
final bar = const [];
const baz = []; // `const []`와 같음
```

위의 예시에서 `baz`처럼, `const` 선언의 초기화 표현식에서는 `const`를 생략할 수 있습니다. 자세한 내용은 [const를 중복해서 사용하지 마세요](https://dart.dev/guides/language/effective-dart/design#types) 문서를 참고하세요.

`const` 값을 가졌다고 하더라도, 변수가 `final`이나 `const`로 선언되지 않았다면 값을 바꿀 수 있습니다.

```dart
foo = [1, 2, 3]; // 원래는 const [] 였음
```

하지만 `const`로 선언된 변수의 값을 바꿀 수는 없습니다.

```dart
baz = [42]; // Error: Constant variables can't be assigned a value.
```

[유형 검사 및 형 변환](https://dart.dev/language/operators#type-test-operators)(`is` 와 `as`), [컬렉션 `if`](https://dart.dev/language/collections#collection-operators), [스프레드 연산자](https://dart.dev/language/collections#spread-operators)(`...` 및 `...?`)를 사용하는 상수를 정의할 수 있습니다:

```dart
const Object i = 3; // i가 정수값을 가진 const Object일 때
const list = [i as int]; // 형 변환 사용
const map = {if (i is int) i: 'int'}; // is와 컬렉션 if 사용
const set = {if (list is List<int>) ...list}; // 스프레드 연산자 사용
```
