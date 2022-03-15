# Position

> 김버그의 HTML&CSS는 재밌다

Position은 요소를 원하는 위치에 자유롭게 이동시키기 위해서 사용하는 프로퍼티이다. `static`, `relative`, `absolute`, `fixed`, `sticky` 다섯가지가 있다.

Position을 사용할 때는 1) 어떤 종류의 position을 사용하는지, 2) 무엇을 기준으로 요소를 위치시키는지에 대해서 생각해야 한다.

## static

모든 요소의 기본 position 값이다. 가장 일반적인 position 상태라고 생각하면 된다.

## relative

`relative`의 기준점은 자기 자신이 본래 있던 자리이다. `position: relative;`를 적용하면 float 때와 비슷하게 붕 뜨게 된다. 하지만 float와는 달리 원래 있던 위치는 기억을 하고 있기에 레이아웃이 망가지지 않는다.

## absolute

`position: absolute;`를 사용하면 float 때와 동일한 현상이 발생한다. 즉, 부모 요소의 `height` 값 계산에 영향을 끼치지 않으며, `display`가 `block`으로 바뀌지만 '길막'을 하진 못한다. 단 inline 요소들 역시 무시하고 배치된다는 점이 float와는 다르다.

`absolute`는 감싸고 있는 여러 조상 중에서 `position: static;`이 **아닌**(즉, `relative | absolute | fixed | sticky`) 요소를 기준으로 배치된다. 즉, `position: absolute;`를 쓰기 위해서는 어떤 조상 요소를 기준으로 움직일 것인지 설정이 반드시 필요하다.

```css
.grandparent {
  position: relative;
}

.parent {
  /* position: static; */
}

.child {
  position: absolute;
  top: 20px;
}
```

위의 예시에서 `child` 요소는 `parent` 요소가 아니라 `grandparent`를 기준으로 해서 움직인다.

## fixed

`position: absolute;`를 사용했을 때와 동일하게 `position: block;`이 되고, 부모 요소의 `height` 값 계산에 영향을 끼치지 않는다. 단, `position: fixed;`는 기준이 viewport, 즉 브라우저 창의 전체 크기이다.

기준이 부모 요소나 `<body>`가 아니기 때문에, 만일 `position: fixed; top: 0;`인 요소가 있다면 스크롤을 아래로 움직여도 사라지지 않고 뷰포트 상단에 고정되어 있다.

### `transform: translate()`를 이용한 가운데 배치

`position: absolute;` 혹은 `position: fixed;`를 했을 때 `top` 등의 속성을 이용해 요소를 배치하게 되는데, 이때 꼭 고정 치수만을 사용하는 것이 아니라 상대 치수(`50%` 등)를 사용할 수 있다. 이때 상대 치수의 기준은 해당 요소가 기준으로 삼는 요소이다.

`transform: translate()`는 요소를 이동할 수 있는 속성으로, 속성의 기준은 요소의 크기이다.

```css
.parent {
  width: 400px;
  height: 400px;
  position: relative;
}

.child {
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

위의 예시를 보면, `child`는 `parent`를 기준으로 왼쪽, 오른쪽으로부터 200px씩 떨어져 있을 것이다. 이때 `transform: translate(-50%, -50%)`를 해주면 `child`가 각각 X축으로 -5px, Y축으로 -5px 이동해 정가운데에 위치하게 된다.

## z-index

`static`이 아닌 다른 position을 사용한 요소들은 붕 뜨게 된다. `z-index`는 요소들을 수직으로 배치한다. 값은 정수이며, 높은 숫자가 낮은 숫자를 덮는다.
