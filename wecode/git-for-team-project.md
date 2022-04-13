# 팀 프로젝트를 위한 git

## git basic flow

1. 리모트 master 브랜치에서 git clone을 통해서 로컬로 다운 받는다.
2. 로컬에서 브랜치를 나눠 작업한다.
   1. git branch - git checkout 을 통해 만든 브랜치로 이동해 작업한다.
   2. 이후 작업한 내용을 git add 하고, commit 한 뒤 리모트로 push한다.
3. 이후 master 브랜치에 합쳐달라고 PR을 날린다.
4. master에 머지돼서 업데이트 되면, 리모트의 마스터 브랜치와 동기화한다.
   1. 로컬 마스터 브랜치로 이동한 뒤 git pull origin master를 입력한다.
5. 이후 업데이트 된 로컬 마스터에서 브랜치 새로 파고 같은 작업을 반복한다.

## 팀 프로젝트

초기 세팅은 한 명의 컴퓨터로 다 모여서 진행한다.

1. 프로젝트 생성
   1. CRA 커맨드 입력. `npx create-react-app 프로젝트명`
2. 파일 및 폴더 구조 정리
   1. 불필요 파일 삭제
   2. 주석 삭제
   3. 폴더 구조 나누기
   4. react-router-dom 및 sass 설치
   5. common.scss, reset.scss 파일 세팅
   6. router 파일 만들기 등.
3. 원격 저장소로 푸시
   1. .gitignore로 node_modules 폴더 추가(CRA로 프로젝트 생성한 경우 이미 추가되어 있음)
   2. 마스터 브랜치로 푸시함
4. 이후 팀원들이 git clone 후 `npm install`로 필요한 패키지를 설치함.
5. 그 다음에 각자 브랜치 생성해서 작업하기

## `git conflict`

> 나는 main 브랜치에서 작업하고 있고, 팀원은 list 브랜치에서 작업하고 있는 상황.
> 내가 마스터에 머지되기 전에 팀원이 작업한 내용이 먼저 머지가 됐다.

- 이때 같은 파일의 내용이 다른 경우 충돌(conflict)이 발생한다.
  - 가장 빈번한 충돌 장소가 라우터.
- 깃허브가 같은 위치에 다른 내용이 있다고 알려준다. 마스터에 병합시킬 때 문제가 있기 때문에 알려주는 것.
  - 깃허브에서 resolve conflicts 하지말 것. 오히려 복잡해질 수 있다.
  - 로컬 상황에서 푸시할 때 리모트의 현 상황과 똑같이 만들어주고 올려주면 된다.
  - `git pull origin master` - `git checkout feature/main` - `git merge master` 순으로 진행한다.
  - 위의 작업을 거치면 로컬에서 conflict가 발생한다. 충돌한 부분을 수정하고 add-commit-push 다시 해주면 완료.
    - 충돌한 부분을 수정할 때는 Current Change(내가 작업하던거), incoming change(깃허브 올라가 있던 거) 중에 선택하면 된다.
    - 선택하는 기준은 최신화라기보다는 병합하는 과정에서 어떤 방식으로 수정하면 될 지 선택하는 것.
    - `<<<<<<HEAD`, `========` 등 역시 텍스트이기 때문에, ctrl F 등으로 컨플릭트 난 부분을 찾아볼 수 있다.
  - 브랜치로 푸시하기 전 위 과정을 거치면 git conflict를 최소화할 수 있다. conflict가 나기 전에 미리 확인하고 처리해버리는 것.
