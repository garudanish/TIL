# Git Workflow & Rebase

## 학습목표

1. Git flow가 어떤 방식으로 운영되는지 알고, main, develop, feature, release, hotfix 브랜치를 각각 구분하여 설명할 수 있다.
2. branch를 병합하는 방식 두 가지: rebase와 merge를 구분할 수 있다.
3. Rebase 명령어를 상용하여 불필요한 커밋을 하나로 squash할 수 있다.

## Git Flow

기존까지의 방식: main, master에서 feature 브랜치로 파서 작업을 했음.

현업의 방식: 단순히 main과 feature만으로는 작업하기 어려움. 아예 `git flow init` 이라는 명령어가 있음.

- 따라서 `develop` 이라는 브랜치를 사용함. 실제 main 브랜치에 배포하기 이전에 확인하는 브랜치를 한 단계 더 추가하는 것.
- develop 브랜치는 main 브랜치로 부터 만들어짐.
- 각각의 feature 브랜치는 develop 브랜치로부터 만들어진 뒤 각각의 브랜치에서 작업을 함.
- 이후 어떤 feature 브랜치가 develop 브랜치에 병합될 경우, 해당 병합된 것은 다른 feature 작업 브랜치에도 병합 되어야 함.
  - 이 때, develop 브랜치에 병합됐다고 하더라도 바로 main 브랜치에서 배포되는 것이 아니라, `release` 브랜치에서 테스트를 거친 뒤 배포됨.
  - 만일, 테스트 중 버그가 발생한다면 `release` 브랜치 내에서 바로 bugfix 진행함.
  - 이 때 작업된 bugfix 들은 develop, 병합되지 않은 feature 브랜치들에도 반영되어야 함.
  - bugfix가 완료되면 main에 배포하게됨.
- 배포가 된 이후에 심각한 에러가 발생했을 경우, main에서 `hotfix` 브랜치를 파서 바로 수정한 다음에 적용을 시키게 됨.
  - 해당 핫픽스 내용도 develop, feature브랜치에 적용되어야 함!

## Git rebase

merge, rebase는 둘 다 한 브랜치의 내용을 다른 브랜치에 병합시키는 데 사용하지만, 두 가지 명령어는 다르게 동작한다.

rebase 역시 merge와 마찬가지로, 로컬의 master 브랜치에서 pull origin 을 받은 뒤에 진행한다.

### merge의 경우

메인 브랜치에 병합된 경우, 기존 작업 브랜치의 커밋 내역 + 머지 커밋이 남게 된다. 이때, 다른 브랜치에서 메인 브랜치를 merge하면, 다른 브랜치임에도 커밋을 한 시간 별로 커밋 기록이 쌓이게 된다. 이 과정이 계속되면 main 브랜치에 머지 커밋이 굉장히 많아지고, 다른 브랜치에서 작업한 커밋 내역들이 마구잡이로 섞인다.

### rebase의 경우

불필요한 merge 커밋이 남지 않고, 같은 작업을 진행한 커밋끼리 모이게 됨. 작업한 커밋을 추적하기가 쉬워짐.

rebase는 머지처럼 커밋을 따오는 것이 아님! 해당 브랜치의 커밋 시작점(base)을 바꿔(re-)버리는 것임!

### conflict

rebase는 동일한 커밋을 새로 만드는 거기 때문에, rebase의 경우 만들었던 커밋 만큼 conflict가 날 수도 있음! (merge는 마지막 커밋만 비교하면 됐음)

이를 막기 위해 커밋이 쌓일 때쯤(3-4개 정도) rebase를 미리미리 진행하는 게 좋은 방법임.

충돌이 났을 경우 해결하는 방법:

1. 충돌을 해결한다(코드 수정)
2. `git add .` 진행. 단, commit은 하지 않는다.
3. `git rebase --continue` 진행.
4. 멈춰있던 rebase가 진행된다.
5. rebase 실행 이전으로 돌아가고 싶으면 `git rebase --abort`를 사용하면 된다.

### squash

1. 새로운 작업을 마치고 push하기 전엔 main을 병합해야 한다. `git rebase -i main`을 사용하여 진행한다.

2. rebase하는 동안 squash를 진행할 때는:

   1. 가장 오래된 commit(남길 커밋)을 pick한다.
   2. 다른 커밋 메세지는 가장 오래된 commit을 기준으로 squash한다.

   - 이때 녹아드는 커밋의 작업 내역이 없어지는 것이 아니다!

3. 이러면 수정용 에디터가 하나 더 나온다: 최종적으로 rebase된 커밋의 내용을 작성하는 부분.
   1. 현재까지 적은 커밋 메세지가 전부 나타나는데, 불필요한 내용을 제거하고, 현재 수정 내역에 대한 커밋 메시지를 저장한다.
4. rebase 이후 push 하면 에러 발생!
   1. rebase는 commit history를 바꾸므로, 로컬과 github 상의 커밋 히스토리가 달라지게 된다. 따라서 에러가 발생한다.
   2. 따라서 `git push origin feature/login -f` 을 통해 강제 푸시를 한다.
