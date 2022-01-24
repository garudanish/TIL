# 박스

> 김버그의 HTML&CSS는 재밌다

## Box Model

개발자 도구를 켜서 요소 선택을 해보면 상자들이 나온다. HTML의 모든 요소들은 CSS로 표현될 때 박스로 표현된다. 그 박스가 일정한 형태(margin, border, padding, content)의 모델로 구성되어 있기 때문에 그것을 '박스 모델'이라고 한다.

- Content: 컨텐트가 들어있는 상자. 가로를 `width` 속성, 세로를 `height` 속성으로 설정할 수 있다.
- Padding: 테두리 안 쪽 여백. 테두리와 컨텐츠 사이의 여백을 설정한다.
- Border: 테두리. 다른 속성들은 크기만 작성하면 되지만, border는 `border: 1px solid #000` 식으로 굵기, 스타일, 색상을 모두 작성해야 만들 수 있다.
  - 테두리를 사용하고 싶지 않을 경우 `border: none`을 사용할 수 있다.
  - `border-radius` 속성을 작성할 경우 그만큼 모서리가 동그래진다. 완전한 원을 만들고 싶다면 값을 `50%`를 설정한다.
- Margin: 바깥쪽 여백, 즉 요소와 요소의 간격을 나타낸다.

### 속기형 Shorthand

```css
.box {
  padding: 10px 20px 30px 40px;
  margin: 20px 40px; /*top, bottom: 20px / left, right: 40px*/
}
```

padding, margin 등을 상하좌우 모두 적용하고 싶을 경우 속기형을 사용할 수 있다. 속기형은 위쪽부터 시계방향으로 상 우 하 좌 순으로 적용된다. 상-하, 좌-우는 세트여서, 둘 중 하나가 비어있는 경우 세트의 값을 따라간다.

## Box Sizing

`box-sizing` 속성은 박스의 사이즈를 잡는 법에 대한 속성이다. HTML의 모든 요소의 `box-sizing` 기본 값은 `content-box`이다.

`content-box`는 `width`와 `height` 속성이 Content에만 적용되기 때문에 padding을 적용할 경우 추가적인 계산을 해야 한다.

`box-sizing: border-box;`를 작성하면 `width` 값이 content, padding, border를 더한 값으로 적용된다.

대부분은 CSS 파일을 작성할 때 맨 처음에 `box-sizing: border-box;`를 전체 요소에 적용한다.

```css
* {
  box-sizing: border-box;
}
}
```

## Block

Block의 성격은 **길막**으로 정리할 수 있다. HTML은 위에서 아래로 요소를 렌더하는데, 만일 `display: block;` 속성을 가진 요소가 있다면 해당 요소는 '길막'을 하기 때문에 해당 요소 옆에 공간이 남아있어도 다른 요소가 렌더되지 않고 아래로 렌더된다.

1. 요소에 따로 `width`를 선언하지 않은 경우, 기본적으로 부모의 content-box의 길이가 그 요소의 `width`가 된다.
2. 따로 `width`를 선언한 경우, 남은 빈 공간을 자동으로 margin으로 채운다. 하지만 개발자 도구에서 보면 마진 값이 따로 기입되어 있지는 않다.
3. `margin: 0 auto;` 속성을 사용하면 좌우 마진을 자동으로 동일하게 설정해서 가운데 배치가 가능하다.
4. `width`, `height`, `padding`, `border`, `margin` 등 박스 모델의 모든 속성이 적용 가능하다.
5. 따로 부모의 `height`를 선언하지 않을 경우, 자식 요소 박스 모델 길이의 합이 부모의 `height` 값이 된다.

## Inline

Inline의 성격은 **흐름**으로 정리할 수 있다. Inline은 기본적으로 옆으로 나열돼 흐르려고 한다. 부모 요소의 길이가 모자라지 않는한 Inline 요소는 옆에 렌더된다. Block이 면(영역)이라면, Inline은 선(흐름)이다.

`width`, `height`, `padding-top`, `padding-bottom`, `border-top`, `border-bottom`, `margin-top`, `margin-bottom` 속성을 사용할 수 없다.

## Inline Block

`display: inline-block;`. 짬짜면 같은 속성. Block의 좋은 점과 Inline의 좋은 점을 모두 갖고 있다. Inline처럼 가로로 흐르는 동시에 Block처럼 영역을 잡을 수 있다.

즉, Inline에서 사용하지 못했던 `width`, `height` 등의 속성을 사용할 수 있다.
