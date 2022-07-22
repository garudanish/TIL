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
