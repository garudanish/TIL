# Vue Component

화면의 영역을 영역 별로 구분하여 코드로 관리하는 것이 컴포넌트라고 생각할 수 있다. 컴포넌트 기반으로 개발하는 핵심은 재사용성이다. 인스턴스를 생성하면 기본적으로 `Root` 컴포넌트가 된다.

## 전역 컴포넌트 등록 방법

`Vue.component(생성할_이름, 생성할_내용)`을 통해 전역 컴포넌트를 생성할 수 있다. 이후 루트 컴포넌트 안에 해당 컴포넌트를 작성하면 된다.

```html
<div id="app">
  <app-header></app-header>
  <app-content></app-content>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script>
  Vue.component("app-header", {
    template: "<h1>Header</h1>",
  });
  Vue.component("app-content", {
    template: "<div>content</div>",
  });

  const vm = new Vue({
    el: "#app",
  });
```

## 지역 컴포넌트 등록 방법

뷰 인스턴스를 생성할 때, `components` 키에 해당하는 값에 컴포넌트 이름을 키로, 내용을 값으로 하는 객체를 할당하면 지역 컴포넌트를 생성할 수 있다.

```html
<div id="app">
  <app-header></app-header>
  <app-content></app-content>
  <app-footer></app-footer>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script>
  // 전역 컴포넌트
  Vue.component("app-header", {
    template: "<h1>Header</h1>",
  });
  Vue.component("app-content", {
    template: "<div>content</div>",
  });

  const vm = new Vue({
    el: "#app",
    // 지역 컴포넌트
    components: {
      "app-footer": {
        template: "<footer>footer</footer>",
      },
    },
  });
</script>
```

## 전역 컴포넌트와 지역 컴포넌트의 차이점

지역 컴포넌트는 특정 컴포넌트 하단에 어떤 컴포넌트가 등록되었는지 알 수 있다. 따라서 서비스를 구현할 때는 대부분 지역 컴포넌트를 사용한다. `Vue.component`는 전역으로 사용해야 하는 플러그인, 라이브러리 등에만 사용한다.

만일 `#app2` 등의 div 태그와 뷰 인스턴스를 하나 더 만든 뒤 해당 태그 안에서 `<app-header>`와 `<app-footer>`를 작성한다면 전역 컴포넌트인 `<app-header>`는 렌더링되지만, 지역 컴포넌트인 `<app-footer>`는 렌더링 되지 않고 콘솔에 에러가 찍힌다.
