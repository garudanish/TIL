# Vue Template

뷰의 템플릿 문법이란 뷰로 화면을 조작하는 방법을 의미한다. 템플릿 문법은 크게 데이터 바인딩과 디렉티브로 나뉜다.

## 데이터 바인딩

데이터 바인딩은 뷰 인스턴스에서 정의한 속성들을 화면에 표시하는 방법으로, 콧수염 괄호 Mustache Tag`{{ message }}`를 사용하는 방식이 대표적이다.

어떠한 데이터의 값에 기반해 변경되는 값일 경우, `computed` 속성을 이용할 수 있다.

## 디렉티브

html 태그에서 일반적인 `id`, `class` 등의 표준 속성이 아닌, `v-`로 시작하는 속성들을 모두 뷰 디렉티브라고 한다. 어떠한 속성이 `v-`로 시작하면 뷰에서 인식하고 활용할 수 있게된다.

`v-bind`를 활용해 `v-bind:id`, `v-bind:class` 등을 작성하면 뷰 인스턴스의 데이터를 태그의 id, class 등으로 활용할 수 있다. 만일 뷰 인스턴스의 데이터에 `uuid`라는 속성이 있다면, `<p v-bind:id="uuid">...</p>` 등으로 사용 가능하다.

`v-if="..."`와 `v-else`를 활용해 특정 태그의 내용을 보여주고 안 보여주고를 설정할 수 있다. 이때, 단순히 안 보여주는 것이 아니라, 아예 DOM에서 삭제해버린다. DOM에는 남겨놓고 보이지만 않게 하려면 `v-show="..."`를 활용한다.

```html
<div id="app">
  <p v-bind:id="uuid" v-bind:class="name">{{ num }}</p>
  <p>{{ doubleNum }}</p>
  <div v-if="loading">Loading...</div>
  <div v-else>test user has been logged in</div>
  <div v-show="loading">Loading...</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script>
  new Vue({
    el: "#app",
    data: {
      num: 10,
      uuid: "abc1234",
      name: "text-blue",
      loading: true,
    },
    computed: {
      doubleNum: function () {
        return this.num * 2;
      },
    },
  });
</script>
```

`v-model`을 활용해 `input` 태그 등에서 입력 받은 값을 바인딩할 수 있다.

이벤트의 modifier 등을 활용하면 이벤트를 더욱 풍부하게 활용가능하다. 가령 `<input v-on:keyup.enter="logText">` 이라고 작성하면 엔터가 입력되었을 때만 해당 이벤트가 실행된다.

## `watch` 속성

`watch` 속성은 데이터에 따라서 특정 로직을 실행할 수 있는 속성이다.

```html
<div id="app">
  {{ num }}
  <button v-on:click="addNum">increase</button>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script>
  new Vue({
    el: "#app",
    data: {
      num: 10,
    },
    watch: {
      num: function () {
        this.logText();
      },
    },
    methods: {
      addNum: function () {
        this.num++;
      },
      logText: function () {
        console.log("changed");
      },
    },
  });
</script>
```

### `watch`와 `computed`의 차이점

`computed`는 값에 대한 계산, 특히 validation 분야에서 많이 쓰인다. `watch`는 http 요청(데이터 요청)과 같은 무거운 로직에 많이 쓰인다.

`watch`는 첫 인자로 바뀐 값, 두 번째 인자로 바뀌기 전의 값을 받는다.

공식문서는 `watch`보다는 `computed`가 좋으므로 간단한 값 계산 등의 사례라면 웬만하면 `computed`를 쓰라고 권장한다.

`<p v-bind:class="{ warning: isError }">Hello</p>` 의 문법을 사용해 불리언 값 `isError`에 따라 동적으로 클래스 이름을 변환시킬 수도 있지만, `computed` 속성에 `errorTextColor`를 추가하고, `<p v-bind:class="errorTextColor"></p>`로 연동하면 깔끔한 코드를 작성할 수 있다.
