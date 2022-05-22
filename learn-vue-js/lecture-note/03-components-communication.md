# Vue Components Communication

뷰 컴포넌트는 기본적으로 고유한 데이터 유효 범위를 가진다. 즉, 각각의 컴포넌트는 각각의 데이터를 가진다. 컴포넌트 간에 데이터를 주고 받기 위해선 props를 내려주거나, 이벤트를 올려줘야만 한다. 만일 이러한 규칙이 없다면, 데이터의 흐름이 복잡해지고 오류가 발생했을 때 발생 위치를 추적하기 어려워진다.

## Props

props를 받을 하위 컴포넌트에서 `v-bind:프롭스_이름="상위_컴포넌트_데이터_이름"` 속성을 추가하여 props를 내려줄 수 있다. 하위 컴포넌트에 `props: ["프롭스_이름"]` 속성을 추가함으로써 사용할 수 있다.

```html
<div id="app">
  <app-header v-bind:propsdata="message"></app-header>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script>
  const appHeader = {
    template: "<h1>{{ propsdata }}</h1>",
    props: ["propsdata"],
  };

  new Vue({
    el: "#app",
    components: {
      "app-header": appHeader,
    },
    data: {
      message: "hi",
    },
  });
</script>
```

## Event Emit

`v-on:click="이벤트_이름"` 문법을 써서 click 이벤트가 발생했을 때의 메서드를 설정할 수 있다. 이후 `methods` 속성에 이벤트 이름에 해당하는 메서드를 `this.$emit` API를 사용해 정의함으로써 사용할 수 있다.

이후 HTML 단에서 `v-on:하위_컴포넌트_이벤트_이름="상위_컴포넌트_메서드_이름"` 을 추가하여 event emit을 활용할 수 있다.

```html
<div id="app">
  <app-header v-on:pass="logText"></app-header>
  <app-content v-on:increase="increaseNumber"></app-content>
  <div>{{num}}</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script>
  const appHeader = {
    template: "<button v-on:click='passEvent'>click me</button>",
    methods: {
      passEvent: function () {
        this.$emit("pass");
      },
    },
  };

  const appContent = {
    template: '<button v-on:click="addNumber">add</button>',
    methods: {
      addNumber: function () {
        this.$emit("increase");
      },
    },
  };

  new Vue({
    el: "#app",
    components: {
      "app-header": appHeader,
      "app-content": appContent,
    },
    methods: {
      logText: function () {
        console.log("hi");
      },
      increaseNumber: function () {
        this.num++;
      },
    },
    data: {
      num: 10,
    },
  });
</script>
```

뷰 인스턴스를 생성하며 `data` 속성에 선언한 값들은 뷰 인스턴스의 속성이 되어, `this.data.num`이 아니라 `this.num`으로 접근할 수 있다.

## 같은 컴포넌트 레벨 간의 통신 방법 구현

`this.$emit()`의 두 번째 인자를 입력하면 `payload`에 담아 상위 컴포넌트로 전달할 수 있다. 이때 상위 컴포넌트에서 실행될 이벤트의 인자로 암묵적으로 입력된다.

이렇게 이벤트를 통해 변경시킨 `data`를 props로 형제 컴포넌트로 전달하면 된다.

```html
<div id="app">
  <app-header v-bind:propsdata="num"></app-header>
  <app-content v-on:pass="deliverNum"></app-content>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script>
  const appHeader = {
    template: "<div>header</div>",
    props: ["propsdata"],
  };

  const appContent = {
    template: "<div>content<button v-on:click='passNum'>pass</button></div>",
    methods: {
      passNum: function () {
        this.$emit("pass", 10);
      },
    },
  };

  new Vue({
    el: "#app",
    components: {
      "app-header": appHeader,
      "app-content": appContent,
    },
    data: {
      num: 0,
    },
    methods: {
      deliverNum: function (value) {
        this.num = value;
      },
    },
  });
</script>
```
