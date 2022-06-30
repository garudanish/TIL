# Pre-rendering and Data Fetching

우리는 블로그를 만들고 있지만, 지금까지는 블로그 컨텐츠를 추가하지 않았다. 이 레슨에서는 앱에 외부의 블로그 데이터를 fetch해오는 방법을 배운다. 블로그 컨텐츠는 파일 시스템에 저장되지만, 데이터베이스나 헤드리스 CMS와 같이 어느 곳에나 저장되있어도 된다.

## What You'll Learn in This Lesson

이 레슨에선 이런 것들을 배운다:

- Next.js의 프리-렌더링 기능
- 프리 렌더링의 두 가지 형태: 정적 생성과 서버사이드 렌더링
- 데이터가 있는 정적 생성과 없는 정적 생성
- `getStaticProps`를 활용해 인덱스 페이지 안에 외부 블로그 데이터를 임포트하는 방법
- `getStaticProps`에 대한 유용한 정보

## Pre-rendering

데이터 fetching에 대해 이야기 하기 전에, Next.js의 가장 중요한 컨셉트 중 하나인 프리 렌더링에 대해 다룬다.

기본적으로, Next.js는 모든 페이지를 프리 렌더링한다. 즉, Next.js는 클라이언트 사이드 자바스크립트가 HTML을 만드는 것 대신, _사전에 모든 페이지의 HTML을 만들어둔다_. 프리 렌더링은 성능과 SEO의 측면에서 더 나은 결과를 보인다.

각각의 생성된 HTML은 그 페이지에 필요한 최소한의 자바스크립트 코드들과 연관되어있다. 페이지가 브라우저에 의해 로드될 때, 그 페이지의 자바스크립트 코드는 실행되고 페이지를 완벽히 상호작용가능하게 만든다. (이 과정을 **hydration**이라 한다.)

### Check That Pre-rendering Is Happening

프리 렌더링이 일어나는지 다음의 단계를 통해 확인할 수 있다.

- 브라우저에서 자바스크립트를 비활성화시킨다
- 이 튜토리얼의 최종 결과물인 [이 페이지](https://next-learn-starter.vercel.app/)에 접속한다.

앱이 자바스크립트 없이 렌더링되는 것을 확인할 수 있다. 이는 Next.js가 정적 HTML로 프리렌더링했고, 자바스크립트를 실행하지 않고도 앱의 UI를 보여주기 때문이다.

> 참고: `localhost`에서도 위의 단계를 시도할 수 있지만, 자바스크립트를 비활성화했을 경우 CSS가 로드되지 않을 것이다.

만일 앱이 Next.js가 아닌 순수한 리액트 앱이었다면, 프리 렌더링 기능이 없어 자바스크립트를 비활성화 했을 때 앱을 볼 수 없었을 것이다. 예를 들어:

- 브라우저에서 자바스크립트를 활성화하고 [이 페이지](https://create-react-template.vercel.app/)에 접속한다. 이 페이지는 CRA를 통해 만들어진 순수한 리액트 앱이다.
- 자바스크립트를 비활성화하고 같은 페이지에 다시 접속한다
- 앱 대신, 이 앱을 실행시키기 위해선 자바스크립트를 활성화해야 한다는 문구를 확인할 수 있다.이는 앱이 정적 HTML로 프리 렌더링 되지 않기 때문이다.

### Summary: Pre-rendering vs No Pre-rendering

다음은 그래픽으로 표현된 요약이다:

![Pre-rendering using next.js](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)

- 첫 로드: 프리 렌더링된 HTML이 디스플레이된다.
- Hydration: 리액트 컴포넌트들이 초기화되고 앱이 상호작용 가능하게 된다.
  - 만일 앱에 `<Link />`와 같은 상호작용 가능한 컴포넌트를 갖고 있을 경우, 자바스크립트가 로드된 후에 사용할 수 있다.

![No Pre-rendering using plain react.js app](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)

- 첫 로드: 앱이 렌더링되지 않는다
- Hydration: 리액트 컴포넌트들이 초기화되고 앱이 상호작용 가능하게 된다.

## Two Forms of Pre-rendering

Next.js에는 두 가지 형태의 프리렌더링이 있다: 정적 생성성과 서버사이드 렌더링. 둘의 차이는 페이지의 HTML을 생성하는 시간에 있다.

- 정적 생성은 **빌드할 때** HTML을 생성한다. 프리 렌더링된 HTML은 각 요청 때마다 재사용된다.
- 서버사이드 렌더링은 각 요청 때마다 HTML을 생성한다.

> 개발 모드(`npm run dev`나 `yarn dev`를 실행한 경우)에선 모든 페이지는 각 요청마다 모든 페이지가 프리 렌더링된다. 정적 생성을 사용하는 페이지여도 마찬가지이다.

### Per-page Basis

중요한 것은, Next.js는 각 페이지마다 프리 렌더링의 형태를 선택할 수 있게 해준다는 것이다. 대부분의 페이지는 정적 생성을 사용하면서 어떤 페이지는 서버 사이드 렌더링을 사용하는 "하이브리드" Next.js 앱을 만들 수도 있다.

### When to Use Static Generation v.s. Server-side Rendering

데이터의 유무와 상관없이 가능하다면 정적 생성을 사용할 것을 추천하는데, 왜냐하면 페이지가 한 번만 빌드되고 CDN으로 제공될 수 있기 때문이다. 이는 모든 요청마다 서버가 페이지를 렌더링하는 것보다 훨씬 빠르다.

여러 종류의 페이지를 정적 생성을 통해 만들 수 있다, 예를 들어:

- 마케팅 페이지
- 블로그 포스트
- E 커머스 제품 리스트
- 도움과 문서

반드시 다음의 사항을 확인해야 한다: "유저의 요청 이전에 이 페이지를 프리 렌더링할 수 있는가?" 만일 답이 그렇다라면, 정적 생성을 선택해야 한다.

반면, 유저의 요청에 앞서서 페이지를 프리 렌더링할 수 없다면 정적 생성은 좋은 아이디어가 **아니다**. 아마 그 페이지는 자주 업데이트되는 데이터를 보여줄 것이고, 페이지의 내용은 모든 요청마다 바뀔 것이다.

그 경우, 서버 사이드 렌더링을 사용할 수 있다. 속도 면에서 느릴 수 있지만, 프리 렌더링된 페이지는 언제나 최신의 상태를 유지할 것이다. 아니면 프리 렌더링 없이 클라이언트 사이드 자바스크립트를 이용해 자주 업데이트 되는 데이터를 채울 수도 있다.

### We'll Focus on Static Generation

이 레슨에서는 정적 생성에 주목할 것이다. 다음 페이지에서는 데이터의 유무에 따른 정적 생성을 다룬다.

## Static Generation with and without Data

정적 생성은 데이터의 유무와 상관없이 실행될 수 있다.

지금까지 만든 모든 페이지는 외부 데이터를 fetch해올 필요가 없었다. 그 페이지들은 자동으로 앱이 빌드될 때 정적으로 생성된다.

하지만 몇 페이지들은 외부 데이터를 fetch하지 않고는 렌더링할 수 없을 것이다. 빌드할 때 파일 시스템에 접근하거나, 외부 API나 데이터베이스 쿼리를 fetch 해와야 할 것이다. Next.js는 이런 경우(데이터가 필요한 정적 생성)를 설정 없이 지원한다.

### Static Generation with Data using `getStaticProps`

Next.js에선 페이지 컴포넌트를 익스포트할 때 `getStaticProps`라는 `async` 함수 역시 익스포트할 수 있다. 이렇게 하면:

- `getStaticProps`는 빌드할 때 실행된다
- 함수 안에서, 외부 데이터를 fetch한 후 그 데이터를 페이지에 props로 전달한다.

```jsx
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

본질적으로, `getStaticProps`는 Next.js에게 다음과 같은 말을 전달한다: _"이 페이지는 데이터 의존성을 갖고 있어. 그러니까 빌드 시 이 페이지를 프리 렌더링할 때, 그 데이터들을 먼저 해결해야돼!"_

> 참고: 개발 모드에선 `getStaticProps`는 각 요청 때마다 실행된다.

### Let's Use `getStaticProps`

직접 하면서 배우는 것이 더 쉬우므로, 다음 페이지부터 블로그를 구현하기 위해 `getStaticProps`를 사용할 것이다.