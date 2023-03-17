# Typedefs

타입 별칭(`typedef` 키워드로 선언되기 때문에 흔히 typedef라고도 함)은 타입을 간결하게 참조하는 방법입니다. 다음은 `IntList`라는 타입 별칭을 선언하고 사용하는 예제입니다:

```dart
typedef IntList = List<int>;
IntList il = [1, 2, 3];
```

타입 별칭은 타입 파라미터를 가질 수 있습니다.

```dart
typedef ListMapper<X> = Map<X, List<X>>;
Map<String, List<String>> m1 = {}; // 코드가 깁니다.
ListMapper<String> m2 = {}; // m1과 같지만 짧고 깔끔합니다.
```

> 2.13 버전 이전까지 typedefs는 함수 타입에만 사용할 수 있었습니다. 새로운 typedefs를 사용하려면 [언어 버전](https://dart.dev/guides/language/evolution#language-versioning)이 최소 2.13 이상이어야 합니다.

대부분의 경우엔 함수의 typedefs를 작성하는 대신 [인라인 함수 타입](https://dart.dev/guides/language/effective-dart/design#prefer-inline-function-types-over-typedefs)을 사용하는 것을 추천드립니다. 하지만, 함수 typedefs는 유용하게 쓰일 수 있습니다:

```dart
typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True!
}
```
