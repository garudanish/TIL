# Dynamic Routes

지금까지 블로그 데이터로 인덱스 페이지를 채웠지만, 아직 개별 블로그 페이지를 만들진 않았다. 블로그 데이터에 의존한 페이지들의 URL들을 만들기 위해선 동적 라우트를 사용해야 한다.

이 레슨에선 다음과 같은 것을 배운다:

- `getStaticPaths`를 사용해 동적 라우트와 함께 정적으로 페이지 생성하기
- `getStaticProps`를 각 블로그 포스트의 데이터를 fetch하기 위해 쓰는 방법
- `remark`를 사용해 마크다운을 렌더링하는 방법
- 날짜 문자열을 원하는 형태로 출력(pretty-print)하는 방법
- 동적 라우트와 함께 페이지를 링크하는 방법
- 동적 라우트에 대한 유용한 정보

## Page Path Depends on External Data

이전의 레슨에서 우리는 페이지 컨텐츠가 외부 데이터에 의존할 경우를 다뤘다. 인덱스 페이지를 렌더링하기 위해 필요한 데이터를 fetch하기 위해 `getStaticProps`를 사용했다.

이번 레슨에서는 각 페이지 경로가 외부 데이터에 의존할 경우를 다룬다. Next.js는 외부 데이터에 의존한 경로의 페이지를 정적으로 생성할 수 있게 한다. 이는 Next.js에서 동적 URL을 활성화한다.

![page path depends on external data](https://nextjs.org/static/images/learn/dynamic-routes/page-path-external-data.png)

### How to Statically Generate Pages with Dynamic Routes

우리는 블로그 포스트의 동적 라우트를 만들고 싶다:

- 각 페이지는 `/posts/<id>`라는 경로를 가져야 한다. 이때 `<id>`는 최상위의 `posts` 디렉토리 안의 마크다운 파일의 이름이다.
- `ssg-ssr.md`, `pre-rendering.md`를 가지고 있기 때문에, 경로는 `/posts/ssg-ssr`, `/posts/pre-rendering`이 될 것이다.

### Overview of the Steps

다음의 과정으로 구현할 수 있다. **아직 이를 반영할 필요는 없다**. 다음 단락에서 할 것이다.

먼저, `[id].js`라는 페이지를 `pages/posts` 안에 생성한다. `[`로 시작하고 `]`로 끝나는 페이지는 Next.js에서 동적 라우트이다.

`pages/posts/[id].js`에서, 지금껏 만들었던 페이지들처럼 포스트 페이지를 렌더링하는 코드를 작성한다.

```jsx
import Layout from "../../components/layout";

export default function Post() {
  return <Layout>...</Layout>;
}
```

새로운 것은 이 페이지에서 `getStaticPaths`라는 async 함수를 익스포트할 것이라는 점이다. 이 함수에선 우리는 `id`가 **될 수 있는 값**의 배열을 리턴해야 한다.

```jsx
import Layout from "../../components/layout";

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}
```

마지막으로, 주어진 `id`를 가진 블로그 포스트의 데이터를 fetch하기 위한 `getStaticProps`를 구현한다. `getStaticProps`는 주어진 `params`인데, 이는 `id`를 포함한다.(왜냐하면 이 파일의 이름이 `[id].js`이기 때문이다.)

```jsx
import Layout from "../../components/layout";

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```
