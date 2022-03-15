# Media Query

> 김버그의 HTML&CSS는 재밌다

미디어 쿼리는 반응형 웹을 만들기 위해 반드시 알아야 하는 CSS 선언 중 하나.

## 반응형 웹

웹 브라우저를 데스크탑 뿐 아니라 모바일, 태블릿 등에서 여러 사이즈의 디바이스를 사용한다. 미디어 쿼리는 사용자가 접속한 브라우저의 사이즈에 맞게 보여주기 위해서 사용한다.

반응형 웹을 사용하기 위해선 HTML에서 `viewport meta` 태그가 선언되어야 하고, CSS에선 `media query`가 선언되어야 한다.

### `viewport meta`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    ...
  </head>
  ...
</html>
```

### `media query`

```CSS
@media screen and (min-width: 768px) {
  ...
}
```

위 선언은 768px 이상의 사이즈일 때 블록 안의 스타일을 적용하게 한다.

```css
.box {
  width: 100%;
  height: 100vh;
  background-color: #ff4949;
}

.box::after {
  content: "Mobile";
}

@media screen and (min-width: 576px) {
  .box {
    background-color: #ff5216;
  }

  .box::after {
    content: "Landscpae Phone";
  }
}

@media screen and (min-width: 768px) {
  .box {
    background-color: #ffc82c;
  }

  .box::after {
    content: "Tablet";
  }
}
```

스크린의 가로 사이즈(576px 미만, 576px 이상 - 768px 미만, 768px 이상)에 따라 `.box`의 배경 색과 내용이 달라지게 된다.

미디어쿼리는 모바일부터, 제일 작은 화면부터 선언하는 것이 정석이다.
