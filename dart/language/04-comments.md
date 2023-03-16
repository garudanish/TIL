# Comments

Dart는 한 줄 주석, 여러 줄 주석, 문서 주석을 지원합니다.

## Single-line comments

한 줄 주석은 `//`로 시작합니다. `//`와 라인의 끝 사이에 있는 모든 것은 Dart 컴파일러가 무시합니다.

```dart
void main() {
  // TODO: AbstractLlamaGreetingFactory 안으로 리팩터링하기?
  print('Welcome to my Llama farm!');
}
```

## Multi-line comments

여러 줄 주석은 `/*`로 시작하고 `*/`로 끝납니다. `/*`와 `*/` 사이에 있는 모든 것은 (주석이 문서 주석이 아닌 한, 다음 섹션 참고) Dart 컴파일러가 무시합니다. 여러 줄 주석은 중첩될 수 있습니다.

```dart
void main() {
  /*
   * 라마를 키우는 건 일이 많습니다. 차라리 닭을 키우는 걸 고려해보세요.

  Llama larry = Llama();
  larry.feed();
  larry.exercise();
  larry.clean();
   */
}
```

## Documentation comments

문서 주석은 `///` 혹은 `/**`로 시작하는 여러 줄 혹은 한 줄 짜리 주석입니다. `///`를 연속해서 여러 줄에 사용하면 여러 줄 문서 주석과 같은 효과가 있습니다.

문서 주석 안에서는, 분석기가 괄호로 감싸지 않은 모든 텍스트를 무시합니다. 괄호를 사용하면 클래스, 메서드, 필드, 최상위 변수, 함수, 파라미터 등을 참조할 수 있습니다. 괄호 안의 이름들은 문서화된 프로그램 요소의 렉시컬 스코프 안에서 해결됩니다.

다음은 다른 클래스와 인수로의 참조와 함께 적은 문서 주석의 예시입니다:

```dart
/// 길들여진 남아메리카 낙타(Lama glama)
///
/// 안데스 문명은 라마를 고기와 짐나르는 용으로
/// 히스패닉 문명 이전부터 이용했습니다.
///
/// 다른 동물들처럼, 라마 역시 먹여야 하므로
/// [Food]를 [feed]하는 것을 잊지 마세요.
class Llama {
  String? name;

  /// 라마에게 [food]를 줍니다.
  ///
  /// 일반적인 라마는 일주일에 건초 한 더미를 먹습니다.
  void feed(Food food) {
    // ...
  }

  /// [timeLimit] 분동안
  /// 라마를 [activity]로 운동시킵니다.
  void exercise(Activity activity, int timeLimit) {
    // ...
  }
}
```

클래스에서 생성된 문서에서, `[feed]`는 `feed` 메서드의 문서로 연결되고, `[Food]`는 `Food` 클래스의 문서로 연결됩니다.

Dart 문서 생성 툴인 [`dart doc`](https://dart.dev/tools/dart-doc)을 활용해 Dart 코드를 파싱하고 HTML 문서를 만들 수 있습니다. 생성된 문서의 예시는 [Dart API 문서](https://api.dart.dev/stable/2.19.4/index.html)를 참고하세요. 주석의 구조를 잡는데 도움을 얻고 싶다면 [이펙티브 다트: 문서](https://dart.dev/guides/language/effective-dart/documentation)를 참고하세요.
