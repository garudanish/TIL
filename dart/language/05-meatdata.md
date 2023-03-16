# Metadata

코드에 추가적인 정보를 제공하려면 메타데이터를 사용하세요. 메타데이터 어노테이션은 문자 `@`로 시작하며, 그 뒤엔 컴파일 타임 상수(`deprecated` 같은)에 대한 참조나 상수 생성자 호출이 이어집니다.

모든 Dart 코드에 세 가지 어노테이션을 사용할 수 있습니다: `@Deprecated`, `@deprecated`, `@override`. `@override`의 예시를 보려면 [클래스 확장하기](https://dart.dev/language/extend) 문서를 참고하세요. 다음은 `@Deprecated` 어노테이션을 사용하는 예시입니다.

```dart
class Television {
  /// 전원을 켜려면 이 메서드 대신 [turnOn]을 사용하세요
  @Deprecated('Use turnOn instead')
  void activate() {
    turnOn();
  }

  /// TV의 전원을 켭니다
  void turnOn() {...}
  // ···
}
```

작성자만의 메타데이터 어노테이션을 정의할 수 있습니다. 다음은 두개의 인자를 받는 `@Todo` 어노테이션을 정의하는 예시입니다.

```dart
class Todo {
  final String who;
  final String what;

  const Todo(this.who, this.what);
}
```

그리고 다음은 `@Todo` 어노테이션을 사용하는 예시입니다.

```dart
@Todo('김현수', '이 함수 구현하기')
void doSomething() {
  print('Do something');
}
```

메타데이터는 라이브러리, 클래스, 타입정의(typedef), 타입 파라미터, 생성자, 팩토리, 함수, 필드, 파라미터, 변수를 정의하기 전이나 import 혹은 export 지시문 이전에 나올 수 있습니다. 리플렉션(reflection)을 사용하여 런타임 때 메타데이터를 검색할 수 있습니다.
