# Operators

Dart는 다음 표의 연산자들을 지원합니다. 표는 Dart의 연산자 연관성과 [연산자 우선순위](https://dart.dev/language/operators#operator-precedence-example)를 높은 순에서 낮은 순으로 보여주며, 이는 Dart의 연산자 관계에 대한 근사치입니다. 이러한 연산자 중 다수를 [클래스 멤버](https://dart.dev/language/methods#operators)로 구현할 수 있습니다.

| 설명              | 연산자                                                 | 연관성 |
| ----------------- | ------------------------------------------------------ | ------ | ---- |
| 단항 접미사       | `expr++` `expr--` `()` `[]` `?[]` `.` `?.` `!`         | None   |
| 단항 접두사       | `-expr` `!expr` `~expr` `++expr` `--expr` `await expr` | None   |
| 곱셈              | `*` `/` `%` `~/`                                       | Left   |
| 덧셈              | `+` `-`                                                | Left   |
| 비트시프트        | `<<` `>>` `>>>`                                        | Left   |
| 비트 AND          | `&`                                                    | Left   |
| 비트 XOR          | `^`                                                    | Left   |
| 비트 OR           | `                                                      | `      | Left |
| 관계 및 타입 평가 | `>=` `>` `<=` `<` `as` `is` `is!`                      | None   |
| 동등              | `==` `!=`                                              | None   |
| 논리 AND          | `&&`                                                   | Left   |
| 논리 OR           | \|\|                                                   | Left   |
| if null           | `??`                                                   | Left   |
| 조건              | `expr1 ? expr2 : expr3`                                | Right  |
| 종속              | `..` `?..`                                             | Left   |
| 할당              | `=` `*=` `/=` `+=` `-=` `&=` `^=` _etc._               | Right  |

> 주의: 위 표는 참고 자료로만 사용해야 합니다. 연산자 우선순위와 연관성의 개념은 언어 문법에서 발견되는 진실의 근사치일 뿐입니다. [Dart 언어 사양](https://dart.dev/guides/language/spec)에 정의된 문법에서 Dart의 연산자 관계의 신뢰할 수 있는(authoritative) 동작을 확인할 수 있습니다.

연산자를 사용하는 것은 표현식을 만드는 것입니다. 연산자 표현식의 예시는 다음과 같습니다:

```dart
a++
a + b
a = b
a == b
c ? a : b
a is T
```

## Operator precedence example

연산자 표에서, 각 연산자는 뒤에 있는 열의 연산자보다 높은 우선순위를 가집니다. 예를 들어, 곱셈 연산자 `%`는 동등 연산자 `==`보다 높은 우선순위를 갖고 있고, 따라서 먼저 실행됩니다. 마찬가지로, 동등 연산자 `==`는 논리 AND 연산자인 `&&`보다 먼저 실행됩니다. 이 우선 순위는 다음 두 줄의 코드가 동일한 방식으로 실행됨을 의미합니다:

```dart
// 괄호는 가독성을 향상시킵니다
if ((n % i == 0) && (d % i == 0)) ...

// 읽기는 어렵지만 위와 동일합니다.
if (n % i == 0 && d % i == 0) ...
```

> 주의: 두 피연산자를 가지는 연산자의 경우 가장 왼쪽 피연산자에 따라 사용되는 메서드가 결정됩니다. 예를 들어, `Vecotr` 객체와 `Point` 객체가 있는 경우 `aVector` + `aPoint`는 `Vector` 덧셈(+)을 사용합니다.

## Arithmetic operators

Dart는 다음 표에 적혀있는 일반적인 산술 연산자를 지원합니다.

| 연산자  | 의미                                         |
| ------- | -------------------------------------------- |
| `+`     | 덧셈                                         |
| `-`     | 뺄셈                                         |
| `-expr` | 단항 뺄셈, 또는 부정(표현식의 부호를 뒤집음) |
| `*`     | 곱셈                                         |
| `/`     | 나눗셈                                       |
| `~/`    | 나눗셈, 정수 값을 반환                       |
| `%`     | 정수 나눗셈의 나머지 구하기                  |

예시:

```dart
assert(2 + 3 == 5);
assert(2 - 3 == -1);
assert(2 * 3 == 6);
assert(5 / 2 == 2.5); // 결과는 double임
assert(5 ~/ 2 == 2); // 결과는 int임
assert(5 % 2 == 1); // 나머지

assert('5/2 = ${5 ~/ 2} r ${5 % 2}' == '5/2 = 2 r 1');
```

또한 Dart는 접두사 및 접미사 증가∙감소 연산자를 지원합니다.

| 연산자  | 의미                                    |
| ------- | --------------------------------------- |
| `++var` | `var = var + 1` (표현식 값은 `var + 1`) |
| `var++` | `var = var + 1` (표현식 값은 `var`)     |
| `--var` | `var = var + 1` (표현식 값은 `var - 1`) |
| `var--` | `var = var - 1` (표현식 값은 `var`)     |

예시:

```dart
int a;
int b;

a = 0;
b = ++a; // b에 값을 할당하기 전에 a를 증가시킴
assert(a == b); // 1 == 1

a = 0;
b = a++; // b에 값을 할당한 후에 a를 증가시킴
assert(a != b); // 1 != 0

a = 0;
b = --a; // b에 값을 할당하기 전에 a를 감소시킴
assert(a == b); // -1 == -1

a = 0;
b = a--; // b에 값을 할당한 후에 a를 감소시킴
assert(a != b); // -1 != 0
```

## Equality and relational operators

다음 표는 동등 연산자와 관계 연산자의 의미를 나열합니다.

| 연산자 | 의미                 |
| ------ | -------------------- |
| `==`   | 동일; 아래 논의 참조 |
| `!=`   | 동일하지 않음        |
| `>`    | 큰                   |
| `<`    | 작은                 |
| `>=`   | 크거나 같은          |
| `<=`   | 작거나 같은          |

두 객체 x와 y가 같은 것을 나타내는지를 테스트하려면 `==`를 사용합니다. (드문 경우로, 두 객체가 정확히 같은 객체인지 확인하려면 [`identical()`](https://api.dart.dev/stable/dart-core/identical.html) 함수를 대신 사용합니다.) 다음은 `==` 연산자가 작동하는 방식입니다.

1. 만일 `x`나 `y`가 null이라면, 둘 다 null일 경우 true를 리턴하고, 하나만 null일 경우 false를 리턴한다.
2. 인수 y를 사용해 x에 대해 `==` 메서드를 호출한 결과를 반환한다. (맞습니다. `==`와 같은 연산자는 첫번째 피연산자에 대해 호출됩니다. 자세한 내용은 [연산자](https://dart.dev/language/methods#operators) 문서를 참고하세요)

다음은 동등 연산자와 관계 연산자를 사용하는 예시입니다:

```dart
assert(2 == 2);
assert(2 != 3);
assert(3 > 2);
assert(2 < 3);
assert(3 >= 3);
assert(2 <= 3);
```

## Type test operators

`as`, `is`, `is!` 연산자로 런타임에서 편리하게 타입을 체크할 수 있습니다.

| 연산자 | 의미                                                                                                                          |
| ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `as`   | 형 변환(Typecast, [라이브러리 접두사](https://dart.dev/language/libraries#specifying-a-library-prefix)를 특정하는데에도 쓰임) |
| `is`   | 객체가 특정한 타입을 가졌다면 true                                                                                            |
| `is!`  | 객체가 특정한 타입을 가지지 않았다면 true                                                                                     |

`obj is T`의 결과는 `obj`가 `T`로 특정된 인터페이스를 구현했다면 true입니다. 예를들어, `obj is Obect?`는 언제나 true입니다.

객체가 어떤 타입임을 확신할 수 있을 때에만 `as` 연산자를 사용해서 객체를 특정한 타입으로 캐스팅할 수 있습니다. 예시:

```dart
(employee as Person).firstName = '김현수';
```

만일 객체가 T 타입인 것이 확실하지 않다면, 사용하기 전 `is T`를 사용해 타입을 확인해야 합니다.

```dart
if (employee is Person) {
  // 타입 확인
  employee.firstName = '김현수';
}
```

> 참고: 위의 코드들은 동일하지 않습니다. 만일 `employee`가 null이거나 `Person`이 아닐 때, 첫 번째 예시는 예외를 던지지만 두 번째 예시는 아무것도 하지 않습니다.

## Assignment operators

이미 보셨듯, `=` 연산자를 통해 값을 할당할 수 있습니다. 값이 null인 경우에만 할당하려면 `??=` 연산자를 사용합니다.

```dart
// a에 값 할당
a = value;

// b가 null일 경우에만 값 할당; null이 아니라면 b는 변하지 않음.
b ??= value;
```

`+=`와 같은 복합 할당 연산자는 연산과 할당을 결합합니다.

`=`, `*=`, `%=`, `>>>=`, `^=`, `+=`, `/=`, `<<=`, `&=`, `|=`, `-=`, `~/=`, `>>=`

복합 할당 연산자가 작동하는 방식은 다음과 같습니다:

|             | 복합 할당 연산자 | 동일한 표현식 |
| ----------- | ---------------- | ------------- |
| 연산자 `op` | `a op= b`        | `a = a op b`  |
| 예시        | `a += b`         | `a = a + b`   |

다음의 예시는 할당 연산자와 복합 할당 연산자를 사용하는 예시입니다:

```dart
var a = 2; // =를 사용해 할당
a *= 3; // 할당 및 곱셈: a = a * 3
assert(a == 6);
```

## Logical operators

논리 연산자를 사용해 불리언 표현식을 반전시키거나 결합할 수 있습니다.

| 연산자  | 의미                                                    |
| ------- | ------------------------------------------------------- |
| `!expr` | 표현식을 반전시킴 (false를 true로, true를 false로 반전) |
| \|\|    | 논리적 OR                                               |
| `&&`    | 논리적 AND                                              |

다음은 논리 연산자를 사용하는 예시입니다:

```dart
if (!done && (col == 0 || col == 3)) {
  // ...Do something...
}
```

## Bitwise and shift operators

Dart에서 숫자의 개별 비트를 조작할 수 있습니다. 일반적으로 이러한 비트 연산자와 시프트 연산자를 정수와 함께 사용합니다.

| 연산자  | 의미                                                                    |
| ------- | ----------------------------------------------------------------------- |
| `&`     | AND                                                                     |
| \|      | OR                                                                      |
| `^`     | XOR                                                                     |
| `~expr` | 단항 비트 보수(Unary bitwise complement) (0s는 1s가 되고, 1s는 0s가 됨) |
| `<<`    | 왼쪽 으로 시프트                                                        |
| `>>`    | 오른쪽으로 시프트                                                       |
| `>>>`   | 언사인드 오른쪽 시프트                                                  |

다음은 비트 연산자 및 시프트 연산자를 사용하는 예시입니다:

```dart
final value = 0x22;
final bitmask = 0x0f;

assert((value & bitmask) == 0x02); // AND
assert((value & ~bitmask) == 0x20); // AND NOT
assert((value | bitmask) == 0x2f); // OR
assert((value ^ bitmask) == 0x2d); // XOR
assert((value << 4) == 0x220); // Shift left
assert((value >> 4) == 0x02); // Shift right
assert((value >>> 4) == 0x02); // Unsigned shift right
assert((-value >> 4) == -0x03); // Shift right
assert((-value >>> 4) > 0); // Unsigned shift right
```

> `>>>` 연산자(_트리플 시프트_ 혹은 _언사인드 시프트_)를 사용하려면 [언어 버전](https://dart.dev/guides/language/evolution#language-versioning)이 2.14 이상이어야 합니다.

## Conditional expressions

Dart는 if-else 문이 필요할 수 있는 표현식을 간결하게 평가할 수 있는 두 가지 연산자가 있습니다:

`condition ? expr1 : expr2`
만일 `condition`이 true라면 `expr1`로 평가됩니다(그리고 `expr1`의 값을 리턴합니다). `condition`이 false라면 `expr2`로 평가되고 그 값을 리턴합니다.

`expr1 ?? expr2`
`expr1`이 null이 아니라면 `expr1`의 값을 반환합니다. null이라면 `expr2`의로 평가되고 그 값을 리턴합니다.

불리언 평가식에 기반해서 값을 할당해야 할 때 `?`와 `:`를 사용할 수 있습니다.

```dart
var visibility = isPublic ? 'public' : 'private';
```

불리언 평가식이 null인지 테스트하는 경우 `??`를 사용할 수 있습니다.

```dart
String playerName(String? name) => name ?? 'Guest';
```

이전의 예제들은 적어도 두 가지 다른 방식들로 작성할 수 있습니다. 하지만 간결하지 않습니다.

```dart
// ?: 연산자를 사용해서 조금 길어짐
String playerName(String? name) => name != null ? name : 'Guset';

// if-else 문을 사용해서 아주 길어짐
String playerName(String? name) {
  if (name != null) {
    return name;
  } else {
    return 'Guest';
  }
}
```

## Cascade notation

종속(Casecade)(`..`, `?..`)을 사용하면 동일한 객체에 대해 일련의 작업을 수행할 수 있습니다. 인스턴스 멤버에 액세스하는 것 외에도, 동일한 객체에서 인스턴스 메서드를 호출할 수도 있습니다. 이렇게 하면 임시 변수를 생성하는 단계를 줄일 수 있고 보다 유연한 코드를 작성할 수 있습니다.

다음의 코드를 참고하세요:

```dart
var paint = Paint()
  ..color = Colors.black
  ..strokeCap = StrokeCap.round
  ..strokeWidth = 5.0;
```

생성자 `Paint()`는 `Paint` 객체를 리턴합니다. 종속 표기법을 따르는 이 코드는 반환될 수 있는 모든 값을 무시하고 이 객체에 대해 동작합니다.

이전의 예제는 다음 코드와 동일합니다:

```dart
var paint = Paint();
paint.color = Colors.black;
patnt.strokeCap = StrokeCap.round;
paint.strokeWidth = 5.0;
```

종속이 연산하는 객체가 null일 수 있다면, 첫 연산에 null 단축 종속(`?..`)을 사용합니다. `?..`로 시작하면 해당 null 객체에 종속이 시도되지 않도록 보장합니다.

```dart
querySelector('#confirm') // 객체를 가져옴
  ?..text = 'Confirm' // 객체의 멤버를 사용함
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'))
  ..scrollIntoView();
```

> `?..` 문법을 사용하려면 [언어 버전](https://dart.dev/guides/language/evolution#language-versioning)이 2.12 이상이어야 합니다.

이전의 코드는 다음과 동일합니다:

```dart
var button = querySelector('#confirm');
button?.text = 'Confirm';
button?.classes.add('important');
button?.onClick.listen((e) => window.alert('Confirmed!'));
button?.scrollIntoView();
```

중첩된 종속을 사용할 수 있습니다. 예를 들어:

```dart
final addressBook = (AddressBookBuilder()
    ..name = 'jenny'
    ..email = 'jenny@exmaple.com'
    ..phone = (PhoneNumberBuilder()
        ..number = '415-555-0100'
        ..label = 'home').
      build())
  .build();
```

실제 객체를 반환하는 함수에서 종속 구성해야한다는 점을 주의하세요. 예를 들어 다음 코드는 실패합니다:

```dart
var sb = StringBuffer();
sb.write('foo')
  ..write('bar'); // Error: method 'write' isn't defined for 'void'.
```

`sb.write()` 호출은 `void`를 반환합니다. `void`에는 종속을 구성할 수 없습니다.

> 엄밀히 말해서 `..` 표기법은 연산자가 아닙니다. 다트 문법의 일부입니다.

## Other operators

| 연산자 | 이름             | 의미                                                                                                                                                                                                                                       |
| ------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `()`   | 함수 적용        | 함수 호출을 나타냅니다                                                                                                                                                                                                                     |
| `[]`   | 첨자 접근        | 오버라이드 할 수 있는 `[]` 연산자 호출을 나타냅니다. 예시: `fooList[1]`은 `fooList`에 정수 `1`을 전달해 인덱스 `1`에 있는 요소에 접근합니다.                                                                                               |
| `?[]`  | 조건부 첨자 접근 | `[]`와 비슷하지만, 가장 왼쪽의 피연산자는 null일 수 있습니다. 예시: `fooList?[1]`은 `fooList`가 null이 아니라면 `fooList`에 정수 `1`을 전달해 인덱스 `1`에 있는 요소에 접근합니다. 만일 `fooList`가 null이라면 표현식은 null로 평가됩니다. |
| `.`    | 멤버 접근        | 표현식의 프로퍼티를 참조합니다. 예시: `foo.bar`는 표현식 `foo`의 프로퍼티 `bar`를 선택합니다.                                                                                                                                              |
| `?.`   | 조건부 멤버 접근 | `.`와 비슷하지만, 가장 왼쪽의 피연산자는 null일 수 있습니다. 예시: `foo?.bar`는 `foo`가 null이 아니라면 표현식 `foo`의 프로퍼티 `bar`를 선택합니다. 만일 `foo`가 null이라면 `foo?.bar`의 값은 `null`입니다.                                |
| `!`    | null 평가 연산자 | 표현식을 null이 아닌 타입으로 캐스팅하고, 캐스팅이 실패하면 런타임 예외를 던집니다. 예시: `foo!.bar`는 `foo`가 null이 아니며 `bar`를 선택합니다. `foo`가 null이면 런타임 예외가 던져집니다.                                                |

`.`, `?.`, `..` 연산자에 대한 더 자세한 정보는 [클래스](https://dart.dev/language/classes) 문서를 참고하세요.
