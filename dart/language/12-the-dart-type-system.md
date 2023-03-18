# The Dart type system

Dart 언어는 정적 타입 검사 및 [런타임 검사](https://dart.dev/language/type-system#runtime-checks)의 조합을 사용하여 변수 값이 항상 변수의 정적 타입과 일치하는지 확인하며, 이를 사운드 타이핑이라고도 합니다. *타입*은 필수이지만 [타입 추론](https://dart.dev/language/type-system#type-inference) 때문에 타입 *어노테이션*은 선택 사항입니다.

정적 타입 검사의 한 가지 장점은 Dart의 [정적 분석기](https://dart.dev/guides/language/analysis-options)를 사용해 컴파일 타임에서 버그를 발견할 수 있다는 것입니다.

제네릭 클래스에 타입 어노테이션을 추가하는 방법으로 대부분의 정적 분석기 에러를 수정할 수 있습니다. 가장 흔한 제네릭 클래스는 컬렉션 타입 `List<T>`와 `Map<K,V>`입니다.

다음은 `printInts()` 함수는 정수 배열을 출력하고, `main()` 함수는 배열을 만들어 `printInts()`에 넘기는 예제입니다:

```dart
void printInts(List<int> a) => print(a);

void main() {
  final list = [];
  list.add(1);
  list.add('2');
  printInts(list); // 에러 발생!
}
```

위의 코드를 실행하면 `printInts(list)`를 호출할 때 `list` 변수에서 타입 에러가 발생합니다.

```shell
error - The argument type 'List<dynamic>' can't be assigned to the parameter type 'List<int>'. - argument_type_not_assignable
```

이 에러는 `List<dynamic>`에서 `List<int>`로 불건전한(unsound) 암묵적 형변환을 지적합니다. `list` 변수는 정적 타입 `List<dynamic>`을 가집니다. 이는 초기화 선언 `var list = []`가 분석기에 `dynamic`보다 더 구체적인 타입 인자를 추론할 수 있는 충분한 정보를 제공하지 않기 때문입니다. `printInts()` 함수는 파라미터로 `List<int>`를 기대하기 때문에 타입의 불일치가 발생합니다.

배열을 생성할 때 타입 어노테이션(`<int>`)을 추가하면, 분석기가 문자열 인자는 `int` 파라미터에 할당 될 수 없다고 말해줄 것입니다. `list.add('2')`에서 따옴표를 제거하면 정적 분석기를 통과하고, 에러나 경고 없이 코드가 잘 돌아갈 것입니다.

```dart
void printInts(List<int> a) => print(a);

void main() {
  final list = <int>[];
  list.add(1);
  list.add(2);
  printInts(list);
}
```

## What is soundness?

*건전성*은 프로그램이 유효하지 않은 특정 상태에 빠지지 않게 하는 것입니다. 건전한 *타입 시스템*이란 표현식이 표현식의 정적 타입과 맞지 않은 값으로 평가되는 상태가 되지 않게 하는 것입니다. 예를 들어 표현식의 정적 유형이 `String`인 경우, 런타임에 표현식을 평가할 때 문자열만 가져오도록 보장됩니다.

Dart의 타입 시스템은 자바나 C#의 타입 시스템과 마찬가지로 건전합니다. 정적 검사(컴파일 타임 에러)와 런타임 검사의 조합을 사용해 건전성을 강제합니다. 예를 들어, `int`에 `String`을 할당하면 컴파일 타임 에러가 발생합니다. `String`이 아닌 객체를 `as String`을 이용해 `String`으로 형 변환하면 런타임 에러가 발생하면서 실패합니다.

## The benefits of soundness

건전한 타입 시스템은 여러 이점이 있습니다:

- 컴파일 타임 때 타입 관련 버그를 잡을 수 있습니다.
  - 건전한 타입 시스템은 코드 속 타입이 모호하지 않게 강제하고, 따라서 런타임 때 잡기 까다로운 타입 관련 버그를 컴파일 타임 때 잡을 수 있습니다.
- 가독성 있는 코드를 작성할 수 있습니다.
  - 지정된 타입만을 가지는 값에 의존할 수 있으므로 코드를 더 쉽게 읽을 수 있습니다. Dart는 건전하고, 타입은 거짓말을 하지 않습니다.
- 유지보수하기 쉬운 코드를 작성할 수 있습니다.
  - 건전한 타입 시스템에서는, 코드의 일부분을 수정할 때 타입 시스템이 다른 코드가 깨지는 걸 경고해줄 수 있습니다.
- AOT(ahead of time) 컴파일 시간이 빨라집니다.
  - AOT 컴파일은 타입 없이도 가능하지만, 생성된 코드는 훨씬 비효율적입니다.

## Tips for passing static analysis

정적 타입의 규칙들 대부분을 이해하기 쉽습니다. 다음은 명확하지 않아 보이는 규칙들 일부입니다:

- 메서드를 오버라이딩할 때 건전한 리턴 타입을 사용해야 합니다.
- 메서드를 오버라이딩할 때 건전한 파라미터 타입을 사용해야 합니다.
- dynamic으로 구성된 리스트를 타입이 지정된 배열처럼 사용해서는 안 됩니다.

다음의 타입 위계를 따르는 예시로 이 규칙들을 더 자세히 살펴보겠습니다.

![a hierarchy of animals where the supertype is Animal and the subtypes are Alligator, Cat, and HoneyBadger. Cat has the subtypes of Lion and MaineCoon](https://dart.dev/language/images/type-hierarchy.png)

### Use sound return types when overriding methods

하위 클래스에서 메서드의 리턴 타입은 상위 클레스의 메서드의 리턴 타입의 서브타입이거나 동일한 타입이어야 합니다. `Animal` 클래스의 게터 메서드를 봅시다:

```dart
class Animal {
  void chase(Animal a) { ... }
  Animal get parent => ...
}
```

`parent` 게터 메서드는 `Animal`을 리턴합니다. `HoneyBadger` 서브클래스에서, 게터의 리턴 타입을 `HoneyBadger`(혹은 `Animal`의 서브 타입 중 하나)로 대체할 수 있습니다. 하지만 관계 없는 타입은 허용되지 않습니다.

```dart
// 문제 없음
class HoneyBadger extends Animal {
  @override
  void chase(Animal a) { ... }

  @override
  HoneyBadger get parent => ...
}
```

```dart
// 에러 발생
class HoneyBadger extends Animal {
  @override
  void chase(Animal a) { ... }

  @override
  Root get parent => ... // Root는 Animal의 서브 타입이 아님
}
```

### Use sound parameter types when overriding methods

오버라이드된 메서드의 파라미터는 상위 클래스의 상응하는 파라미터의 수퍼타입이거나 동일한 타입이어야 합니다. 파라미터 타입을 원래의 파라미터의 서브 타입으로 타입을 대체하는 방식으로 범위를 좁혀서는("tighten") 안 됩니다.

> 서브타입을 써야 하는 유효한 이유가 있다면, [`covariant` 키워드](https://dart.dev/guides/language/sound-problems#the-covariant-keyword)를 사용할 수 있습니다.

`Animal` 클래스의 `chase(Animal)` 메서드를 봅시다:

```dart
class Animal {
  void chase(Animal a) { ... }
  Animal get parent => ...
}
```

`chase()` 메서드는 `Animal`을 받습니다. `HoneyBadger`는 어느 것이든 chase할 수 있습니다. `chase()` 메서드를 어느 것을 받든 상관없는(`Object`) 방식으로 오버라이드할 수 있습니다.

```dart
class HoneyBadger extends Animal {
  @override
  void chase(Object a) { ... }

  @override
  Animal get parent => ...
}
```

다음의 코드는 `chase()` 메서드의 파라미터의 범위를 `Animal`에서 `Animal`의 하위 클래스인 `Mouse`로 좁힙니다.

```dart
// 에러 발생
class Mouse extends Animal { ... }

class Cat extends Animal {
  @override
  void chase(Mouse x) { ... } // 에러!
}
```

이 코드는 type safe하지 않습니다. cat을 정의하고 alligator 이후에 전달해줄 수 있기 때문입니다.

```dart
Animal a = Cat();
a.chase(Alligator()); // Not type safe or feline safe.
```

### Don’t use a dynamic list as a typed list

`dynamic` 배열은 다른 종류의 요소로 이루어진 배열을 가지고 싶을 때 유용합니다. 하지만, `dynamic` 배열을 타입이 지정된 배열처럼 사용해서는 안 됩니다.

이 규칙은 제네릭 타입의 인스턴스에도 적용됩니다.

다음의 코드는 `Dog`가 있는 `dynamic` 배열을 만들고, `Cat` 타입의 배열에 할당합니다. 이렇게 하면 정적 분석 동안 에러가 납니다.

```dart
class Cat extends Animal { ... }

class Dog extends Animal { ... }

void main {
  List<Cat> foo = <dynamic>[Dog()]; // 에러
  List<dynamic> bar = <dynamic>[Dog(), Cat()]; // 이상 없음
}
```

## Runtime checks

런타임 검사는 컴파일 타임 때 추적되지 않는 타입 안전성 이슈를 다룹니다.

예를 들어, 다음의 코드는 dog 배열을 cat 배열로 형 변환을 시도하기 때문에 런타임 때 예외를 던집니다.

```dart
void main() {
  List<Animal> animals = [Dog()];
  List<Cat> cats = animals as List<Cat>; // 에러
}
```

## Type inference

분석기는 필드, 메서드, 지역 변수, 대부분의 제네릭 타입 인자의 타입을 추론할 수 있습니다. 분석기가 특정 타입으로 추론하기에 충분한 정보를 가지지 못할 경우, `dynamic` 타입으로 추론합니다.

다음은 제네릭에 타입 추론이 작동하는 예시입니다. 이 예시에서는, `arguments` 변수에 문자열 타입의 키와 다양한 타입의 값 쌍을 가진 맵이 할당돼있습니다.

```dart
Map<String, dynamic> arguments = {'argA': 'hello', 'argB': 42};
```

위의 코드 대신 `var`나 `final`을 사용해 Dart가 타입을 추론하게 할 수 있습니다.

```dart
var arguments = {'argA': 'hello', 'argB': 42}; // Map<String, Object>
```

맵 리터럴은 스스로의 타입을 키-값 쌍을 기반으로 추론하고, 변수는 맵 리터럴 타입을 기반으로 타입을 추론합니다. 위의 맵에서 키는 둘 다 문자열이지만 값은 다른 타입(`String`, `int`. 둘의 공통 상한은 `Object`)을 갖고 있습니다. 따라서 맵 리터럴은 `Map<String, Object>` 타입을 가지고, `arguments` 변수도 같은 타입을 가지게 됩니다.

### Field and method inference

타입이 지정되지 않았거나, 상위 클래스로부터 오버라이드 된 필드나 메서드는 상위 클래스의 메서드나 필드의 타입을 상속받습니다.

선언되거나 상속된 타입이 없지만 초깃값으로 선언된 필드는 초깃값을 기반으로 추론된 타입을 가집니다.

### Static field inference

정적 필드와 변수는 초기화 선언에서 추론된 타입을 가집니다. 순환(즉, 변수 타입 추론이 변수의 유형을 알아야 하는 경우)이 발생하면 추론이 실패한다는 점을 유의하세요.

### Local variable inference

지역 변수 타입은 초기화 선언에서 추론됩니다. 후속 할당은 고려되지 않습니다. 이는 너무 구체적으로 유형이 추론될 수 있음을 의미할 수 있습니다. 만일 그렇다면, 타입 어노테이션을 추가할 수 있습니다.

```dart
// 에러 발생
var x = 3; // x는 int로 추론됨
x = 4.0; // 에러
```

```dart
// 문제 없음
num y = 3; // num은 double이거나 int일 수 있음
y = 4.0;
```

### Type argument inference

생성자 호출 및 [제네릭 메서드](https://dart.dev/language/generics#using-generic-methods) 호출에 대한 타입 인자는 실행 컨텍스트의 하향 정보와 생성자 또는 제네릭 메서드에 대한 인자의 상향 정보의 조합을 기반으로 추론됩니다. 추론이 원하는 대로 수행되지 않거나 예상한 대로 수행되지 않는 경우 언제든지 유형 인수를 명시적으로 지정할 수 있습니다.

```dart
// <int>[]를 적은 것처럼 추론됨
List<int> listOfInt = [];

// <double>[3.0]을 적은 것처럼 추론됨
var listOfDouble = [3.0];

// Iterable<int>를 적은 것처럼 추론됨
var ints = listOfDouble.map((x) => x.toInt());
```

마지막 예시에서, `x`는 하향 정보에 의해 `double`로 추론됩니다. 클로저의 리턴 타입은 상향 정보를 사용해 `int`로 추론됩니다. Dart는 `map()` 메서드의 타입 인자 `<int>`를 추론할 때 리턴 타입을 상향 정보로 사용합니다.

## Substituting types

메서드를 오버라이드하면 한 가지 타입(이전 메서드에서)의 무언가를 새로운 타입(새 메서드에서)을 가질 수 있는 무언가로 대체하는 것입니다. 마찬가지로 함수에 인자를 전달할 때 한 가지 유형(선언된 타입이 있는 매개변수)을 다른 유형(실제 인자)으로 대체하는 것입니다. 하나의 유형을 가진 것을 서브타입이나 수퍼타입을 가진 것으로 대체할 수 있는 경우는 언제일까요?

타입을 대체할 때 *소비자(consumers)*와 *생산자(producers)*의 관점으로 생각하면 도움이 됩니다. 소비자는 유형을 흡수하고 생산자는 유형을 생성합니다.

**소비자의 타입은 수퍼타입으로 대체할 수 있고, 생산자의 타입은 서브타입으로 대체할 수 있습니다.**

간단한 타입 할당과 제네릭 타입을 사용한 할당의 예시를 보겠습니다.

### Simple type assignment

객체를 객체에 할당할 때, 어느 순간에 타입을 다른 타입으로 대체할 수 있을까요? 정답은 객체가 소비자인지 생산자인지에 달려있습니다.

다음 타입 위계를 따른다고 칩시다:

![a hierarchy of animals where the supertype is Animal and the subtypes are Alligator, Cat, and HoneyBadger. Cat has the subtypes of Lion and MaineCoon](https://dart.dev/language/images/type-hierarchy.png)

다음의 간단한 할당에서 `Cat c`는 소비자이고 `Cat()`은 생산자입니다.

```dart
Cat c = Cat();
```

소비하는 위치에서, 특정한 타입(`Cat`)을 소비하는 것을 어느 것이든(`Animal`) 소비하는 것으로 대체하는 것은 안전하므로, `Cat c`를 `Animal c`로 대체하는 것은 허용됩니다. 왜냐하면 `Animal`은 `Cat`의 수퍼타입이기 때문입니다.

```dart
// 문제 없음
Animal c = Cat();
```

하지만 `Cat c`를 `MaineCoon c`로 대체하는 것은 타입 안정성을 깨트립니다. 왜냐하면 `Lion` 타입처럼 상위 클래스가 Cat 타입이면서 `MaineCoon` 타입과는 다른 동작을 하는 타입이 있기 때문입니다.

```dart
// 에러
MaineCoon c = Cat();
```

생산하는 위치에서, 한 타입(`Cat`)을 더 상세한 타입(`MaineCoon`)으로 대체하는 것은 안전합니다. 따라서 다음의 예시는 허용됩니다.

```dart
Cat c = MaineCoon();
```

### Generic type assignment

제네릭 타입에도 규칙은 동일할까요? 맞습니다. animals로 이루어진 배열의 위계를 생각해봅시다 - `Cat`으로 이루어진 `List`는 `Animal`로 이루어진 `List`의 서브 타입이고, `MaineCoon`으로 이루어진 `List`의 수퍼타입입니다.

![List<Animal> -> List<Cat> -> List<MaineCoon>](https://dart.dev/language/images/type-hierarchy-generics.png)

다음의 예시에서, `List<MaineCoon>`은 `List<Cat>`의 서브타입이므로 `MaineCoon` 배열을 `myCats`에 할당할 수 있습니다.

```dart
List<MaineCoon> myMaineCoons = ...
List<Cat> myCats = myMaineCoons; // 문제 없음
```

방향이 반대라면 어떻게 될까요? `Animal` 배열을 `List<Cat>`에 할당할 수 있을까요?

```dart
List<Animal> myAnimals = ...
List<Cat> myCats = myAnimals; // 에러!
```

이 할당은 `Animal`처럼 `dynamic`이 아닌 타입에서 허용되지 않는 암묵적 다운캐스팅을 생성하기 때문에 정적 분석을 통과하지 못합니다.

> [null safety](https://dart.dev/null-safety)가 도입된 2.12 이전의 [언어 버전](https://dart.dev/guides/language/evolution#language-versioning)을 사용하는 패키지에서, 코드는 `dynamic`이 아닌 타입에서 암묵적 다운캐스팅을 할 수 있습니다. 2.12 이전 버전에서 [분석 옵션 파일](https://dart.dev/guides/language/analysis-options)에서 `implicit-casts: false`를 명시하면 `dynamic`이 아닌 타입에서 다운캐스팅하는 것을 비허용할 수 있습니다.

위의 코드가 정적 분석을 통과하게 만드려면 명시적 형 변환을 사용할 수 있습니다.

```dart
List<Animal> myAnimals = ...
List<Cat> myCats = myAnimals as List<Cat>;
```

하지만 명시적 형 변환은 형 변환되는 목록의 실제 유형(`myAnimals`)에 따라 런타임에 여전히 실패할 수 있습니다.

### Methods

메서드를 오버라이드할 때에도 생산자와 소비자 규칙은 여전히 적용됩니다. 예를 들어:

![Animal class showing the chase method as the consumer and the parent getter as the producer](https://dart.dev/language/images/consumer-producer-methods.png)

(`chase(Animal)` 메서드같은) 소비자는 파라미터의 타입을 수퍼타입으로 대체할 수 있습니다. (`parent` 게터 메서드같은) 생산자는 리턴 타입을 서브타입으로 대체할 수 있습니다.

더 자세한 정보는 [메서드 오버라이드할 때 건전한 리턴 타입 사용하기](https://dart.dev/language/type-system#use-proper-return-types) 문서와 [메서드 오버라이드할 때 건전한 파라미터 타입 사용하기](https://dart.dev/language/type-system#use-proper-param-types) 문서를 확인하세요.

## Other resources

건전한 Dart의 더 많은 정보를 보려면 다음의 자료들을 살펴보세요:

- 흔한 타입 문제 해결하기: 건전한 Dart 코드를 사용할 때 볼 수 있는 에러들과 고치는 방법들입니다.
- 타입 프로모션 실패 해결하기: 타입 프로모션 에러를 해결하는 방법을 이해하고 배울 수 있습니다.
- Sound null safety: sound null safety를 활성화한 상태로 코드를 작성하는 방법을 배울 수 있습니다.
- 정적 분석 커스터마이징하기: 분석기 옵션 파일을 사용해 분석기와 린터를 설정하고 커스터마이징하는 방법을 다룹니다.
