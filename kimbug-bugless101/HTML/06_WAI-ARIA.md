# WAI-ARIA

> 김버그의 HTML&CSS는 재밌다

## `aria-label`

```HTML
<strong aria-label="저자 김현수">
  김현수
</strong>
```

책을 소개하는 카드를 만든다고 가정했을 때, 책 표지 이미지 등과 함께라면 보조기기를 사용하지 않는 사용자의 경우 시각적으로 `김현수`가 `저자`를 의미함을 알 수 있다.

하지만 보조기기를 사용하는 사용자의 경우 해당 이름이 무엇을 의미하는지 이해하는 것이 어려울 수 있다. `aria-label` 속성은 사용자가 보조기기를 사용할 경우 보조기기에 레이블을 제공할 수 있다.

## `aria-hidden`

```html
<strong aria-label="평점 9.4">
  <span aria-hidden="true">
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star-half"></i>
  </span>
  9.4
</strong>
```

위의 예시처럼 평점 등을 나타내기 위해 한 아이콘 등을 여러 번 마크업할 경우, 보조기기를 사용하는 사용자가 불편함을 겪을 수 있다. 이때 `aria-hideen="true"` 속성을 사용하면 해당 속성을 가진 요소는 **시각적으로는 해당 요소를 출력하지만** 보조기기가 해당 요소를 탐색하지 않는다.
