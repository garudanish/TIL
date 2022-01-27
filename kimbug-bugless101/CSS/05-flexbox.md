# Flexbox

> 김버그의 HTML&CSS는 재밌다

정렬의 끝판왕.

## Flexbox 사용 선언

```css
.flexbox {
  display: flex;
  /* flex | inline-flex */
}
```

Flexbox를 사용하기 위해선 정렬하고자 하는 요소들의 부모 요소에 `display: flex;` 값을 줘야 한다.

## 정렬 방향 결정

```css
.flexbox {
  display: flex;
  flex-direction: row;
  /* row | row-reverse | column | column-reverse */
}
```

가로 방향으로 정렬하고자 할 땐 `flex-direction: row;`, 세로 방향으로 정렬하고자 할 땐 `flex-direction: column;`으로 설정한다.

Flexbox를 사용하면 축(Axis)이 두 개 생긴다. `flex-direction`의 방향으로 **Main axis**가 생기고, Main axis와 수직 방향으로 **Cross axis**가 생긴다.

- `flex-direction: row;`: Main axis는 좌→우, Cross axis는 상→하
- `flex-direction: column;`: Main axis는 상→하, Cross axis는 좌→우
- `flex-direction: row-reverse;`: Main axis는 우→좌, Cross axis는 상→하
- `flex-direction: column-reverse;`: Main axis는 하→상, Cross axis는 좌→우

## 여러 줄 정렬 결정

```css
.flexbox {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /* nowrap | wrap */
}
```

`flex-wrap: nowrap`을 사용하면 자식의 사이즈를 줄여서라도 한 줄로 정렬한다.

## 정렬 방법

Main axis를 기준으로 정렬하고자 할 땐 `justify-content` 프로퍼티를, Cross axis를 기준으로 정렬하고자할 땐 `align-items`나 `align-content` 프로퍼티를 사용한다.

### `justify-content`의 값들

- `flex-start`: Main axis의 시작 지점
- `flex-end`: Main axis의 끝 지점
- `center`: 가운데 정렬
- `space-between`: 처음과 마지막에 요소를 배치하고 남은 공백을 균등하게 배치
- `space-around`: 각 요소 양 옆의 공백을 균등하게 배치

### `align-items`의 값들

- `flex-start`: Cross axis의 시작 지점
- `flex-end`: Cross axis의 끝 지점
- `center`: 가운데 정렬

### `align-content`

`align-content` 속성을 사용하려면 `flex-wrap: wrap;`이어야 한다.

`flex-wrap: wrap;` 속성을 사용해 배치된 요소들이 여러 줄일 때, Flex line이 줄의 개수만큼 늘어난다. `align-items` 속성을 사용하면 Flex line **마다**의 Cross axis를 기준으로 배치한다.

`align-content`는 부모 요소 전체를 기준으로 Cross axis를 하나로 보고 정렬한다. 따라서 `align-items`에선 사용할 수 없었던 `space-between`이나 `space-around` 사용이 가능하다.

## 정렬 순서 수정

Flexbox의 `order` 속성을 사용하면 마크업 된 순서와 상관 없이 순서를 바꿀 수 있다.

```css
.parent {
  display: flex;
}

.first-child {
  order: 2;
}

.second-child {
  order: 3;
}

.third-child {
  order: 1;
}

/* 브라우저엔 third - first - second 순으로 나타남 */
```
