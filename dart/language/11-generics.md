# Generics

기본 배열 타입인 [`List`](https://api.dart.dev/stable/2.19.4/dart-core/List-class.html)의 API 문서를 살펴보시면, `List<E>`라는 타입의 설명을 보게 됩니다. <...>는 배열을 _제네릭_(혹은 _파라미터화된_) 타입으로 표시하는 것입니다. [컨벤션에 따라](https://dart.dev/guides/language/effective-dart/design#do-follow-existing-mnemonic-conventions-when-naming-type-parameters), 대부분의 타입 변수들은 E, T, S, K, V같이 한 글자 이름을 가집니다.

## Why use generics?

제네릭은 보통 타입 안정성을 위해 필요하지만, 단지 코드를 돌아가게 만드는 것 외의 다른 이점이 많습니다.

- 제네릭 유형을 올바르게 지정하면 더 좋은 코드를 짤 수 있습니다.
- 코드 중복을 줄이는데 제네릭을 쓸 수 있습니다.

배열에 오직 문자열만을 담는 것을 의도할 때, `List<String>`("list of string"이라고 읽습니다)으로 선언할 수 있습니다. 이 방식은 배열에 코드를 쓰는 사람, 협업하는 사람, 코드 도구가 문자열이 아닌 것을 할당하는 것을 아마도 실수일 것이라고 추측할 수 있게끔 도와줍니다. 아래는 예제입니다:

```dart
var names = <String>[];
names.addAll(['Seth', 'Kathy', 'Lars']);
names.add(42); // 에러
```

제네릭을 쓰는 다른 이유는 코드 중복을 줄이기 위해서입니다. 제네릭을 사용하면 정적 분석의 이득을 취하면서도 하나의 인터페이스와 많은 타입 간 구현을 공유할 수 있습니다. 예를 들어, 객체를 캐싱하는 인터페이스를 만든다고 칩시다:

```dart
abstract class ObjectCache {
  Object getByKey(String key);
  void setByKey(String key, Object value);
}
```

이 인터페이스의 문자열 전용 버전이 필요해진다면 다른 인터페이스를 만들어야 합니다:

```dart
abstract class StringCache {
  Object getByKey(String key);
  void setByKey(String key, String value);
}
```

그 후에, 숫자 전용 버전도 필요하다는 것을 알게되고... 한 가지를 떠올리게 됩니다.

제네릭 타입은 이러한 인터페이스들을 만들어야 하는 문제들을 해결해줄 수 있습니다. 타입 파라미터를 받는 하나의 인터페이스만 만들면 됩니다.

```dart
abstract class Cache {
  T getByKey(String key);
  void setByKey(String key, T value);
}
```

이 코드에서, T는 스탠드인 유형입니다. 개발자가 나중에 정의할 타입으로 생각할 수 있는 플레이스홀더입니다.

## Using collection literals

배열, 집합, 맵 리터럴은 파라미터화될 수 있습니다. 파라미터화된 리터럴은 지금까지 보셨던 리터럴과 같지만, 다른 점이 있다면 (배열과 집합의 경우)`<type>`이나 (맵의 경우)`<keyType, valueType>`을 여는 괄호 이전에 추가할 수 있다는 것입니다. 다음은 타입이 지정된 리터럴을 활용하는 예시입니다:

```dart
var names = <String>['Seth', 'Kathy', 'Lars'];
var uniqueNames = <String>{'Seth', 'Kathy', 'Lars'};
var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
};
```

## Using parameterized types with constructors

생성자를 사용할 때 한 개 혹은 여러 개의 타입을 지정하려면 클래스 이름 뒤의 꺾쇠(`<...>`)안에 타입을 넣으면 됩니다. 다음은 예시입니다:

```dart
var nameSet = Set<String>.from(names);
```

다음의 코드는 정수 키와 View라는 타입의 값을 가지는 맵을 생성합니다:

```dart
var views = Map<int, View>();
```

## Generic collections and the types they contain

Dart 제네릭 타입은 구체적입니다. 즉 런타임 때 제네릭 타입은 타입 정보를 갖고 있다는 뜻입니다. 예를 들어, 컬렉션의 타입을 다음과 같이 테스트할 수 있습니다:

```dart
var names = <String>[];
names.addAll(['Seth', 'Kathy', 'Lars']);
print(name is List<String>); // true
```

> 반면, 자바의 제네릭은 삭제(erasure)를 사용합니다. 즉, 런타임 때 제네릭 타입 파라미터는 제거됩니다. 자바에서는 객체가 배열인지는 테스트할 수 있지만, `List<String>`인지는 테스트할 수 없습니다.

## Restricting the parameterized type

제네릭 타입을 구현할 때, 인자로 제공될 수 있는 타입을 제한해야하고, 따라서 인자는 반드시 특정한 타입의 서브타입이어야만 할 수 있습니다. 이럴 때에는 `extends`를 사용하면 됩니다.

흔한 유즈케이스는는 유형을 기본값인 [`Object?`](https://dart.dev/null-safety/understanding-null-safety#top-and-bottom) 대신 `Object`의 하위 타입으로 만들어 널이 될 수 없도록 하는 것입니다.

```dart
class Foo<T extends Object> {
  // Foo에 제공되는 T는 어느 타입이건 null이 될 수 없음
}
```

`Object` 외의 다른 타입과도 `extends`를 쓸 수 있습니다. 다음은 `SomeBaseClass`를 extend해 `SomeBaseClass`의 멤버가 타입 `T`의 객체로 호출될 수 있도록 하는 예제입니다.

```dart
class Foo<T extends SomeBaseClass> {
  // 구현...
  String toString() => "Instance of 'Foo<$T>'";
}

class Extender extends SomeBaseClass {...}
```

`SomeBaseClass`나 서브타입 중 어느 것이든 제네릭 인자로 사용할 수 있습니다.

```dart
var someBaseClassFoo = Foo<SomeBaseClass>();
var extenderFoo = Foo<Extender>();
```

제네릭 인자를 특정하지 않아도 상관없습니다.

```dart
var foo = Foo();
print(foo); // Instance of 'Foo<SomeBaseClass>'
```

`SomeBaseClass` 타입이 아닌 것을 특정하면 에러가 발생합니다.

```dart
var foo = Foo<Object>(); // 에러!
```

## Using generic methods

메서드와 함수도 타입 인자를 받을 수 있습니다.

```dart

T first<T>(List<T> ts) {
  // 초기화 작업이나 에러체크 하기. 그리고 나서...
  T tmp = ts[0];
  // 추가 작업하기...
  return tmp;
}
```

여기서 `first(<T>)`의 제네릭 타입 파라미터는 타입 인자 `T`를 여러곳에서 사용할 수 있게 해줍니다:

- 함수의 리턴 타입(`T`)
- 인자의 타입(`List<T>`)
- 지역 변수의 타입(`T tmp`)
