# Collections

## Lists

거의 모든 프로그래밍 언어에서 가장 보편적인 컬렉션은 *배열array*이거나 객체의 순서가 있는 그룹일 것입니다. Dart에서 배열은 `List` 객체이며, 그래서 대부분의 사람들은 (array가 아니라) *list*라고 부릅니다.

Dart의 배열 리터럴은 대괄호로 감싸져 있고, 콤마로 구분된 표현식 혹은 값의 목록으로 표현할 수 있습니다. 다음은 간단한 Dart 배열 예시입니다:

```dart
var list = [1, 2, 3];
```

> Dart는 위의 예시에서 변수 `list`의 타입을 `List<int>`로 추론합니다. 만일 배열에 int가 아닌 요소를 추가한다면 분석기 혹은 런타임에서 에러가 발생합니다. 더 자세한 정보는 [타입 추론](https://dart.dev/language/type-system#type-inference) 문서를 참고하세요.

Dart 컬렉션 리터럴의 마지막 요소 이후에 콤마를 적어도 상관없습니다. 트레일링 콤마(trailing comma)는 컬렉션에 아무런 영향을 주지 않습니다. 오히려 복사-붙여넣기 에러를 방지하는데 도움이 될 수 있습니다.

```dart
var list = [
  'Car',
  'Boat',
  'Plane',
];
```

배열은 0 기반 인덱싱을 사용합니다. 따라서 0이 첫번째 값의 인덱스이고, `list.length - 1`이 마지막 값의 인덱스입니다. `.length` 프로퍼티를 사용해 배열의 길이를 알 수 있고, 첨자 연산자(`[]`)를 사용해 배열의 값에 접근할 수 있습니다.

```dart
var list = [1, 2, 3];
assert(list.length == 3);
assert(list[1] == 2);

list[1] = 1;
assert(list[1] == 1);
```

컴파일 상수인 배열을 만드려면 배열 리터럴 이전에 `const`를 추가하면 됩니다.

```dart
var constantList = const [1, 2, 3];
// constantList[1] = 1; // 이 라인을 실행하면 에러가 발생함
```

## Spread operators

Dart는 배열에 여러 값을 삽입하는데 편리한 **펼치기 연산자**(`...`)와 **null 인식 펼치기 연산자**(`...?`)를 지원합니다.

예를 들어, 펼치기 연산자(`...`)를 통해 한 배열의 모든 값을 다른 배열에 삽입할 수 있습니다.

```dart
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);
```

펼치기 연산자의 오른쪽 표현식이 null일 수 있다면, null 인식 펼치기 연산자(`...?`)를 사용해 예외를 피할 수 있습니다.

```dart
var list2 = [0, ...?list];
assert(list2.length == 1);
```

펼치기 연산자의 더 자세한 정보와 예시를 확인하려면 [펼치기 연산자 제안](https://github.com/dart-lang/language/blob/master/accepted/2.3/spread-collections/feature-specification.md) 페이지를 참고하세요.

## Collection operators

Dart는 **collection if**와 **collection for**도 제공합니다. 각각 조건문을 사용한 컬렉션(`if`)과 컬렉션 반복(`for`)에 쓰입니다.

다음은 collection if를 사용해 3개 혹은 4개의 요소가 있는 배열을 만드는 예제입니다.

```dart
var nav = ['Home', 'Furniture', 'Plants', if (promoActive) 'Outlet'];
```

다음은 collection for를 사용해 한 배열의 요소들을 다른 배열에 추가하기 전에 수정하는 예제입니다:

```dart
var listOfInts = [1, 2, 3];
var listOfStrings = ['#0', for (var i in listOfInts) '#$i'];
assert(listOfStrings[1] == '#1');
```

컬렉션 `if`와 `for`에대한 더 자세한 정보와 예시를 확인하려면 [컬렉션 흐름 제어 제안](https://github.com/dart-lang/language/blob/master/accepted/2.3/control-flow-collections/feature-specification.md) 페이지를 참고하세요.

List 타입은 배열을 조작하는 데 편리한 많은 메서드를 갖고 있습니다. 배열에 대한 더 많은 정보는 [제네릭](https://dart.dev/language/generics) 페이지와 [컬렉션](https://dart.dev/guides/libraries/library-tour#collections) 페이지를 참고하세요

## Sets

Dart의 집합은 고유한 요소의 순서 없는 컬렉션입니다. Dart는 집합을 [`Set`](https://api.dart.dev/stable/dart-core/Set-class.html) 타입과 집합 리터럴로 지원합니다.

다음은 집합 리터럴을 사용해 간단한 집합을 만드는 예시입니다:

```dart
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
```

> Dart는 위의 변수 `halogens`의 타입을 `Set<String>`으로 추론합니다. 만일 집합에 잘못된 타입을 가진 값을 추가하면 분석기나 런타임에서 에러가 발생합니다. 더 자세한 정보는 [타입 추론](https://dart.dev/language/type-system#type-inference) 페이지를 참고하세요.

빈 집합을 만들려면 형식 인자 뒤에 `{}`를 적거나, `{}`를 `Set` 타입의 변수에 할당하면 됩니다.

```dart
var names = <String>{};
// Set<String> names = {}; // 이 코드도 동작합니다.
// var names = {}; // 이 코드는 집합이 아니라 맵을 생성합니다.
```

> **집합과 맵?** 맵 리터럴 문법은 집합 리터럴 문법과 비슷합니다. 맵 리터럴이 먼저 구현되었기 때문에, `{}`의 기본값은 `Map` 타입입니다. `{}`이나 `{}`를 할당할 변수에 타입 어노테이션을 하지 않으면, Dart는 `Map<dynamic, dynamic>` 타입의 객체를 생성합니다.

이미 존재하는 집합에 `add()`나 `addAll()` 메서드를 사용해 요소를 추가할 수 있습니다.

```dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
```

`.length`를 사용해 집합에 있는 요소의 수를 확인할 수 있습니다.

```dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
assert(elements.length == 5);
```

집합을 컴파일 타임 상수로 생성하려면 집합 리터럴 앞에 `const`를 추가하면 됩니다.

```dart
final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
};

// constantSet.add('helium'); // 이 라인을 실행하면 에러가 발생함
```

집합은 배열과 마찬가지로 펼치기 연산자(`...`, `...?`)와 컬렉션 `if`, `for`를 지원합니다. 더 많은 정보는 [배열 펼치기 연산자](https://dart.dev/language/collections#spread-operators) 토의와 [배열 컬렉션 연산자](https://dart.dev/language/collections#collection-operators) 토의를 참고하세요.

집합에 대한 더 자세한 정보는 [제네릭](https://dart.dev/language/generics) 페이지와 [집합](https://dart.dev/guides/libraries/library-tour#sets) 페이지를 참고하세요.

## Maps

일반적으로, 맵은 키와 값을 연결하는 객체입니다. 키와 값 모두 객체의 어떤 타입이든 될 수 있습니다. 각각의 *키*는 하나만 있지만, 같은 *값*을 여러 번 사용할 수 있습니다. Dart에서 맵은 맵 리터럴과 `Map` 타입으로 만들 수 있습니다.

다음은 맵 리터럴을 사용해 간단한 맵을 여러 개를 만드는 예시입니다.

```dart
var gifts = {
  // 키:       값
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```

> Dart는 위의 변수 `gifts`를 `Map<String, String>` 타입으로 추론하고, `nobleGases`를 `Map<int, String>`으로 추론합니다. 만일 두 맵에 잘못된 값을 추가하면 분석기 혹은 런타임에서 에러가 발생합니다. 더 자세한 정보는 [타입 추론](https://dart.dev/language/type-system#type-inference) 문서를 참고하세요.

Map 생성자를 사용해서도 같은 객체를 만들 수 있습니다.

```dart
var gifts = Map<String, String>();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var nobleGases = Map<int, String>();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
```

> C#이나 자바같은 언어를 사용하셨었다면, `Map()` 대신 `new Map()` 같은 문법을 예상하셨을 것입니다. Dart에서 `new` 키워드는 선택 사항입니다. 더 자세한 내용은 [생성자 사용하기](https://dart.dev/language/classes#using-constructors) 페이지를 참고하세요.

이미 존재하는 맵에 첨자 할당 연산자(`[]=`)를 사용해 새 키-값 쌍을 추가할 수 있습니다.

```dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds'; // 키-값 쌍 추가
```

첨자 연산자(`[]`)를 사용해 맵에서 값을 가져올 수 있습니다.

```dart
var gifts = {'first': 'partridge'};
assert(gifts['first'] == 'partridge');
```

맵에 없는 키를 조회하면 `null`이 리턴됩니다.

```dart
var gifts = {'first': 'partridge'};
assert(gifts['fifth'] == null);
```

`.length`를 사용해 맵의 키-값 쌍의 수를 알 수 있습니다.

```dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';
assert(gifts.length == 2);
```

맵을 컴파일 상수로 만들려면 맵 리터럴 앞에 `const`를 추가합니다.

```dart
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};

// constantMap[2] = 'Helium'; // 이 라인을 실행하면 에러가 발생함
```

맵은 배열과 마찬가지로 펼치기 연산자(`...`, `...?`)와 컬렉션 `if`, `for`를 지원합니다. 더 많은 정보는 [배열 펼치기 연산자](https://dart.dev/language/collections#spread-operators) 토의와 [배열 컬렉션 연산자](https://dart.dev/language/collections#collection-operators) 토의를 참고하세요.
