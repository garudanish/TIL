# Bootstrap

> 김버그의 HTML&CSS는 재밌다

Grid System을 굉장히 쉽게 CSS로 구현할 수 있도록 도와주는 CSS Framework가 Bootstrap이다.

## 사용 방법

[getbootstrap.com](http://getbootstrap.com)에서 CSS 링크를 복사해 임포트하면 된다.

`div class="container"` 안에 원하는 줄만큼 `div class="row"`를 만든다.

`row` 한 줄은 12칸이며, 요소가 몇 칸을 차지할 지는 `col-1`, `col-2`, ..., `col-12`의 클래스로 구분할 수 있다. 만일 한 줄에 만든 `col-xx`의 합이 12칸을 넘어가면 두 줄로 넘쳐 흐르게 된다.

`col-xx` 안에 원하는 마크업을 하면 된다.

```html
<body>
  <div class="container">
    <div class="row">
      <div class="col-1">
        <p>col-1</p>
      </div>
      <div class="col-11">
        <p>col-11</p>
      </div>
    </div>
  </div>
</body>
```

Bootstrap은 `container`의 Break Point를 자체적으로 지정해 놓았기 때문에 반응형 디자인이 기본적으로 적용되어있다.

## 반응형으로 마크업하기

`col-xx`의 클래스를 `col-12 col-sm-6 col-md-4 col-lg-3` 식으로 브레이크 포인트마다 차지하는 크기를 조정할 수 있다.

```html
<body>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4">
        <p>column</p>
      </div>
      <div class="col-12 col-sm-6 col-md-4">
        <p>column</p>
      </div>
    </div>
  </div>
</body>
```
