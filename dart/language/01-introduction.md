# Introduction to the Dart language

이 페이지들은 여러분이 다른 언어로 프로그래밍하는 방법을 안다는 가정 하에, 변수, 연산자, 클래스, 라이브러리 등의 주요한 Dart 기능들을 사용하는 방법을 설명합니다. Dart에 대해서 덜 자세한 설명을 원하신다면, [언어 예시 페이지](https://dart.dev/samples)를 참고하세요.

Dart의 코어 라이브러리에 대해 더 알고 싶다면 [라이브러리 투어](https://dart.dev/guides/libraries/library-tour) 페이지를 참고하세요. 언어 기능에 대해 더 자세히 알고 싶다면, 언제든 [Dart 언어 명세](https://dart.dev/guides/language/spec)를 참고하세요.

## A basic Dart program

다음 코드는 Dart의 가장 기본적인 기능을 많이 사용하고 있습니다:

```dart
// 함수 정의
void printInteger(int aNumber) {
  print('The number is $aNumber.'); // 콘솔 출력
}

// 앱이 실행되는 장소
void main() {
  var number = 42; // 변수 선언 및 할당
  printInteger(number); // 함수 호출
}
```

(거의) 모든 Dart 앱에 적용되는 이 프로그램의 사용법은 다음과 같습니다:

`// 이것은 주석입니다.`
한 줄 주석입니다. Dart는 여러 줄 주석(Multi-line comments)과 문서 주석(Documentation comment)를 지원합니다. 자세한 정보는 [주석](https://dart.dev/language/comments) 페이지를 참고하세요.

`void`
절대 사용되지 않을 값을 가리키는 특별한 자료형입니다. `printInteger()`, `main()` 같이 명시적으로 값을 반환하지 않는 함수는 반환 자료형이 `void` 입니다.

`int`
정수를 가리키는 또 다른 자료형입니다. 그 외에도 `String`, `List`, `bool`과 같은 다른 [빌트인 타입](https://dart.dev/language/built-in-types)들이 있습니다.

`42`
숫자 리터럴입니다. 숫자 리터럴은 일종의 컴파일 타임 상수입니다.

`print()`
아웃풋을 출력하는 편리한 방법입니다.

`'...'` (또는 `"..."`)
문자열 리터럴입니다.

`$variableName` (또는 `${expression}`)
문자열 보간입니다: 문자열 리터럴 안에 변수 혹은 표현식의 문자열과 동등한 값을 포함합니다. 더 자세한 정보는 [문자열](https://dart.dev/language/built-in-types#strings) 페이지를 참고하세요.

`main()`
앱 실행이 시작되는, 특수하고 필수적인 최상위 함수입니다. 자세한 내용은 [main() 함수](https://dart.dev/language/functions#the-main-function)를 참조하세요.

`var`
자료형을 특정하지 않고 변수를 선언할 수 있는 방법입니다. 변수의 자료형(`int`)은 초깃값(`42`)에 의해 결정됩니다.

## Important concepts

Dart 언어를 배우면서 다음의 사실과 개념들을 염두에 두셔야 합니다:

- 변수에 넣을 수 있는 모든 것은 *객체*이며, 모든 객체는 클래스의 *인스턴스*입니다. 숫자, 함수, `null`도 모두 객체입니다. `null`을 제외한 모든 객체([sound null safety](https://dart.dev/null-safety)를 활성화한 경우)는 [Object](https://api.dart.dev/stable/dart-core/Object-class.html) 클래스에서 상속됩니다.

  > [Null safety](https://dart.dev/null-safety)는 Dart 2.12 버전부터 도입됐습니다. Null safety를 사용하려면 [언어 버전](https://dart.dev/guides/language/evolution#language-versioning)이 최소 2.12 이상이어야 합니다.

- Dart는 강타입 언어이지만, 타입을 추론할 수 있기 때문에 타입 어노테이션은 필수가 아닙니다. 위의 코드 예제에서도, `number` 변수는 `int` 타입으로 추론됩니다.
- 만일 `null safety`를 활성화했다면, 변수는 사용자가 명시적으로 `null` 값을 가질 수 있다고 선언하지 않는 한 `null` 값을 가질 수 없습니다. 변수 타입 선언 마지막에 물음표(`?`)를 붙이면 변수가 `null`값을 가질 수 있다고 선언하는 것입니다. 예를 들어, `int?` 타입을 가지는 변수는 정수 혹은 `null`이 될 수 있습니다. 어떤 표현식이 `null`이 될 수 없다는 걸 확실하게 알고 있지만 Dart가 동의하지 않는다면, `!`를 추가해 `null`이 아니라고 주장할 수 있습니다. 예시: `int x = nullableButNotNullInt!`
- 어떤 타입을 허용하는 것을 명시적으로 적고 싶다면, (null safety를 활성화한 경우) `Object?`, `Object`, 혹은 런타임까지 유형 검사를 연기해야 하는 경우 [특수 유형인 `dynamic`](https://dart.dev/guides/language/effective-dart/design#avoid-using-dynamic-unless-you-want-to-disable-static-checking)을 사용하면 됩니다.
- Dart는 `List<int>`(정수로 이루어진 배열), `List<Object>`(모든 타입의 객체로 이루어진 배열) 제네릭 타입을 지원합니다.
- Dart는 `main()` 같은 최상위 함수를 지원하며, 클래스와 객체에 연결된 함수(각각 *정적 메서드*와 *인스턴스 메서드*라고 함) 역시 지원합니다. 또, 함수 안에 함수를 만들 수도 있습니다(_중첩 함수_ 혹은 *지역 함수*라고 함).
- 이와 유사하게, Dart는 최상위 레벨 변수를 지원하며, 클래스 혹은 객체와 연결된 변수(정적 변수, 인스턴스 변수) 역시 지원합니다. 인스턴스 변수는 때때로 _필드(fields)_ 나 _속성(properties)_ 으로 불립니다.
- 자바와는 다르게, Dart는 `public`, `protected`, `private` 키워드를 가지고 있지 않습니다. 식별자가 언더스코어(`_`)로 시작한다면, 해당 라이브러리에 대해 비공개(private)입니다. 자세한 내용은 [라이브러리 및 임포트](https://dart.dev/language/libraries) 문서를 참고하세요.
- 식별자는 문자 혹은 언더스코어(`_`)로 시작할 수 있으며, 숫자를 포함해 문자들을 조합하여 사용할 수 있습니다.
- Dart에는 _표현식expressions_(런타임 값을 가짐)과 _문statements_(런타임 값을 가지지 않음) 두 가지가 있습니다. 예를 들어, [조건 표현식](https://dart.dev/language/operators#conditional-expressions) `condition ? expr1 : expr2`는 `expr1` 혹은 `expr2`의 값을 가집니다. 반면 [if-else 문](https://dart.dev/language/control-flow#if-and-else)은 값을 가지지 않습니다. 문은 종종 하나 이상의 표현식을 포함하지만, 표현식은 문을 직접 포함할 수 없습니다.
- Dart 도구가 문제를 알려주는 방법은 두 가지가 있습니다: *경고 warnings*와 _에러 errors_. 경고는 코드가 작동하지 않을 수 있음을 나타내는 표시일 뿐, 프로그램 실행을 막지는 않습니다. 에러는 컴파일 타임 또는 런타임에 발생할 수 있습니다. 컴파일 타임 오류는 코드가 전혀 실행되지 못하게 하고, 런타임 오류는 코드가 실행되는 동안 [예외](https://dart.dev/language/error-handling#exceptions)가 발생하게 합니다.
