# Libraries & imports

`import`와 `library` 지시어는 모듈화되고 공유 가능한 코드 베이스를 만들 수 있도록 도와줍니다. 라이브러리는 API 뿐 아니라 privacy의 단위이기도 합니다. 언더스코어(`_`)로 시작하는 식별자는 라이브러리 내부에서만 볼 수 있습니다. [`library`](https://dart.dev/language/libraries#library-directive) 지시어를 쓰지 않더라도, _모든 Dart 앱은 라이브러리입니다_.

[패키지](https://dart.dev/guides/packages)를 사용해 라이브러리를 배포할 수 있습니다.

> Dart가 `public`이나 `private`같은 접근 수정 키워드 대신 언더스코어를 쓰는 이유가 궁금하다면 [SDK issue 33383](https://github.com/dart-lang/sdk/issues/33383)을 확인하세요.

## Using libraries

`import`를 사용해 한 라이브러리의 네임스페이스가 다른 라이브러리의 범위에서 사용되는 방식을 지정할 수 있습니다.

예를 들어, Dart 웹 앱은 일반적으로 [dart:html](https://api.dart.dev/stable/dart-html) 라이브러리를 사용하며, 다음과 같이 import 할 수 있습니다.

```dart
import 'dart:html';
```

`import`에 유일하게 필요한 인자는 라이브러리를 특정하는 URI입니다. 빌트인 라이브러리의 URI는 `dart:`라는 특별한 스킴을 가지고 있습니다. 다른 라이브러리을 쓰려면 파일 시스템 경로를 사용하거나 `package:` 스킴을 사용합니다. `package:` 스킴은 pub tool과 같은 패키지 매니저에 의해 제공되는 라이브러리를 특정합니다. 예를 들어:

```dart
import 'package:test/test.dart';
```

> *URI*는 단일 리소스 식별자를 나타냅니다. _URL_(단일 리소스 위치)는 URI의 일반적인 종류입니다.

## Specifying a library prefix

헷갈리는 식별자를 가진 두 개의 라이브러리를 import해야 한다면, 한 개 혹은 두 개 모두에게 접두사를 특정해줄 수 있습니다. 예를 들어, library1과 library2가 모두 Element 클래스를 가지고 있다면, 다음과 같이 코드를 작성할 수 있습니다:

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// lib1의 Elment 사용
Element element1 = Element();

// lib2의 Elment 사용
lib2.Element element2 = lib2.Element();
```

## Importing only part of a library

라이브러리의 일부만 사용하길 원한다면, 라이브러리를 선택적으로 import할 수 있습니다. 예를 들어:

```dart
// foo만 import
import 'package:lib1/lib1.dart' show foo;

// foo를 제외한 모든 name들을 가져오기
import 'package:lib2/lib2.dart' hide foo;
```

### Lazily loading a libray

지연 로딩(또는 레이지 로딩 lazy loading)은 웹 앱이 라이브러리가 필요할 때만 라이브러리를 로드할 수 있게 합니다. 다음은 지연 로딩을 사용할 수 있는 몇 가지 경우들입니다:

- 웹 앱의 첫 시작 시간을 줄이려 할 때
- A/B 테스트를 수행하고자 할때 - 예를 들면, 알고리즘을 다른 방식으로 구현하고자 할 때
- 필수가 아닌 화면이나 다이얼로그같이 드물게 사용되는 기능을 로드할 때

> **지연 로딩은 `dart compile js`에서만 지원합니다.** 플러터와 Dart VM은 지연 로딩을 지원하지 않습니다. 더 자세히 알려면 [issue #33118](https://github.com/dart-lang/sdk/issues/33118)과 [issue #27776](https://github.com/dart-lang/sdk/issues/27776)을 참고하세요.

라이브러리를 지연 로딩하려면, import 할 때 `deferred as`를 사용해야 합니다.

```dart
import 'package:greetings/hello.dart' deferred as hello;
```

라이브러리를 사용해야 할 때 라이브러리 식별자를 사용해 `loadLibrary()`를 호출합니다.

```dart
Future<void> greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

이전의 코드에서, `await` 키워드는 라이브러리가 로드될 때까지 실행을 멈춥니다. `async`와 `await`에 대한 더 자세한 정보는 [비동기 지원](https://dart.dev/language/async) 문서를 참고하세요.

라이브러리를 `loadLibrary()`로 여러번 호출하는 것은 문제가 없습니다. 라이브러리는 오직 한 번만 로딩됩니다.

지연 로딩을 사용할 때 다음과 같은 점을 잊지 마세요:

- 지연 로딩되는 라이브러리의 상수들은 import하는 파일에서 상수가 아닙니다. 기억하세요, 이 상수들은 라이브러리가 로드되기 전까지는 존재하지 않습니다.
- import하는 파일에서 지연 로딩되는 라이브러리으로부터 타입을 사용할 수 없습니다. 대신 인터페이스 타입을 지연된 라이브러리와 가져오는 파일 모두에서 가져온 라이브러리로 이동하는 것을 고려하세요.
- Dart는 암묵적으로 `loadLibrary()`를 `deferred as namespace`로 정의한 네임스페이스에 삽입합니다. `loadLibrary()` 함수는 [`Future`](https://dart.dev/guides/libraries/library-tour#future)를 반환합니다.

## The `library` directive

라이브러리 레벨 문서 주석이나 메타데이터 어노테이션을 특정하려면 파일이 시작할 때 `library` 선언에 함께 붙여놓으세요.

```dart
/// A really great test library.
@TestOn('brower')
library;
```

## Implementing libraries

라이브러리 패키지를 구현하는 방법에 대한 조언을 얻고 싶다면 [라이브러리 패키지 만들기](https://dart.dev/guides/libraries/create-library-packages) 문서를 참고하세요. 이 문서는 다음을 포함합니다:

- 라이브러리 소스 코드를 조직하는 법
- `export` 지시어의 사용법
- `part` 지시어를 사용해야 할 때
- 여러 플래폼을 지원하는 라이브러리를 구현하기 위해서 조건부로 import, export하는 방법
