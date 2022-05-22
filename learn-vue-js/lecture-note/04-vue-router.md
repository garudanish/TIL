# Vue Router

Vue 2를 지원하는 라우터 버전은 Vue Router 3로, [vue-router 깃허브 저장소](https://github.com/vuejs/vue-router/releases)에서 최신 버전을 확인할 수 있고, CDN을 사용해 설치할 경우 `vue-router@3.5.4`와 같이 3 버전임을 꼭 명기하여야 한다.

뷰 인스턴스에 `router` 속성으로 뷰 라우터를 연결할 수 있다. 뷰 라우터를 `new VueRouter` 로 생성한 뒤 변수에 담아 연결하면 된다.

라우터 인스턴스에 `routes` 속성에 페이지 라우팅 정보를 배열로 작성한다. 이 배열은 `path` 속성과 `component` 속성을 가진 객체를 요소로 갖는데, `path`는 url, `component`는 해당 url로 이동했을 때 렌더링할 컴포넌트이다.

이후 루트 태그 안에 `<router-view>` 태그를 작성하면 라우터가 동작하는 것을 확인할 수 있다.

```html
<div id="app">
  <router-view></router-view>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router@3.5.4/dist/vue-router.js"></script>

<script>
  const LoginComponent = {
    template: "<div>login</div>",
  };

  const MainComponent = {
    template: "<div>main</div>",
  };

  const router = new VueRouter({
    // 페이지의 라우팅 정보
    routes: [
      {
        // 페이지의 url
        path: "/login",
        // 해당 url에서 표시될 컴포넌트
        component: LoginComponent,
      },
      {
        path: "/main",
        component: MainComponent,
      },
    ],
  });

  new Vue({
    el: "#app",
    router: router,
  });
</script>
```

## Router link

화면에서 라우터의 링크를 제공하기 위해서 사용하는 것이 `router-link`이다. `<router-link to="/login">Login</router-link>` 의 형태로 사용한다.
