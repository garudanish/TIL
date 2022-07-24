# Deploying Your Next.js App

마지막 기초 레슨에서는 프로덕션을 위해 Next.js 앱을 배포할 것이다.

Next.js를 Vercel에 배포하는 방법을 배울 것이다. Vercel은 Next.js의 개발자들로부터 만들어진 플랫폼이다. 그외의 다룬 배포 옵션들도 다룰 것이다.

이 레슨에서는 다음과 같은 것을 배운다:

- Vercel에 Next.js 앱을 배포하는 방법
- DPS 워크플로우: Develop, Preview, and Ship
- 그외의 호스트 제공 업체에 Next.js 앱을 배포하는 방법

## Push to GitHub

배포하기 전에, 지금까지 만들었던 Next.js 앱을 GitHub에 푸시한다. 이는 배포를 더 쉽게 만들어 준다.

- 개인 깃허브 계정에 `nextjs-blog` 저장소를 생성한다
- 저장소는 공개할 수도 있고 비공개 할 수도 있다. README나 다른 파일들로 저장소를 초기화해서는 **안 된다**
- 저장소 세팅에 도움이 필요하다면 [이 가이드 문서](https://help.github.com/en/github/getting-started-with-github/create-a-repo)를 확인하라.

그리고:

- 만일 로컬 Next.js 앱에 깃 저장소를 초기화하지 않았다면 초기화한다.
- Next.js 앱을 깃허브 저장소에 푸시한다.

깃허브에 푸시하기 위해, 다음의 커맨드를 실행한다 (`<username>`을 깃허브 유저 네임으로 바꾼다):

```shell
git remote add origin https://github.com/<username>/nextjs-blog.git
git push -u origin main
```

## Deploy to Vercel

Next.js를 프로덕션으로 가장 쉽게 배포하는 방법은 Next.js를 만든 사람들이 개발한 Vercel 플랫폼을 사용하는 것이다.

Vercel은 정적 페이지를 위한 서버리스 플랫폼이며, 헤드리스한 콘텐트, 커머스, 데이터베이스를 통합해 빌드해주는 하이브리드 애플리케이션이다. Next.js는 프론트엔드 팀이 개발하고, 미리 보고, 유저 경험(UX)을 향상시키는 것을 쉽게 하였으며, 그러면서도 성능은 놓지지 않았다. 이를 비용 지불 없이 무료로 시작할 수 있다.

### Create a Vercel Account

먼저, [https://vercel.com/signup](https://vercel.com/signup)에 가서 Vercel 계정을 생성한다. **Continue with GitHub**를 선택해 가입 과정을 계속한다.

### Import your `nextjs-blog` repsitory

가입하면, `nextjs-blog` 계정을 Vercel에 임포트한다. `https://vercel.com/import/git`에서 할 수 있다.

- Vercel for Github을 설치해야 한다. 모든 저장소에 대해 접근을 허용할 수 있다.
- Vercel을 설치한 후 `nextjs-blog`를 임포트 한다.

다음의 세팅에 *기본 값*을 사용할 수 있고, 바꿔야만 하는 것은 없다. Vercel은 자동으로 Next.js 앱임을 파악하고 최적의 빌드 세팅을 선택한다.

- 프로젝트 이름
- 최상위 디렉토리
- 빌드 커맨드
- 아웃풋 디렉토리
- 개발(Development) 커맨드

배포를 하면 Next.js 앱은 빌드를 시작한다. 이는 몇 분 안에 끝난다.

이를 마치면 배포 URL들을 얻을 수 있다. URL 중 하나를 클릭하면 Next.js 시작 페이지를 볼 수 있다.

## Next.js and Vercel

Vercel은 Next.js의 제작자가 만들었으며, Next.js를 퍼스트 클래스로 지원한다. Next.js 앱을 Vercel에 디플로이하면 다음의 일들이 기본적으로 발생한다:

- 정적 생성과 애셋(JS, CSS, 이미지, 폰드 등)을 사용하는 페이지는 자동으로 Vercel 엣지 네트워크에 제공되며, 이는 매우 빠르다.
- 서버사이드 렌더링과 API 라우트를 사용하는 페이지는 자동으로 서버리스 함수에서 분리된다. 이는 페이지 렌더링과 API 요청의 확장을 허용한다.

Vercel은 더 많은 기능이 있다. 예를 들면:

- 커스텀 도메인: Vercel에 배포되고 나면, Next.js 앱에 커스텀 도메인을 붙일 수 있다.
- 환경 변수: Vercel에 환경 변수를 세팅할 수 있다. 세팅한 환경변수를 Next.js 앱에서 활용할 수 있다.
- 자동 HTTPS: HTTPS가 기본값으로 활성화되며, 추가적인 설명을 필요로 하지 않는다. SSL 인증을 자동으로 갱신한다.

### Preview Deployment for Every Push

Vercel에 배포한 후에, 가능하다면 다음을 시도할 수 있다:

- app에 새 브랜치를 생성한다
- 몇 가지를 수정한 뒤 GitHub에 푸시한다.
- 새 풀 리퀘스트를 작성한다.

풀 리퀘스트 페이지에 자동으로 `vercel` 봇이 코멘트를 남긴 것을 볼 수 있을 것이다.

해당 코멘트의 프리뷰 URL을 클릭해 보라. 수정 사항들을 볼 수 있다.

풀 리퀘스트를 작성하면, Vercel은 자동으로 그 브랜치의 모든 푸시에 대해 배포 프리뷰를 생성한다. 프리뷰 URL은 언제나 최신의 배포 프리뷰를 가리킨다.

콜라보레이터에게 프리뷰 URL을 공유하고 즉각적인 피드백을 받을 수 있을 것이다.

배포 브리뷰가 마음에 들면 `main`으로 머지한다. 이렇게 하면 Vercel은 자동으로 프로덕션 배포를 생성한다.

### Develop, Preview, Ship

이러한 워크플로우를 DPS라고 부른다: 개발(Develop), 프리뷰(Preview), 반영(Ship)

- 개발: Next.js에 코드를 작성하고 NEXT.JS 개발 서버를 활용해 최신 기능의 이점을 사용한다.
- 프리뷰: GitHub의 브랜치에 수정사항을 푸시하고, Vercel이 URL을 통해 확인할 수 있는 프리뷰 배포를 생성한다. 프리뷰 URL을 다른 사람에게 공유해 피드백을 받을 수 있다. 코드 리뷰를 하는 것과 더블어, 배포 프리뷰를 할 수 있다.
- 반영: 풀 리퀘스트를 `main`에 머지함으로써 프로덕션에 반영한다.

Next.js 앱을 개발할 때 이러한 워크플로우를 사용할 것을 추천한다.
