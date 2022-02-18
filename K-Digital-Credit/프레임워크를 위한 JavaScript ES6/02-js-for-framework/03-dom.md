# DOM

> 프레임워크를 위한 JavaScript ES6

요소에 접근하는 방법은 무엇을 기준으로 접근하는지에 따라 여러가지가 있다.

## `getElementById()`

id 값을 기준으로 DOM 객체에 접근하는 방법.
해당 아이디를 가진 HTML 요소를 가져온다.

- `var var1 = document.getElementById("root");`

## HTML 태그의 속성 조작하기

```js
var link = document.getElementById("link");
link.getAttribute("href");
link.setAttribute("href", "https://edu.goorm.io");
```

`getAttribute("속성명")` 으로 속성의 값을 가져올 수 있고, `setAttribute("속성명", "값")`으로 속성에 새로운 값을 지정할 수 있다.
