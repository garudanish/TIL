다음 표는 Dart 언어에서 특별하게 취급하는 단어들의 목록입니다.

|             |              |             |           |
| ----------- | ------------ | ----------- | --------- |
| abstract 2  | else         | import 2    | show 1    |
| as 2        | enum         | in          | static 2  |
| assert      | export 2     | interface 2 | super     |
| async 1     | extends      | is          | switch    |
| await 3     | extension 2  | late 2      | sync 1    |
| break       | external 2   | library 2   | this      |
| case        | factory 2    | mixin 2     | throw     |
| catch       | false        | new         | true      |
| class       | final        | null        | try       |
| const       | finally      | on 1        | typedef 2 |
| continue    | for          | operator 2  | var       |
| covariant 2 | Function 2   | part 2      | void      |
| default     | get 2        | required 2  | while     |
| deferred 2  | hide 1       | rethrow     | with      |
| do          | if           | return      | yield 3   |
| dynamic 2   | implements 2 | set 2       |

위 단어들을 식별자로 사용하는 것을 피하세요. 하지만, 꼭 필요하다면 숫자가 표시된 키워드들은 식별자로 사용할 수 있습니다:

- 1이 표시된 단어들은 맥락적 키워드이며, 특정 위치에서만 의미를 가집니다. 어느 곳에서든 유효한 식별자로 사용할 수 있습니다.
- 2가 표시된 단어들은 빌트인 식별자들입니다. 대부분 유효한 식별자로 사용할 수 있으나, 클래스, 타입 이름, import 접두사로 쓸 수는 없습니다.
- 3이 표시된 단어들은 [비동기 지원](https://dart.dev/language/async)과 관련된 제한된 예약어입니다. `async`, `async*`, `sync*`가 표시된 함수에서 식별자로 `await`이나 `yield` 를 사용할 수 없습니다.
