# CSS

CSS는 Cascading Style Sheets의 약자로, 웹에서 스타일과 관련된 기능을 전담한다.

1. 선택자 Selector

   CSS를 적용할 때 스타일을 지정할 특정 HTML 요소를 선택하는 역할을 수행한다.

2. 속성 Property

   HTML의 속성attributes와는 다르다. CSS에서 프로퍼티는 지정 또는 변경하고 싶은 스타일 속성의 이름이다. CSS에 정의된 프로퍼티를 올바르게 사용해야 원하는 스타일을 알맞게 적용할 수 있다.

3. 값 Value

   CSS에 정의된 특정 키워드(`blue`, `block` 등)나 수치와 특정 단위(`px`, `em`, `rem` 등)으로 나뉜다. 값은 프로퍼티와 짝을 이루어 사용하며, 보통 각 프로퍼티에 허용되는 값의 종류가 정해져 있어 이를 정확히 알고 사용해야 우리가 원하는 방향으로 스타일을 적용할 수 있다.

4. 선언 블록 Declartion block

   선택자 뒤에 위치한 `{}` 안의 한 블록을 선언 블록이라고 한다. 선언 블록은 중괄호로 시작과 끝을 나타내며, 블록 안의 내용을 한 단위로 하고 다음 선언 블록과 구분된다. 각각 적혀있는 선택자에 한해 스타일이 적용된다.

   선언 블록 내부의 선언은 다른 선언과 `;`으로 구분된다. 각 선언이 끝날 때마다 선언이 끝났음을 알리는 세미콜론을 반드시 작성해야 한다.

## 선택자

`<h1>`, `<p>`, `<div>`와 같은 일반적인 태그 이름을 선택자로 사용할 수 있다. 선택자 여러 개의 스타일을 한꺼번에 지정할 때엔 `,`를 사용한다.

```CSS
h1, p {
  color: red;
}
h1 {
  background: blue;
}
p {
  background: green;
}
```

선택자는 크게 1) 단순 선택자, 2) 복합 선택자, 3) 가상 클래스 선택자로 분류할 수 있다.

### 단순 선택자

단순 선택자로 사용할 수 있는 것은 다음과 같다.

- 타입 선택자 Type selector
- 아이디 선택자 ID selector
- 클래스 선택자 Class selector
- 전체 선택자 Universal selector
- 속성 선택자 Attribute selector

#### 타입 선택자

타입 선택자는 해당 태그를 가지는 모든 요소에 스타일을 적용한다. 선택자 자리에 태그를 넣으면 태그에 해당하는 모든 요소에 스타일이 적용된다.

#### 아이디 선택자

아이디 이름으로 스타일을 적용한다. HTML 문서 내에서 중복된 아이디는 존재할 수 없으며, 서로 다른 요소들을 구별하기 위한 장치로 사용한다.

아이디 선택자는 HTML의 아이디 속성을 선택자로 사용해 스타일을 적용한다. `#아이디` 를 사용해 해당 ID를 선택한다.

#### 클래스 선택자

클래스 속성은 비슷한 특징을 가지는 요소들에게 지정할 수 있다. `.클래스`를 사용해 해당 클래스를 선택한다.

#### 전체 선택자

전체 선택자는 모든 요소에 스타일을 적용한다. 모든 요소에 적용시키기 때문에 속도가 저하될 수 있어 쓰지 않기를 권장한다. `*`를 선택자 자리에 입력하면 된다.

#### 속성 선택자

속성 선택자는 특정 HTML 속성을 가지고 있는 모든 요소에 스타일을 적용한다. `선택자[속성명="속성값"]`을 넣어 작성하면 된다.

### 복합 선택자

HTML의 부모 - 자식 - 후손 관계에 따라 CSS에서도 자식과 후손과 연관된 선택자인 자식 선택자, 후손 선택자를 사용하게 되는데 이 두 선택자가 복합 선택자의 대표적인 예이다.

#### 자식 선택자 Child selector

자식 선택자는 선택자 A의 모든 자식 중 선택자 B와 일치하는 모든 요소를 선택한다. 선택자 A와 선택자 B 사이에 `>`를 사용한다.

```CSS
#me > p {
  color: green;
}
```

#### 후손 선택자 Descendant selector

후손 선택자는 선택자 A의 모든 후손 중 선택자 B와 일치하는 요소를 선택한다. 선택자 A와 선택자 B 사이에 `띄어쓰기`를 사용한다.

```CSS
#me p {
	background-color: yellow;
}
```

### 가상 클래스 선택자

가상 클래스 선택자는 요소의 특별한 상태를 정의하는데 사용한다. 스타일을 지정할 때 쓰인다는 점에선 클래스와 비슷하지만, 가상 클래스는 직접 정의할 수 없고 실제 HTML에 보이지 않는다.

가장 대표적인 가상 클래스는 링크 태그와 관련된 가상 클래스이다.

- `a:link`: 방문하지 않은 링크일 때
- `a:visited`: 방문했던 링크일 때
- `a:hover`: 링크에 마우스를 올렸을 때
- `a:active`: 선택된 링크일 때. 클릭 시의 스타일을 적용한다.

## CSS의 기본 단위

CSS에서 프로퍼티가 다양한 만큼 값 또한 매우 다양하다. CSS의 값에 들어갈 수 있는 것 중 대표적인 것으로 크기 단위를 들 수 있다. 글자 사이즈, 높이, 너비 등을 정하는 등 크기와 관련된 값을 조정할 때 크기 단위를 이용해 수치를 조정한다.

### 고정 크기 단위

- `px`: 픽셀
  - 픽셀은 장치의 해상도에 따라 다른 크기를 갖지만, 브라우저에서의 1px는 1/96 인치로 고정된 값이다.
- `pt`: 포인트
- `in`: 인치
- `cm`, `mm`: 센티미터, 밀리미터

### 가변 크기 단위

- `em`: 배수 단위. 부모의 글자 크기에 따라 기준점이 달라진다.
- `rem`: root me. 최상위 요소의 글자크기에 따라 달라진다.
- `%`: 백분율 단위
- `vw`, `vh`: 화면비 백분율 단위
- `vmin`: 화면비 최솟값
- `vmax`: 화면비 최댓값
- `ex`: 현재 폰트의 x-height 값

`em`은 현재 스타일이 지정되는 요소의 폰트 크기를 기준으로, `rem`은 최상위 요소의 폰트 크기를 기준으로 상대적인 길이를 가진다.

기기에 따라 반응하는 반응형 웹을 만들기 위해 상대 길이인 `em`과 `rem`의 사용을 권장한다. 하지만 `em`은 상속으로 인해 복잡하기 때문에 쓰는 걸 권장하지 않는다.

## 색상

CSS에서 색과 관련된 값은 일반적으로 3가지 방법이 쓰인다. 키워드, hex code, rgb.

### 키워드

```css
.box {
  background-color: blue;
}
```

키워드는 색을 지정하는 가장 간단한 방법 중 하나이다. 내부적으로 지정되어 있는 키워드를 쓰면 쉽게 색을 지정할 수 있다. 브라우저는 140가지 색상 이름을 지원하며, 다른 표현 방식에 비해 수가 제한적이다.

### RGB

```CSS
.box {
  background-color: rgb(102, 205,170);
}
```

빛의 3원색인 빨강, 초록, 파랑을 혼합해 색을 표현하는 방식이다.

### HEX Code

```CSS
.box {
  background-color: #F08080;
}
```

HEX 값는 16진수 6자리 코드로 색상을 표현하는 방식이다. 각 2자리씩 빨강, 초록, 파랑에 대한 값을 표현한다.

### Alpha

```CSS
.box {
  background-color: rgba(102, 205, 170, 0.5);
  color: #F0808055;

}
```

HEX Code와 RGB에는 alpha라는 값이 존재한다. 이는 투명도를 나타낸다. RGB는 `rgba`를 통해 0-1 사이의 숫자로, HEX Code는 6자리에 16진수 2자리를 추가해 alpha 값을 표현할 수 있다.

## 박스 모델

HTML의 모든 요소는 상자(Box)의 형태를 갖는다. 이 말은 브라우저에 출력되는 컨텐츠가 사각형 박스 형태로 출력된다는 것을 의미한다. 컨텐츠를 감싸고 있는 것은 컨텐츠 외에도 패딩(Padding), 경계선(Border), 마진(Margin)이 있는데, 이러한 박스 형태 전체를 가리켜 박스 모델이라고 부른다.

- 내용 Content: 이미지나 텍스트와 같이 우리가 코드 상에서 태그 사이에 담은 내용, 즉 실제로 담고 있는 부분
- 경계선 Border: 컨텐츠를 감싸고 있는 테두리
- 패딩 Padding: 컨텐츠와 경계선 사이의 여백
- 마진 Margin: 경계선 밖의 여백

### Content

보통 요소의 크기를 정의 할 때 `witdth`, `height`를 많이 사용하는데, 이런 너비와 크기는 Content의 크기에 해당한다. 컨텐츠 영역의 크기가 지정되어 있는 상태에서 컨텐츠의 크기를 늘리면 내용이 컨텐츠 박스를 벗어나게 된다.

내용이 컨텐츠 박스를 벗어난 요소 뒤에 새로운 요소를 추가한다고 하더라도 자동 개행되지 않는다. 마진, 패딩 등이 따로 지정되지 앟으면 컨텐츠 박스의 크기를 기준으로 배치된다.

### Border

border는 크게 세 프로퍼티를 이용한다. `border-style`, `border-width`, `border-color`.

#### `border-style`

`border-style`은 선의 종류를 지정하는 프로퍼티이다. 원하는 모양의 경계선을 추가할 수 있다.

```css
.radius {
  border-style: solid dashed dotted double;
}

/* 이 코드는 아래 코드와 같다.
border-top-style: solid;
border-right-style: dashed;
border-bottom-style: dotted;
border-left-style: double; */

/* border-style: none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset | initial | inherit */
```

CSS에서는 위의 예시처럼 top, right, bottom, left의 순서로 각기 다른 스타일을 적용할 수 있다. 한 개: 상하좌우, 두 개: 상하 / 좌우, 세 개: 상 / 좌우 / 하, 네 개: 상 / 우 / 하 / 좌 순으로 적용된다.

#### `border-width`, `border-color`

`border-width`와 `border-color`로 선의 두께와 색을 지정할 수 있다. 두 프로퍼티는 `border-style` 없이 지정했을 땐 적용되지 않는다.

`border-style`과 마찬 가지로 사용하는 개수에 따라 적용되는 위치가 달라지고, 위치 마다 따로 스타일을 지정할 수 있다.

#### border의 shortcut

`border` 프로퍼티는 shortcut을 이용해 한 번에 지정할 수 있다.

```css
.border {
  border: red solid 1px;
  border-bottom: black dashed 1px;
}
```

#### `border-radius`

`border-radius` 속성은 경계선을 둥글게 표현할 때 사용한다. `border-radius`의 값은 모서리의 반지름 값이다. `border-radius` 속성은 테두리 존재 여부와 별개로 적용된다.

`border-radius` 속성 역시 값을 여러 개 작성하면 왼쪽 위, 오른쪽 위, 오른쪽 아래, 왼쪽 아래의 순서대로 모서리마다 적용할 수 있다.

```css
.radius {
  border-radius: 8px 16px 24px 36px;

  /* 이 코드는 아래 코드와 같다.
  border-top-left-radius: 8px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 36px;
  */
}
```

또한 속성에 가로 반지름을 먼저 적고 세로 반지름을 이어 적으면 타원형의 radius를 적용할 수 있다. 모서리마다 타원형의 radius를 적용하고 싶다면 `가로 반지름 / 세로 반지름`의 형태로 작성한다.

```css
.radius {
  border-radius: 8px 16px 24px 36px / 36px 24px 16px 8px;
}
```

### padding과 margin

padding과 margin 역시 border처럼 네 방향 따로 혹은 한꺼번에 모두 적용할 수 있다.

#### 마진 상쇄

마진과 패딩은 비슷하지만 서로 다른 두 요소를 위아래로 배치하여 마진을 사용할 때 주목해야 할 특징이 있다.

위아래로 맞닿은 두 요소 사이 마진은 더 큰 쪽을 기준으로 결정된다. 즉, 두 요소에 각각 마진을 각각 적용하더라도 서로 맞닿아 있다면 마진이 따로 존재하지 않는다.

### box-sizing

`box-sizing` 속성의 기본 값은 `content-box`이다. 즉, content-box를 기준으로 크기를 결정한다. `box-sizing = border-box;`는 border 바로 전 padding까지를 기준으로 정해진다.

즉, `width = 24px; padding = 10px;`라면, `content-box`의 경우는 content만 24px에 padding이 10px 추가되어 요소의 가로 길이는 34px가 된다. `border-box`의 경우는 padding과 content를 모두 합친 가로 길이가 24px이 된다.

## 글자 관련 스타일

웹에서 텍스트를 다루는 프로퍼티는 자주 사용하며 그만큼 중요하다.

### `font-family`

```css
p {
  font-family: "폰트이름1" "폰트이름2";
}
```

`font-family`를 통해 원하는 폰트의 종류를 지저할 수 있다. 일반적으로 한 단어로 구성된 폰트명(`Arial` 등)은 따옴표 없이 사용할 수 있다. 하지만 띄어쓰기나 하이픈이 들어간 폰트명(`Noto-Sans`)의 경우 따옴표를 사용해야 한다.

`font-family`를 통해 폰트의 종류를 정의할 때는 여러 개를 동시에 지정하는 경우가 많다. 이 경우 앞 순서에 위치한 폰트부터 차례로 적용한다.

### 웹 폰트

웹 폰트는 링크를 통해 폰트를 불러오는 방식이다.

```css
@import url("https://fonts.googleapis.com/css?family=Nanum+Pen+Script&display=swap");

h1,
p {
  font-family: "Nanum Pen Script", cursive;
}
```

[구글 폰트](https://fonts.google.com/)에서 원하는 폰트를 선택 후, CSS 문서에 `@import` 방식 혹은 HTML 문서에 `<link>` 태그 등을 사용하여 적용할 수 있다.

### `font-style`

`font-style`로 가능한 값은 `normal`, `italic`, `oblique` 등이 있다. `italic`과 `oblique`는 둘 다 기울임이 적용된 스타일이지만, `italic`은 이탤릭체가 디자인 되어있는 폰트에서 사용하고 `oblique`는 이탤릭체가 디자인 되어있지 않더라도 무조건 글자를 기울여서 표현한다.

### `font-weight`

`font-weight`는 폰트 굵기를 지정할 때 사용한다. `bold`나 100 단위의 숫자값을 사용할 수 있다. 숫자 값은 100-900까지 가능하며, 보통 `normal`이 `400`, `bold`가 `700`의 값을 가진다.

### `font`

이상의 폰트와 관련한 속성을 `font` 속성을 사용하면 한 번에 설정할 수 있다.

`font: font-style font-weight size font-family;` 각각의 요소를 띄어쓰기로 구분하여 작성하면 된다. 순서를 반드시 지켜야 하며 `font-style`과 `font-weight`은 생략해도 무관하다.

```css
p {
  /* ✅ font: font-style font-weight size font-family */
  font: italic bold 24px "Nanum Pen Script", cursive;
}

h1 {
  /* ✅ font: size font-family */
  font: 24px "Nanum Pen Script", cursive;
}
```

### `text-align`

`text-align` 속성을 사용하면 좌(`text-align: left;`), 우(`text-align: right;`), 중앙(`text-align: center;`) 정렬을 할 수 있다. `justify` 값을 사용하면 좌우로 띄어쓰기를 늘려 붙인다.

### `line-height`

`line-height`는 문장 사이의 간격을 조정하는 프로퍼티이다. `line-heigth`의 값으로 단위를 붙인 숫자와 단위를 붙이지 않은 숫자 둘 다 올 수 있다. 단위를 붙이지 않았을 경우엔 해당 요소의 `font-size`를 1배수로 기준하여 높이를 조정한다.

### `letter-spacing`

`letter-spacing`은 자간을 조정한다.

### `text-indent`

`text-indent`는 문단의 시작부에 들여쓰기를 지정한다.
