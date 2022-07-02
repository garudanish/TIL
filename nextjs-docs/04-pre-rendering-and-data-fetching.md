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

## Blog Data

파일 시스템을 이용해 블로그 데이터를 추가한다, 각 블로그 포스트는 마크다운 파일이 될 것이다.

- `posts`라는 최상위 디렉토리를 만든다(이 디렉토리는 `pages/posts`와는 다르다).
- `posts` 안에 두 파일을 생성한다: `pre-rendering.md`와 `ssg-ssr.md`

`posts/pre-rendering.md`의 내용을 다음과 같이 붙여넣기 한다:

```markdown
---
title: "Two Forms of Pre-rendering"
date: "2020-01-01"
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
```

그리고, `posts/ssg-ssr.md`의 내ㅐ용을 다음과 같이 붙여넣기 한다:

```markdown
---
title: "When to Use Static Generation v.s. Server-side Rendering"
date: "2020-01-02"
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.
```

> 각 마크다운 파일은 `title`과 `date`라는 메타데이터 섹션을 상위에 갖고 있다. 이는 YAM Front Matter라는 것으로, gray-matter라는 라이브러리를 사용해 파싱할 수 있게 한다.

### Parsing the Blog Data on getStaticProps

인덱스 페이지를 이 데이터를 이용해 업데이트하자. 우리는 앞으로 다음과 같은 일을 할 것이다:

- 각 마크다운 파일을 파싱하고 `title`, `date`, 파일 이름(포스트 URL의 `id`로 쓰인다)을 가진다
- 인덱스 페이지에서 데이터를 목록화하고, 날짜에 따라 정렬한다.

이를 프리 렌더링하기 위해 `getStaticProps`를 구현해야 한다.

## Implement getStaticProps

먼저, 마크다운 파일에서 메타데이터를 파싱할 수 있게 해주는 gray-matter을 설치한다.

```shell
npm install gray-matter
```

이후, 우리는 파일 시스템에서 데이터를 fetch 해오는 단순한 라이브러리를 만들 것이다.

- 최상위에 `lib`라는 디렉토리를 만든다
- `lib` 디렉토리 안에 다음과 같은 내용의 `posts.js` 파일을 생성한다.

```js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
```

> 참고: Next.js에선 `lib` 폴더는 `pages` 폴더와 같이 할당된 이름이 아니므로, 어떤 이름으로 지어도 상관 없다. 관습 상 `lib` 이나 `utils`로 짓는다.

이제, 우리는 `getSortedPoostsData`를 임포트해야 하고, 그것을 `pages/index.js`의 `getStaticProps` 안에 호출해야 한다.

`pages/index.js`를 열고 `Home` 컴포넌트를 익스포트하기 전에 다음과 같은 코트를 추가한다.

```jsx
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
```

`getStaticProops`의 `props` 객체에서 `allPostData`를 리턴함으로써, 블로그 포스트는 `Home` 컴포넌트에 prop으로 전달된다. 이제 블로그 포스트를 다음과 같이 접근할 수 있다:

```jsx
export default function Home ({ allPostsData }) { ... }
```

블로그 포스트를 디스플레이하기 위해서, `Home` 컴포넌트에 자기 소개를 내용으로 한 섹션 아래에 `<section>` 태그를 추가한다. props를 `()`에서 `({ allPostsData })`로 수정해야 한다.

```jsx
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
```

[http://localhost:3000](http://localhost:3000)에 접근하면 블로그 데이터를 확인할 수 있다.

축하한다! 우리는 성공적으로 파일 시스템으로부터 외부 데이터를 fetch했고, 그 데이터를 인덱스 페이지에 프리 렌더링했다.

## getStaticProps Details

`getStaticProps`에 대해 알아야할 정보들을 다룬다.

### Fetch External API or Query Database

`lib/posts.js`에서 파일 시스템에서 데이터를 fetch해오는 `getSortedPostsData`를 구현했다. 하지만 외부 API 엔드포인트와 같은 다른 소스에서 데이터를 fetch해올 수도 있는데, 그때는 다음과 같이 하면 된다:

```js
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch("..");
  return res.json();
}
```

> 참고: Next.js는 `fetch()`를 클라이언트와 서버 둘 다에서 폴리필하므로 임포트할 필요가 없다.

데이터베이스에서 바로 쿼리문을 사용할 수도 있다:

```js
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}

```

이는 `getStaticProps`가 서버사이드에서만 실행 가능하기 때문이다. 클라이언트 사이드에서는 실행되지 않는다. 브라우저를 위한 자바스크립트 번들에는 포함되지 않는다. 이는 쿼리문을 브라우저에 전달하지 않고 직접 데이터베이스에 전달되도록 코드를 작성할 수 있다는 뜻이다.

### Development vs. Production

- 개발(`npm run dev` 혹은 `yarn dev`) 단계에선 `getStaticProps`는 각 요청마다 실행된다.
- 배포(Production) 단계에선 `getStaticProps`는 빌드할 때 실행된다. 하지만, 이는 `getStaticProps`에서 리턴되는 `fallback` 키를 사용해 상향될 수 있다.

빌드할 때 실행되기 때문에, 쿼리 파라미터 혹은 HTTP 헤더 같이 요청할 때만 사용할 수 있는 데이터는 사용할 수 없다.

### Only Allowed in a Page

`getStaticProps`는 페이지로부터만 익스포트될 수 있다. 페이지가 아닌 파일에서는 익스포트할 수 없다.

이 제한의 이유는 리액트는 페이지가 렌더링되기 이전에 필요한 모든 데이터를 가져야하기 때문이다.

### What If I Need to Fetch Data at Request Time?

정적 생성은 유저의 요청 이전에 어떤 페이지를 프리 렌더링해야 한다면 좋은 방안이 아니다. 그 페이지는 아마 자주 업데이트되는 데이터를 보여주어야 할 것이고, 페이지의 내용은 각 요청 때마다 바뀌어야 할 것이다.

이럴 때, 서버 사이드 렌더링을 사용하거나 프리 렌더링을 사용하지 않을 수 있다. 다음 레슨으로 넘어가기 전에 이러한 방식에 대해 다룰 것이다.

## Fetching Data at Request Time

만일 빌드할 때가 아니라 요청할 때 데이터를 fetch해야 한다면, 서버 사이드 렌더링을 사용할 수 있다.

서버 사이드 렌더링을 사용하기 위해서는 `getServersideProps`를 `getStaticProps` 대신 익스포트 해야 한다.

### Using `getServerSideProps`

다음은 `getServerSideProps`의 기본 코드이다. 우리가 만드는 블로그에서는 필요하지 않기 때문에 구현하지 않을 것이다.

```jsx
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

`getServerSideProps`는 요청할 때 실행되므로, 파라미터(`context`)는 특정한 파라미터 요청을 포함해야 한다.

`getServerSideProps`는 요청할 때 데이터가 fetch되어야 하는 페이지를 프리 렌더링할 때에만 쓰여야 한다. 모든 요청의 결과를 서버에서 계산해야 하므로, 첫 바이트를 받는 시간(Time to first byte, TTFB)이 `getStaticProps`보다 느리고, 그 결과 역시 추가적인 설정 없이는 CDN에 의해 캐싱되지 않는다.

### Client-side Rendering

데이터를 프리 렌더링해야할 필요가 없다면 클라이언트 사이드 렌더링이라는 다음의 전략을 사용할 수도 있다.

- 외부 데이터가 필요하지 않은 페이지의 부분을 정적으로 생성(프리 렌더링)한다
- 페이지가 로드되면 자바스크립트를 사용해 클라이언트로부터 외부 데이터를 fetch해오고, 남은 부분을 채운다.

![client-side rendering](https://nextjs.org/static/images/learn/data-fetching/client-side-rendering.png)

이 접근은 유저 대시보드 페이지 등의 예시에서 잘 작동할 것이다. 대시보드는 사적이고, 유저가 특정되는 페이지고, SEO와 관련 없고, 페이지가 프리 렌더링될 필요가 없기 때문이다. 데이터는 자주 업데이트 되고, 그 데이터는 요청할 때 데이터를 fetch해야 한다.

### SWR

Next.js 팀은 SWR이라는 데이터 fetch를 위한 리액트 훅을 만들었다. 만일 클라이언트 사이드에서 데이터를 fetch해야 한다면 이 훅을 사용하는 것을 강력히 추천한다. 이 훅은 캐싱, 재검증(revalidation), 포커스 트래킹, 반복 재fetch 등을 다룬다. 자세한 건 다루지 않지만 다음과 같이 사용할 수 있다:

```jsx
import useSWR from "swr";

function Profile() {
  const { data, error } = useSWR("/api/user", fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

자세한 정보는 [SWR 문서](https://swr.vercel.app/ko)를 확인하라.
