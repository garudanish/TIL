# 소프트웨어 테스팅

## Software Testing

### 테스팅은 무엇인가?

> 코드 -> 예측 결과 -> 테스트 -> 성공 or 실패(-> 수정 -> 예측 결과 -> 테스트 ...)

테스팅을 하는 이유는 두 가지 근본적 질문에서 나옴;

1. **제대로** 된 소프트웨어를 개발했는가? Did you build right product?
2. 소프트웨어를 **제대로** 개발했는가? Did you build product right?

### 왜 테스팅을 하는가?

결함 확인: 내가 짠 코드들이 다양한 방식의 테스트를 통해서, 수많은 경우의 수에서 어떠한 결함이 있을지 확인할 수 있음.

사전 방지: 고객이 불만족스러운 경험을 하는 것을 사전에 방지할 수 있음.

시간 절약: 다양한 유저 경험의 경우의 수를 자동으로 진행되는 테스팅을 통해 검증할 수 있음.

구조 개선: 테스트에 따라 코드 실행 속도가 느리다거나, 테스트 실패를 디버깅하기 위해 코드 자체에 대한 구조를 살펴보고 개선할 수 있음.

품질 개선: 테스트를 거치면서 서비스의 품질이 개선됨.

확장성: 기존에 테스트를 진행했다면, 새로운 코드를 추가한다고 하더라도 기존 테스트 코드를 통과해야 함. 만일 테스트를 진행하지 않았다면 기존 코드를 이해하면서 새로운 테스트 코드를 작성해야 할 것임.

## Manual Testing vs. Automation Testing

### Manual Testing

"단순 노가다." 사람이 직접 테스트의 주체가 되어서 다른 사람이 짜놓은 코드를 테스트하는 것임. 하지만 인간은 완벽하지 않음. 수기로 작업하다보면 다양한 휴먼 에러들이 발생할 것임.

즉, 불안정성이 증가하고, 인력 소모가 크고, 비용이 많이 들고, 테스트 속도가 느림.

### Automation Testing

"엔터 한 번으로 가능." 비용 감소, 반복성, 재사용성, 테스팅 자체를 프로그래밍할 수 있음, 품질 개선 등의 장점을 얻을 수 있음.

즉, 안정성이 확보되고, 인력 소모가 줄고, 비용이 적게 들고, 테스트 속도가 빠름. + 확장성이 좋아서 새 코드가 기존 코드에 덧붙여질 때도 테스트를 거치며 호환성 검증 가능!

## 시스템 테스트 전략 3가지

### End-to-End (E2E) Tests

전체적인 Flow를 검증하는 테스트.

FE-BE가 만나는 엔드포인트를 맞춰서 일련의 사이클을 돌려보는 것. 프로젝트를 하면서 은연 중에 E2E 테스트를 했을 것. '서버 열어주세요~'해서 들어가서 렌더링을 테스트했을 것임. UX적 관점에서 가능한지 테스트해본 것.

하지만 이 E2E 테스트는 너무 자주 실행되면 안됨. UX적 관점에서 제품 출시의 마지막에 이루어져야 하는 테스트이기 때문.

cypress 라이브러리를 통해 자동화된 E2E 테스트 가능함.

### Integration Tests 통합 테스트

모듈 간의 호환성을 검증하는 테스트.

Unit test가 로컬 환경에서 코드를 테스팅하는 것이라면, 통합 테스트는 코드가 작성할 수 있는 환경에서 테스팅을 하는 것임. 즉, 전체적으로 연계된 기능 테스트임.

대표적인 테스팅 툴로 포스트맨이 있음.

### Unit Tests 단위 테스트

독립적으로 진행되는 가장 작은 단위의 테스트.

독립적인 기능을 하는 함수 등이 진행되는 과정을 테스트하는 것. 원하는 input이 들어갔을 때 원하는 output이 나오는지. 독립된 테스트들에서 나올 수 있는 다양한 경우의 수를 다 따져 테스팅함. 예를 들어 로그인이라고 했을 때 오타가 발생하는 등. 그러한 일련의 경우의 수를 모두 테스팅함.

가장 작은 단위에서 진행하기 때문에, 에러가 발생하더라도 해결하기 쉬움. 즉, 1) 빠르게 문제를 파악할 수 있고, 2) 시간과 비용을 절감할 수 있고, 3) 안정적으로 리팩토링할 수 있고, 4) 코드에 대한 문서로 활용할 수 있음(테스트 코드만 보더라도 코드의 역할 파악 가능).

### 복잡도

테스팅의 복잡도는 단위 테스트 - 통합 테스트 - E2E 테스트 순으로 복잡해짐. 단위테스트가 잘 이루어져 있다면 복잡한 통합 테스트, E2E 테스트가 쉬워짐. 따라서, 단위 테스트 7: 통합 테스트 2: E2E 테스트 1 의 비율로 진행하는 게 이상적임.
