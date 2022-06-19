# Create a Next.js App

지금까지, 우리가 만든 Next.js 앱은 하나의 페이지만을 가지고 있다. 웹사이트와 웹 애플리케이션은 보통 많은 페이지들을 갖고 있다.

어떻게 우리 애플리케이션에 더 많은 페이지들을 추가할 수 있는지 알아보자.

## What You’ll Learn in This Lesson

이 레슨에서 당신은 이런 것을 배울 것이다:

- 통합적인 파일 시스템 라우팅을 이용해 새 페이지를 만드는 법
- 링크 컴포넌트를 이용해 페이지 간 클라이언트 사이드 내비게이션 활성화하는 방법
- 코드 스플리팅과 사전 fetch에 대한 빌트인 지원

> Next.js 라우팅에 대한 자세한 문서를 찾고 있다면, [라우팅 문서](https://nextjs.org/docs/routing/introduction)를 살펴봐라.

## Pages in Next.js

Next.js에서, 페이지는 `pages` 디렉토리의 파일에서 내보내진 리액트 컴포넌트이다.

페이지들은 페이지의 파일명에 기반한 경로와 관련돼있다.. 예를 들어, 개발에서:

- `pages/index.js`는 `/` 경로와 관련돼있다.
- `pages/posts/first-post.js`는 `/post/first-post` 경로와 관련돼있다.

우리는 이미 `pages/index.js` 파일을 갖고 있으므로, `pages/posts/first-post.js`를 만들어 어떻게 작동되는지 확인하자.

## Creagte a New Page

`pages` 디렉토리 아래 `posts`를 만든다.

`first-post.js`를 `posts` 디렉토리 안에 다음과 같은 내용으로 생성한다.

```js
export default function FirstPost() {
  return <h1>First Post</h1>;
}
```

컴포넌트는 어떤 이름이나 가질 수 있지만, 반드시 `default`로 export 되어져야 한다.

이제, 개발 서버를 열고 [http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post)로 접근하면 다음과 같은 페이지를 볼 수 있다.

이것이 Next.js가 다른 페이지를 만드는 방법이다.

단순히 `pages` 디렉토리 아래에 자바스크립트 파일을 생성하면 파일의 경로가 URL 경로가 된다.

이 방식은 HTML 혹은 PHP 파일들로 웹사이트를 만드는 것과 비슷하다. HTML을 작성하는 것 대신에, JSX를 쓰고 리액트 컴포넌트를 사용하는 것이다.

새로 만들어진 페이지에 대한 링크를 추가해 홈페이지에서 해당 페이지로 이동할 수 있게 하자.

## Link Component

웹사이트에서 페이지들을 연결할 때, `<a>` HTML 태그를 사용한다.

Next.js에서는 `next/link`에서 `Link` 컴포넌트를 사용해 `<a>` 태그를 감싼다. `<Link>`는 당신에게 다른 페이지로의 클라이언트-사이드 내비게이션을 가능하게 해준다.

## Using `<Link>`

먼저, `pages/index.js`를 열고, 다음 줄을 추가함으로써 `next/link`에서 `Link` 컴포넌트를 임포트한다.

```js
import Link from "next/link";
```

그리고 다음 `h1` 태그를 찾는다.

```jsx
<h1 className="title">
  Learn <a href="https://nextjs.org">Next.js!</a>
</h1>
```

그리고 다음과 같이 수정한다.

```jsx
<h1 className="title">
  Read{" "}
  <Link href="/posts/first-post">
    <a>this page!</a>
  </Link>
</h1>
```

> `{" "}`는 텍스트를 여러 줄로 나눌 때 사용하며, 빈 공간을 추가한다.

다음으로, `pages/posts/first-post.js`를 열어 내용을 다음과 같이 바꾼다:

```jsx
import Link from "next/link";

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
```

확인할 수 있듯이, `Link` 컴포넌트는 `<a>` 태그의 사용법과 유사하지만, `<a href="...">`와 같이 적는 것 대신 `<Link href="...">`로 작성한 다음 `<a>` 태그를 그 안에 넣는다.

잘 작동하는지 확인해 보자. 당신은 각 페이지에 링크가 생겼을 것이며, 그것을 이용해 각 페이지로 이동할 수 있을 것이다.

## Client-Side Navigation

`Link` 컴포넌트는 한 Next.js 앱 안의 두 페이지 간 클라이언트 사이드 내비게이션을 가능하게 해준다.

클라이언트 사이드 내비게이션이란, 페이지 전환이 자바스크립트를 사용해 이뤄진다는 것을 뜻하며, 이는 브라우저에 의해 진행되는 기존 내비게이션보다 빠르다.

다음과 같은 방법으로 쉽게 확인할 수 있다:

- 브라우저의 개발자 도구를 사용해 `<html>` 태그의 `background` CSS 속성을 `yellow`로 바꾼다.
- 두 페이지의 링크를 번갈아 클릭한다.
- 노란색 배경이 페이지 전환 중에 유지되는 것을 확인할 수 있다.

이것은 브라우저가 모든 페이지(full page)를 로드하지 *않는다*는 것과, 클라이언트 사이드 내비게이션이 작동하는 것을 의미한다.

만일 `<Link href="...">` 대신 `<a href="...">`를 사용했다면, 배경색은 링크를 클릭했을 때 제거될 것이다. 이는 브라우저가 full refresh를 하기 때문이다.

## Code splitting and prefetching

Next.js는 코드 스플리팅을 자동으로 수행하며, 따라서 각 페이지는 그 페이지에서 필요한 것만을 로드한다. 이는 홈페이지에 렌더링될 때, 다른 페이지의 코드는 처음엔 제공되지 않는다는 뜻이다.

이는 페이지의 수가 얼마나 많든간에 홈페이지가 빠르게 로드된다.

요청하는 페이지의 코드만 로드한다는 것은 페이지들이 독립된다(isolated)는 것을 의미한다. 만일 어떤 페이지에 에러가 있다고 해도, 애플리케이션의 다른 페이지들은 계속 동작한다.

거기에, Next.js의 빌드 과정에서, 언제든 `Link` 컴포넌트가 브라우저의 뷰포트에 있다면, Next.js는 자동으로 백그라운드의 링크된 페이지의 코드들을 사전 fetch한다. 링크를 클릭하는 순간에, 목표 페이지의 코드들은 이미 백그라운드에 로드되어 있을 것이며, 페이지 전환은 순식간에 이뤄질 것이다.

## Summary

Next.js는 코드 스플리팅, 클라이언트 사이드 내비게이션, (운영 환경에서의) 사전 fetch 등의 방법들로 최고의 성능을 위해 자동으로 당신의 애플리케이션을 최적화한다.

당신은 `pages` 디렉토리 아래의 파일들과 빌트인 `Link` 컴포넌트를 사용함으로써 라우트를 생성한다. 다른 라우팅 라이브러리는 필요하지 않다.

[`next/link` API 레퍼런스](https://nextjs.org/docs/api-reference/next/link)에서 `Link` 컴포넌트에 대해 더 알 수 있으며, [routing documentation](https://nextjs.org/docs/routing/introduction)에서 라우팅에 대한 일반 정보를 알 수 있다.

> 참고: 만일 Next.js 앱 밖의 외부 페이지를 링크해야 한다면, `Link` 컴포넌트 없이 `<a>` 태그를 사용하면 된다.
>
> 만일 `className`과 같은 속성을 추가해야 한다면, `Link` 태그가 아니라 `a` 태그에 추가하면 된다. [예시를 참고하라](https://github.com/vercel/next-learn/blob/master/basics/snippets/link-classname-example.js).
