# Typography

> 김버그의 HTML&CSS는 재밌다

웹은 정보를 공유하는 매개체이며, 그 정보의 대다수는 텍스트로 이루어져 있다. 텍스트를 어떤 식으로 디자인하냐에 따라 가독성이 달라지고, 가독성이 좋으면 사용자 경험도 더 좋아진다.

사용자들에게 읽기 좋은 텍스트를 제공하는 게 타이포그래피이고, 웹 디자인에선 타이포그래피가 굉장히 중요한 역할을 한다.

## `font-size`

**글씨의 크기**를 설정할 때 사용한다.

- `px`: pixel. 절대 단위. 어딜 가든 고정된 값을 가진다.
- `em`: equal to capital M. 대문자 M 사이즈의 크기를 기준으로 하는 상대 단위. '실제로 적용된 폰트 사이즈'를 1em이라고 생각하면 된다.
  - 불안정해서 폰트 사이즈를 지정할 때는 잘 사용하지 않는다.
- `rem`: root em. root는 HTML 자체를 뜻한다. 즉, `rem`은 HTML에 적용된 폰트 사이즈가 1rem이다.

## `line-height`

**줄 간격**을 설정할 때 사용한다. `px`, `em`, `rem` 단위를 사용할 수 있으며, `em`을 많이 사용한다. `em`을 사용할 땐 단위를 생략하고 숫자 값만 적는 것이 관례이다.

`line-height`의 수치와 상관 없이, 폰트는 언제나 줄 간격의 가운데에 배치된다.

## `letter-spacing`

**자간**을 설정할 때 사용한다. `px`, `em` 단위를 사용할 수 있다. `em`을 사용할 때의 값은 퍼센트이다. 즉, -1%라면 `letter-spacing: -0.01em`을 입력해야 한다.

line-height`와는 다르게 `em` 단위를 생략하면 안 된다.

## `font-family`

**폰트 서체**를 설정할 때 사용한다. 여러 개의 폰트 이름을 값으로 가질 수 있으며, 앞의 것부터 우선 적용된다. 첫번 째 폰트가 기기에 없으면 두번 째, 두번 째 폰트가 없으면 세번 째... 값을 적용하게 된다.

## `font-weight`

**폰트의 굵기**를 설정할 때 사용한다. 값은 100 단위의 숫자 값을 주로 사용하며, 숫자가 커질 수록 굵어진다.

`400`은 Regular, `700`은 Bold를 나타내는 것이 관례이다.

## `color`

**색상**을 설정할 때 사용한다. HEX 코드, `rgb(r, g, b)`, `rgba(r, g, b, a)` 세 방식으로 입력할 수 있다.

## `text-align`

**정렬**을 설정할 때 사용한다. `left`, `right`, `center`을 사용할 수 있다.

## `text-indent`

**들여쓰기**를 설정할 때 사용한다. 음수를 값으로 가질 수도 있다.

## `text-transform`

**알파벳의 대소문자**를 설정할 때 사용한다.

- `capitalize`: 단어의 첫 글자를 대문자로 만든다.
- `uppercase`: 모든 문자를 대문자로 만든다.
- `lowercase`: 모든 문자를 소문자로 만든다.

## `text-decoration`

**줄을 긋는 것**을 설정할 때 사용한다.

- `underline`: 밑줄
- `line-through`: 취소선
- `overline`: 윗줄.

`<a>` 태그의 `text-decoration` 기본 값은 `underline`인데, 이를 없앨 때 `text-decoration: none;`의 방식으로 사용할 수 있다.

## `font-style`

**기울기**를 설정할 때 사용한다.

`italic`, `oblique`의 값이 있으며, `italic` 값을 더 자주 사용한다. `<em>` 태그의 `font-style` 기본 값이 `italic`이다.

## Webfont

사용자의 기기에 의도한 서체가 없으면 기본 서체를 적용한다. 그렇기 때문에 특정 폰트를 사용할 경우 해당 폰트를 사용자에게 반드시 제공해야 한다.

[Google Fonts](https://font.google.com/)에서 직접 갖다 쓸 수도 있고, [github 나눔스퀘어 라운드](https://github.com/innks/NanumSquareRound) 등과 같이 파일을 다운로드해서 사용할 수도 있다.

웹폰트를 설정한 뒤 HTML에 `<link>` 태그를 통해 임포트 하거나, CSS에 `@import url("파일 경로")`를 통해 임포트할 수 있다.
