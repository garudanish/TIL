# Built-in types

Dart 언어는 다음 목록을 특별히 지원합니다:

- [숫자](https://dart.dev/language/built-in-types#numbers)(`int`, `double`)
- [문자열](https://dart.dev/language/built-in-types#strings)(`String`)
- [불리언](https://dart.dev/language/built-in-types#booleans)(`bool`)
- [배열](https://dart.dev/language/built-in-types#lists)(`List`, *array*라고도 부름)
- [집합](https://dart.dev/language/built-in-types#sets)(`Set`)
- [맵](https://dart.dev/language/built-in-types#maps)(`Map`)
- [Runes](https://dart.dev/language/built-in-types#runes-and-grapheme-clusters)(`Runes`; 종종 `characters` API로 대체됨)
- [심볼](https://dart.dev/language/built-in-types#symbols)(`Symbol`)
- `null` 값(`Null`)

이지원은 객체를 리터럴로 생성할 수 있는 능력을 포함합니다. 예를 들어, `'this is a string'`은 문자열 리터럴이고, `true`는 불리언 리터럴입니다.

Dart에서 모든 변수는 *클래스*의 인스턴스인 객체로의 참조이므로, 변수를 초기화하기 위해 *생성자*를 주로 사용합니다. 몇 가지 빌트인 타입은 그 타입만의 생성자를 가지고 있습니다. 예를 들어, `Map()` 생성자를 통해 맵을 만들 수 있습니다.

Dart 언어에서 특별한 역할을 가진 다른 타입들도 있습니다:

- `Object`: `Null`을 제외한 모든 Dart 클래스의 수퍼 클래스입니다.
- `Enum`: 모든 enum의 수퍼 클래스입니다.
- `Future`와 `Stream`: [비동기 지원](https://dart.dev/language/async)에서 사용됩니다.
- `Iterable`: [for-in 반복문](https://dart.dev/guides/libraries/library-tour#iteration)과 동기 [제너레이터 함수](https://dart.dev/language/functions#generators)에서 사용됩니다.
- `Never`: 표현식이 평가를 성공적으로 완료할 수 없음을 나타냅니다. 항상 예외를 던지는 함수에 가장 많이 사용됩니다.
- `dynamic`: 정적 체크를 비활성화함을 나타냅니다. 일반적으로는 `Object`나 `Object?`를 대신 사용해야 합니다.
- `void`: 절대로 사용되지 않는 값을 나타냅니다. 리턴 타입으로 사용됩니다.

`Object`, `Object?`, `Null`, `Never` 클래스는 클래스 위계에서 특별한 역할을 가지며, [null safety 이해하기](https://dart.dev/null-safety/understanding-null-safety#top-and-bottom) 문서에 설명되어 있습니다.

## Numbers

Dart에서 숫자는 두 가지 종류가 있습니다:

[`int`](https://api.dart.dev/stable/dart-core/int-class.html)
64비트보다 크지 않은 정수 값으로, [플래폼에 따라 다릅니다](https://dart.dev/guides/language/numbers). 네이티브 플래폼에서는 값은 -2^63에서 2^63 - 1 사이입니다. 웹에서는 정수는 자바스크립트 숫자(소수 부분이 없는 64비트 부동 소수점 값)로 대체되며 2^53에서 2^53 -1 사이입니다.

[`double`](https://api.dart.dev/stable/dart-core/double-class.html)
IEEE 754 표준에 지정된 64비트(배정밀도) 부동 소수점 수입니다.

`int`와 `double` 둘 다 [`num`](https://api.dart.dev/stable/2.19.4/dart-core/num-class.html)의 서브타입입니다. num 타입은 +, -, /, \*과 같은 기본 연산자와 `abs()`, `ceil()`, `floor()` 등의 메서드를 가집니다. (>>와 같은 비트 연산자는 `int` 클래스에 정의되어 있습니다.) 만일 여러분이 찾는 게 num과 서브타입이 아니라면, 아마도 [dart:math](https://api.dart.dev/stable/2.19.4/dart-math/dart-math-library.html) 라이브러리를 찾아보면 될 것입니다.

정수는 소수점이 없는 숫자입니다. 다음은 정수 리터럴을 정의하는 예시입니다:

```dart
var x = 1;
var hex = 0xDEADBEEF;
```

숫자가 소수점을 포함하고 있다면, `double` 자료형입니다. 다음은 `double` 리터럴을 정의하는 예시입니다:

```dart
var y = 1.1;
var exponents = 1.42e5;
```

변수를 num 타입으로 선언할 수 있습니다. 이렇게 하면 변수는 정수와 `double` 값 두 개를 모두 가질 수 있습니다.

```dart
num x = 1; // x는 int와 double 값 둘 다 가질 수 있습니다.
x += 2.5;
```

정수 리터럴은 필요하다면 자동으로 `double`로 변환됩니다.

```dart
double z = 1; // double z = 1.0과 동일함
```

다음은 문자열을 숫자로 변환하거나 숫자를 문자열로 변환하는 예시입니다:

```dart
// 문자열 -> 정수
var one = int.parse('1');
assert(one == 1);

// 문자열 -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// 정수 -> 문자열
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double ->  문자열
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
```

`int` 타입은 비트 필드에서 플래그를 조작하고 마스킹하는데 유용한 기존의 비트 시프트(`<<`, `>>`, `<<<`), 보 (`~`), AND(`&`), OR(`|`), XOR(`^`) 연산자를 지정합니다. 예를 들어:

```dart
assert((3 << 1) == 6); // 0011 << 1 == 0110
assert((3 | 4) == 7); // 0011 | 0100 == 0111
assert((3 & 4) == 0); // 0011 & 0100 == 0000
```

더 많은 예시는 [비트시프트 연산자 섹션](https://dart.dev/language/operators#bitwise-and-shift-operators)을 참고하세요.

리터럴 숫자는 컴파일 타임 상수입니다. 많은 산술 표현식 역시 피연산자가 숫자로 평가되는 컴파일 타임 상수인 한 컴파일 타임 상수입니다.

```dart
const msPerSecond = 1000;
const secondsUntilRetry = 5;
const msUntilRetry = secondsUntilRetry * msPerSecond;
```

더 많은 정보는 [Dart에서의 숫자](https://dart.dev/guides/language/numbers) 문서를 참고하세요.

## Strings

Dart 문자열(`String` 객체)는 일련의 UTF-16 코드 단위를 가집니다. 문자열을 만들기 위해 홑따옴표 혹은 쌍따옴표 둘 중 하나를 사용할 수 있습니다.

```dart
var s1 = '홑따옴표로 문자열 리터럴을 만들 수 있습니다.';
var s2 = "쌍따옴표 역시 잘 동작합니다.";
var s3 = '문자열 구분자를 이스케이프하려면 \'이렇게\' 사용하면 됩니다.';
var s4 = "다른 구분자 안에서는 '더' 사용하기 쉽습니다.";
```

`${expression}`을 사용해 문자열 안에 표현식의 값을 넣을 수 있습니다. 만일 표현식이 식별자라면, `{}`를 생략할 수 있습니다. 객체에 상응하는 문자열을 얻기 위해, Dart는 객체의 `toString()` 메서드를 호출합니다.

```dart
var s = '문자열 보간';
var e = 'string interpolation';

assert('Dart는 $s을 갖고 있어 편리합니다' == 'Dart는 문자열 보간을 갖고 있어 편리합니다');
assert('That deserves all caps. '
  '${s.toUpperCase()} is very handy!' ==
'That deserves all caps. '
  'STRING INTERPOLATION is very handy!');
```

> `==` 연산자는 두 객체가 동일한지 테스트합니다. 두 문자열이 동일하다는 것은 같은 일련의 코드 단위를 포함한다는 뜻입니다.

문자열 리터럴을 연달아 적거나 `+` 연산자를 사용하여 문자열을 연결할 수 있습니다.

```dart
var s1 = '문자열 '
  '합치기는'
  " 줄이 달라도 동작합니다.";

assert(s1 == '문자열 합치기는 줄이 달라도 동작합니다.');

var s2 = '+ 연산자도 ' + '잘 동작합니다.';
assert(s2 == '+ 연산자도 잘 동작합니다.');
```

여러 줄 문자열을 만드는 다른 방법은 홑따옴표 혹은 쌍따옴표를 세번 적는 것입니다:

```dart
var s1 = '''
이런 방식으로
여러 줄 문자열을 만들 수 있습니다.
''';

var s2 = """이렇게도
만들 수 있습니다.""";
```

`r` 접두사를 쓰면 "raw"한 문자열을 만들 수 있습니다.

```dart
var s= r'raw한 문자열에선 \n도 특별한 취급을 받지 않습니다.';
```

문자열의 유니코드 캐릭터가 표현되는 자세한 방법을 알려면 [룬과 문자소 클러스터](https://dart.dev/language/built-in-types#runes-and-grapheme-clusters)를 참고하세요.

리터럴 문자열은 보간된 표현식이 null이나, 숫자, 문자열, 불리언 값으로 평가되는 컴파일 타임 상수인 한 컴파일 시간 상수입니다.

```dart
// 아래는 const 문자열로 동작합니다.
const aConstNum = 0;
const aConstBool = true;
const aConstString = 'a constant string';

// 아래는 const 문자열로 동작하지 않습니다.
var aNum = 0;
var aBool = true;
var aString = 'a string';
const aConstList = [1, 2, 3];

const validConstString = '$aConstNum $aConstBool $aConstString';
// const invalidConstString = '$aNum $aBool $aString $aConstList';
```

문자열을 사용하는 더 많은 정보는 [문자열과 정규 표현식](https://dart.dev/guides/libraries/library-tour#strings-and-regular-expressions) 문서를 확인하세요.

## Booleans

Dart는 불리언 값을 나타내는 `bool` 타입을 가집니다. bool 타입을 가지는 객체는 불리언 리터럴 `true`와 `false` 두 개 뿐입니다. 두 객체 모두 컴파일 타임 상수입니다.

Dart의 타입 안전성은 `if (nonbooleanValue)`나 `assert (nonbooleanValue)`와 같은 코드를 사용할 수 없다는 의미입니다. 이러한 코드 대신, 다음과 같이 명시적으로 값을 체크해야 합니다:

```dart
// 빈 문자열인지 검사
var fullName = '';
assert(fullName.isEmpty);

// 0인지 검사
var hitPoints = 0;
assert(hitPoints <= 0);

// null 인지 검사
var unicorn = null;
assert(unicorn == null);

// NaN인지 검사
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);
```

## Runes and grapheme clusters

Dart에서 [룬](https://api.dart.dev/stable/2.19.4/dart-core/Runes-class.html)은 문자열의 유니코드 코드 포인트를 드러냅니다. [characters 패키지](https://pub.dev/packages/characters)를 사용하여 [유니코드(확장) 그래프 클러스터](https://unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries)라고도 하는 사용자 인식 문자를 보거나 조작할 수 있습니다.

유니코드는 세계의 문자 체계에서 사용되는 각 글자, 숫자, 심볼에 할당되는 고유한 숫자 값을 정의합니다. Dart 문자열은 UTF-15 코드 단위의 일련이기 때문에, 문자열 내에서 유니코드 코드 포인트를 표현하려면 특수 문법이 필요합니다. 유니코드 코드 포인트를 표현하는 일반적인 방법은 `\uXXXX` 이며, 이 때 XXXX는 4자리 16진수 값입니다. 예를 들어 하트 문자(♥)는 `\u2665`입니다. 4자리 16진수보다 많거나 적다는 걸 표시하기 위해 값을 중괄호 안에 적을 수 있습니다. 예를 들어 웃는 이모지(😆)는 `\u{1f606}`으로 적을 수 있습니다.

만일 개별 유니코드 글자를 읽거나 써야 한다면 characters 패키지에서 String에 정의한 `characters` 게터를 사용하면 됩니다. 리턴되는 [`Characters`](https://pub.dev/documentation/characters/latest/characters/Characters-class.html) 객체는 문자소 클러스터의 일련인 문자열입니다. 다음은 characters API를 사용하는 예시입니다:

```dart
import 'package:characters/characters.dart';

void main() {
  var hi = 'Hi 🇩🇰';
  print(hi);
  print('The end of the string: ${hi.substring(hi.length - 1)}');
  print('The last character: ${hi.characters.last}');
}
```

출력은 환경에 따라 다르지만 다음과 유사할 것입니다:

```shell
Hi 🇩🇰
The end of the string: ???
The last character: 🇩🇰
```

문자열을 조작하기 위해 characters 패키지를 사용하는 자세한 방법은 characters 패키지의 [예시 페이지](https://pub.dev/packages/characters/example)와 [API 레퍼런스](https://pub.dev/documentation/characters/latest/)를 참고하세요.

## Symbols

[`Symbol`](https://api.dart.dev/stable/2.19.4/dart-core/Symbol-class.html) 객체는 Dart 프로그램에서 정의된 연산자와 식별자를 나타냅니다. symbol을 거의 사용하지 않겠지만, 축약(minification)은 식별자 이름은 변경해도 식별자 symbol은 변경하지 않기 때문에 식별자를 이름으로 참조하는 API에는 매우 유용합니다.

식별자의 symbol을 얻으려면 `#` 뒤에 식별자를 사용하는 symbol 리터럴을 사용하면 됩니다.

```dart
#radix
#bar
```

Symbol 리터럴은 컴파일 타임 상수입니다.
