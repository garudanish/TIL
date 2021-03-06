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

## Implement getStaticPaths

먼저, 파일을 설치한다.

- `pages/posts` 디렉토리 안에 `[id].js` 파일을 생성한다.
- `pages/posts` 디렉토리 안의 `first-post.js` 파일을 **삭제한다.** 더 이상 이 파일은 사용하지 않는다.

이후 에디터에서 `pages/posts/[id].js`를 열어 다음의 코드를 붙여넣기 한다. `...`은 이후에 채울 것이다.

```jsx
import Layout from "../../components/layout";

export default function Post() {
  return <Layout>...</Layout>;
}
```

그리고 `lib/posts.js`를 열어 다음의 `getAllPostIds` 함수를 아랫 부분에 추가한다. 이 함수는 `posts` 디렉토리 안의 파일 이름(`.md`를 뗀다)들의 리스트를 리턴할 것이다.

```jsx
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}
```

**중요**: 리턴된 리스트는 문자열로 이루어진 배열이 아니다. 각주처럼 객체로 이루어진 배열**이어야만** 한다. 각 객체는 반드시 `params` 키를 가져야 하며, `id` 키를 가진 객체를 포함해야 한다(파일 이름에서 `[id]`를 사용할 것이기 때문이다). 그렇지 않으면 `getStaticPaths`는 실패할 것이다.

마지막으로, `getAllPostIds` 함수를 임포트하고 `getStaticPaths` 안에서 사용한다. `pages/posts/[id].js`를 열어 다음의 코드를 익스포튿되는 `Post` 컴포넌트 위에 붙여넣기 한다.

```jsx
import { getAllPostIds } from "../../lib/posts";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
```

- `paths`는 `getAllPostIds()`에 의해 리턴된 알려진 경로들의 배열을 포함한다. 이는 `pages/posts/[id].js`에 의해 정의된 파라미터를 포함하는 것이다.
- 지금 단계에선 `fallback: false`는 무시하라. 이후에 다시 설명한다.

거의 다 했지만, `getStaticProps`를 마저 구현해야 한다.

## Implement getStaticProps

주어진 `id`의 포스트를 렌더링 하기 위해 필요한 데이터를 fetch해야 한다.

그렇게 하기 위해, `lib/posts.js`를 열어 밑에 다음의 `getPostData` 함수를 추가한다. 이 함수는 `id`에 기반판 포스트 데이터를 리턴한다.

```jsx
export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
```

그리고 `pages/posts/[id].js`를 열어 다음의 라인을 찾는다:

```jsx
import { getAllPostIds } from "../../lib/posts";
```

그리고 다음의 내용으로 바꾼다:

```jsx
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
```

포스트 페이지는 이제 `getStaticProps`에서 `getPostData` 함수를 사용해 포스트 데이터를 얻은 뒤 props로 리턴한다.

이제, `postData`를 이용해 `Post` 컴포넌트를 업데이트 한다. `pages/posts/[id].js`에서 익스포트되는 `Post` 컴포넌트를 다음의 내용으로 수정한다.

```jsx
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}
```

다 됐다! 다음의 페이지들에 접속해보자:

- [http://localhost:3000/posts/ssg-ssr](http://localhost:3000/posts/ssg-ssr)
- [http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering)

좋다! 우리는 성공적으로 동적 라우트를 생성했다.

### Something Wrong?

에러가 발생했다면 다음의 파일들이 올바른 코드를 갖고 있는지 확인한다:

- `pages/posts/[id].js`는 [이 파일](https://github.com/vercel/next-learn/blob/master/basics/dynamic-routes-step-1/pages/posts/%5Bid%5D.js)과 같아야 한다.
- `lib/posts.js`는 [이 파일](https://github.com/vercel/next-learn/blob/master/basics/dynamic-routes-step-1/lib/posts.js)과 같아야 한다.
- (여전히 작동하지 않는다면) 다른 코드들은 [이 파일들](https://github.com/vercel/next-learn/tree/master/basics/dynamic-routes-step-1)과 같아야 한다.

만일 여전히 문제가 있다면, GitHub Discussioons의 커뮤니티에 물어볼 수 있다. 깃허브에 작성한 코드를 푸시하고 다른 사람이 볼 수 있도록 링크를 걸어두면 도움이 될 것이다.

### Summary

지금까지 한 것의 그래픽 요약은 다음과 같다:

![how to statically generate pages with dynamic routes](https://nextjs.org/static/images/learn/dynamic-routes/how-to-dynamic-routes.png)

## Render Markdown

마크다운 컨텐츠를 렌더링하기 위해 `remark` 라이브러리를 사용할 것이다. 먼저, 설치한다:

```shell
npm install remark remark-html
```

그리고, `lib/posts.js`를 열어 다음과 같이 파일 상단에 임포트를 추가한다:

```jsx
import { remark } from "remark";
import html from "remark-html";
```

그리고 같은 파일에서 `remark`를 활용해 `getPostData()` 함수를 업데이트한다:

```jsx
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
```

> 중요: 우리는 `getPostData`에 `async` 라는 키워드를 넣었는데, 우리는 `remark`를 사용하기 위해서 `await`을 사용해야 하기 때문이다. `async`/`await`은 데이터를 비동기적으로 fetch할 수 있게 한다.

이는 `pages/posts/[id].js`의 `getStaticProps`에서 `getPostData`를 호출할 때 `await`을 사용하도록 업데이트 해야 한다는 뜻이다:

```jsx
export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);
  // ...
}
```

마지막으로, `dangerouslySetInnerHTML`을 사용해 `contentHTML`을 렌더링하도록 `pages/posts/[id].js`에서 `Page` 컴포넌트를 수정한다.

```jsx
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
```

이후 페이지들에 다시 접속해 보라:

- [http://localhost:3000/posts/ssg-ssr](http://localhost:3000/posts/ssg-ssr)
- [http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering)

블로그 컨텐츠를 확인할 수 있을 것이다.

## Polishing the Post Page

### Adding title to the Post Page

`pages/posts/[id].js`에서 포스트 데이터를 이용하는 `title` 태그를 추가하자. 파일 상위에 `next/head`를 임포트하고 `Post` 컴포넌트에 `title` 태그를 추가한다:

```jsx
// Add this import
import Head from "next/head";

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Add this <Head> tag */}
      <Head>
        <title>{postData.title}</title>
      </Head>

      {/* Keep the existing code here */}
    </Layout>
  );
}
```

### Formatting the Date

날짜를 포매팅하기 위해, `date-fns` 라이브러리를 사용한다. 먼저, 설치한다:

```shell
npm install date-fns
```

다음으로, `components/date.js` 파일을 생성해 다음과 같은 내용에 `Date` 컴포넌트를 추가한다.

```jsx
import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
```

이제, `pages/posts/[id].js`를 열어 파일의 제일 위에 `Date` 컴포넌트를 임포트하고 `{postData.date}`로 사용한다:

```jsx
// Add this import
import Date from "../../components/date";

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Keep the existing code here */}

      {/* Replace {postData.date} with this */}
      <Date dateString={postData.date} />

      {/* Keep the existing code here */}
    </Layout>
  );
}
```

[http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering)에 접속하면 “January 1, 2020”라고 쓰인 날짜를 볼 수 있을 것이다.

### Adding CSS

마지막으로 이전에 사용했던 `styles/utils.module.css`를 이용해 CSS를 추가해보자. `pages/posts/[id].js`를 열어 CSS 파일을 임포트하고, `Post` 컴포넌트를 아래와 같은 내용으로 수정한다:

```jsx
// Add this import at the top of the file
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
```

[http://localhost:3000/posts/pre-rendering](http://localhost:3000/posts/pre-rendering)에 접속하면 더 나아진 페이지를 볼 수 있을 것이다.

## Polishing the Index Page

다음으로, 인덱스 페이지(`pages/index.js`)를 업데이트해보자. `Link` 컴포넌트를 사용해 각 포스트 페이지들의 링크를 추가해야 한다.

`pages/index.js`를 열어 `Link`와 `Date`를 파일의 상단에 임포트한다.

```jsx
import Link from "next/link";
import Date from "../components/date";
```

그리고, 같은 파일의 `Home` 컴포넌트의 아래쪽에 `li` 태그를 다음과 같은 내용으로 바꾼다:

```jsx
<li className={utilStyles.listItem} key={id}>
  <Link href={`/posts/${id}`}>
    <a>{title}</a>
  </Link>
  <br />
  <small className={utilStyles.lightText}>
    <Date dateString={date} />
  </small>
</li>
```

[http://localhost:3000](http://localhost:3000)에 가보면 페이지에 각 글의 링크가 있다.

## Dynamic Routes Details

동적 라우트에 대해 알아야 할 필수적인 정보들을 다룬다.

### Fetch External API or Query Database

`getStaticProps` 처럼 `getStaticPaths`도 어느 데이터 소스로부터나 데이터를 fetch할 수 있다. 이 예시에선 `getStaticPaths`에서 사용한 `getAllPostIds`가 외부 API 엔드포인트에서 fetch해올 수 있을 것이다.

```jsx
export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch("..");
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}
```

### Development vs. Production

- 개발 단계에선(`npm run dev` 혹은 `yarn dev`), `getStaticPaths`는 모든 요청에서 실행된다.
- 프로덕션 단계에선 `getStaticPaths`는 빌드할 때 실행된다.

### Fallback

`getStaticPaths`에서 `fallback: false`를 리턴했음을 상기하라. 이것이 의미하는 바는 무엇일까?

`fallback`이 `false`이면, `getStaticPaths`에서 리턴되지 않는 경로는 404 페이지로 연결된다.

`fallback`이 `true`이면 `getStaticProps`는 달라진다:

- `getStaticPaths`에서 리턴되는 경로는 빌드할 때 렌더된다.
- 빌드할 때 생성되지 않은 경로는 404 페이지로 연결되지 **않는다**. 대신, Next.js는 이러한 페이지의 첫 요청에서 페이지의 "대체(fallback)" 버전을 제공한다.
- 뒤에선, Next.js는 요청받은 경로를 정적으로 생성한다. 동일한 경로로 후속 요청에는 빌드할 때 프리 렌더링된 다른 페이지들 처럼 생성된 페이지를 제공한다.

`fallback`이 `blocking`이면, 새로운 경로는 `getStaticProps`로 서버사이드 렌더링되고, 이는 이후의 요청을 위해 캐싱되어 경로당 한 번만 일어난다.

이것이 이 레슨의 스코프 바깥의 일로, `fallback: true`나 `fallback: "blocking"`에 대해서 더 알고 싶으면 `fallback` 문서를 참고하라.

### Catch-all Routes

동적 라우트는 브라켓 안에 점 세 개(`...`)를 추가함으로써 모든 경로를 캐치하도록 확장될 수 있다. 예를 들어:

- `pages/posts/[...id].js`는 `/posts/a`와 `/posts/b`, `/posts/a/b/c` 등에 일치한다.

이렇게 하면, 반드시 `getStaticPaths`에서 `id` 키의 값을 다음과 같이 배열로 리턴해야 한다.

```jsx
eturn [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c'],
    },
  },
  //...
];
```

`getStaticProps`의 `params.id`는 배열이 된다:

```jsx
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```

### Router

Next.js 라우터의 접근하고 싶다면 `next/router`에서 `useRouter` 훅을 임포트해서 할 수 있다.

### 404 Pages

커스텀 404 페이지를 만들기 위해 `pages/404.js`를 생성한다. 이 파일은 빌드할 때 정적으로 생성된다.

```jsx
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}
```
