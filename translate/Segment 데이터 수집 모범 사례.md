# 데이터 수집 모범 사례

> [Data Collection Best Practices](https://segment.com/docs/protocols/tracking-plan/best-practices/#formalize-your-naming-and-collection-standards)

Segment에서 어떤 이벤트를 추적할지를 파악하는 것이 막막하게 느껴질 수 있습니다. 다행히도, Segment는 이 과정을 통해 수천 명의 고객들을 도왔고, 시작하는데 도움이 되는 수많은 자원들을 축적했습니다. 여러분이 이제 막 시작하는 작은 팀이든 수많은 이해관계자들로 얽혀있는 복잡한 기업이든 관계없이, 이 자원들은 도움이 될 겁니다.

비록 이 자료가 도움이 되더라도, 데이터 추적 방법을 정의하는 데 시간을 투자해야 한다는 것을 잊지 마세요. 데이터 품질 개선을 위해 많이 투자할수록 엄청난 보상을 얻을 수 있습니다. 예를 들면, 분석 팀이 더 좋은 인사이트를 만든다든가, 마케팅 팀이 더 나은 캠페인을 실행하는 등의 보상을 말이죠.

## 데이터 추적 철학

추적(Tracking)하는 것은 학습하고 조치를 취하는 것입니다. 프로덕트나 고객에게서 알고 싶은 것에 대해 생각하세요. 검증되거나 버려져야 할 가정들에 대해 생각하세요. 모르는 것에 대해 생각하세요. 다음 질문들은 시작하는데 도움을 줍니다:

- 어떤 종류의 이벤트나 데이터가 고객의 제품 사용 방식을 알려주나요?
- 사람들이 프로덕트를 어떻게 발견하고, 결제하고, 사용을 시작하나요?
- 고객 여정에서 가장 중요한 단계는 무엇인가요?

## 비즈니스 목표 정의하기

Segment는 고수준 비즈니스 목표(high-level business objectives)를 문서화할 것을 권장합니다. 어떤 측정 가능한 비즈니스 성과를 달성하고 싶으신가요? 신규 고객을 확보하기? 신규 가입을 활성화하기? 현재 고객 기반에서 점진적인 매출을 증대시키기? 조직에서 데이터를 사용할 이해관계자를 인터뷰하면 이 질문들에 대한 최고의 답을 얻을 수 있습니다.

비즈니스 목표를 문서화했다면, 사용자의 액션을 그 비즈니스 목표들에 매핑시켜야 합니다. 예를 들어, 목표 중 하나가 신규 가입을 활성화 하는 것이라면, 가입과 관련된 행동들에 대해 생각해봐야 합니다. 스스로에게 사람들이 가입하기 전에 무엇을 하는지 물어보세요. 어떤 행동으로 사용자 가입을 예측할 수 있을까요?

예를 들어, 다음과 같은 리스트로 마무리 지을 수 있습니다:

- 광고 캠페인 클릭됨
- 링크 클릭됨
- 아티클 클릭됨
- 캠페인 열림
- Form 초기화됨
- Form 제출됨
- 사용자 가입됨

이는 추적할 전체 사용자 액션의 일부에 불과할 수 있지만, 비즈니스 목표에 초점을 맞추면 데이터 수집을 더 쉽게 관리할 수 있습니다.

## 이름 및 수집 기준 형식화

문서화된 비즈니스 목표와 함께, 추적할 것을 결정할 때 사용할 기준들을 만들 때입니다. Segment의 가장 성공한 고객들은 추적 계획을 맥락(context)을 제공하는 풍부한 속성(properties)들을 가진 최소한의 핵심 이벤트로 제한합니다. 어떤 고객들이 데이터 추적을 “less is more” 철학에 입각해 성공하는 반면, 다른 고객들은 좀 더 여유롭게 “많이 추적하고 나중에 분석하기” 방식으로 접근합니다. 두 방식 모두 장단점이 있으므로, 회사의 요구 사항을 고려할 때 신경써야 합니다.

접근 방식과 관계 없이, 다음 팁들을 염두에 두세요:

- **표기법을 정하세요.** Segment는 이벤트 명에는 *Title Case*를, 속성 명에는 *snake_case*를 권장합니다. 표기법을 정하고 모든 이벤트와 속성 명에 강제해야 합니다.
- [**이벤트 명 구조를 정하세요.**](https://segment.com/docs/connections/spec/semantic/) Segment Specs에서 확인할 수 있듯이, Segment는 이벤트 명에 대상(object, `Blog Post`)과 액션(`Read`)을 사용합니다. 컨벤션을 정하고 그것을 유지하세요.
- **이벤트 명을 동적으로 짓지 마세요.** 이벤트 명에 동적인 값을 넣어 이벤트를 만드는 일을 피하세요. 예시: `User Signed Up (2023/02/08)`)
- **속성을 추적하는 이벤트를 만들지 마세요.** 속성일 수 있는 값을 이벤트 이름에 넣지 마세요. 대신 그 값들을 속성에 추가하세요. 예시: `"blog_post_title": "Best Tracking Plans Ever"`
- 속성 키를 동적으로 짓지 마세요. `"feature_1": "true"`, `"feature_2": "false"` 같은 속성 명을 짓지 마세요. 이런 속성들은 모호하고 분석하기 힘듭니다.

![An image comparing good and bad naming and collection standards](https://segment.com/docs/protocols/images/asset_nVdJ3ZyA.png)

## 추적 계획 세우기

[추적 계획](https://segment.com/blog/what-is-a-tracking-plan/)은 1) 어떤 이벤트를 추적할지, 2) 코드 베이스 중 어디에 그 이벤트가 있는지, 3) 왜 그 이벤트들이 비즈니스 관점에서 필요한지 등을 명확하게 해줍니다. 프로토콜 이전에는 추적 계획은 일반적으로 스프레드시트에 있었습니다. 추적 계획은 의사 결정의 근거가 되는 데이터를 중심으로 모든 조직을 조정하는 프로젝트 관리 도구로 사용되었습니다. 추적 계획은 마케터, 프로덕트 매니저, 엔지니어, 분석가들이 같은 정보를 공유할 수 있도록 도와줍니다.

추적 계획은 조직이 자체 데이터 노력을 되찾는데 매우 중요한 역할을 해왔기 때문에, Segment는 수년간의 제품 개발에 투자하여 [프로토콜](https://segment.com/docs/protocols/)을 만들었습니다. 어떤 추적 계획을 세우든, 데이터 수집 노력에 대해 신뢰할 수 있는 단일 소스를 나타내는지 확인해야 합니다.

## 유저 식별하기

Identify 호출은 유저의 모든 기록을 일련의 특성으로 업데이트하기 때문에 중요합니다. 하지만 어떤 특성을 포함할지 어떻게 선택해야 할까요?

다음은 [analytics.js](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/)를 사용해 Segment로 Identify 호출을 하는 예시입니다.

```js
analytics.identify({
  name: "Kanye West",
  email: "kanye@iamawesome.com",
  login: "kanyew",
  type: "user",
  created: "2016-11-07T16:40:52.238Z",
});
```

특성은 그룹화하거나 피벗할 수 있는 데이터의 차원을 나타냅니다. 예를 들어, 위의 예시 호출에서, 선택한 기간 내에 생성된 `user` 또는 계정인 모든 타입(type)의 코호트를 쉽게 만들 수 있습니다. (`type === 'user' || type === 'account'`)

## 추적 이벤트 정의

이벤트 이름 및 수집 규칙을 문서화했다면, 추적 계획에 이벤트를 추가할 차례입니다. Segment는 비즈니스 목표 중 하나와 바로 묶이는 적은 양의 이벤트로 시작하는 것을 권장합니다. 이렇게 집중적으로 노력하면 추적할 수 있는 액션이 끝없이 늘어나는 상황을 피할 수 있습니다. 익숙해지면 주변 질문에 답할 수 있는 이벤트들을 추적 계획에 추가할 수 있습니다.

Segment를 예시로 들죠. Segment는 다음의 이벤트들을 추적함으로써 시작합니다:

- **유저 가입됨**
- **소스 데이터 보내짐**
- **구독 시작됨**

그 다음, Segment는 성능을 추적하는데 도움이 되는 몇 가지 주변 이벤트들을 추가합니다:

- **유저 초대됨**; 유저가 조직에 많은 사람들을 초대한다는 것은 유저가 제품 사용에 진지하게 참여하고 있다는 좋은 지표입니다. 이 지표는 조직의 성장을 측정하는 데 도움이 됩니다.
- **대상(Destination) 활성화됨**; 대상을 설정하는 것은 Segment 고객의 핵심 가치 동인(key value driver)입니다.
- **디버거 호출 확장됨**; 특정 유저가 자주 라이브 이벤트 스트림 기능을 사용하는 것을 확인하면 Segment는 그 유저에게 연락해 디버깅을 도울 수 있습니다.

하지만 이커머스 회사에게 메인 이벤트는 다음과 같을 것입니다:

- 계정 생성됨
- 제품 추가됨
- 주문 완료됨

Segment는 [ecommerce spec](https://segment.com/docs/connections/spec/ecommerce/v2/)이라고 불리는, 이커머스를 위해 특별히 예약해둔 이벤트 명을 갖고 있습니다. Segment가 다루는 이벤트와 다운스트림 대상에서 어떻게 사용되는지 확인하세요.

반면 커뮤니티의 경우 다음 목록의 전혀 다른 행동들이 참여를 나타냅니다. 예를들어, [GrowthHackers](https://growthhackers.com/)같은 커뮤니티는 다음과 같은 액션들을 추적할 수 있습니다:

- 컨텐츠 조회됨
- 컨텐츠 공유됨
- 댓글 제출됨
- 컨텐츠 생성됨
- 컨텐츠 큐레이트됨

이 이벤트들로, 참여를 중심으로 한 핵심 지표를 측정하고 유저가 궁극적인 전환 이벤트인 ‘다른 사람을 위한 큐레이션 컨텐츠’로 어떻게 이동하고 있는지 파악할 수 있습니다. 자세한 내용은 GrowthHackers가 추적하는 이벤트와 그 이유를 담은 [이 글](https://segment.com/blog/growthhackers-community-metrics/)을 확인하세요.

## 추적 이벤트 속성 정의하기

각 Track 호출은 원하는 정보를 키-값 쌍으로 담은 `properties` 객체를 선택적으로 받을 수 있습니다. 이 `properties`들은 최종 도구에서 이벤트를 그룹화, 필터링, 분석할 수 있는 차원(dimensions) 역할을 합니다. `properties`는 광범위한 이벤트에 추가적인 정보를 제공합니다.

앞서 적었듯, 이벤트는 일반적이고 고수준이어야 하고, 속성은 구체적이고 세부적이어야 합니다. 예를 들어, Segment에서, `Business Tier Workspace Created`는 이벤트 명으로 알맞지 않습니다. 대신, Segment는 `Workspace Created`를 이벤트명으로 사용하면서 `account_tier`라는 키에 `business`라는 값을 할당해 `property`로 사용합니다.

```js
analytics.track("Workspace Created", {
  account_tier: "business",
});
```

Identify 호출에서의 특성과 유사하게, properties는 분석 도구에서 피벗하거나 필터링할 수 있는 컬럼을 제공하거나, 이메일 도구에서 유저 코호트를 만드는데 도움을 줍니다.

동적으로 생성된 `key`를 `properties` 객체 안에 넣는 것을 피하세요. 그렇지 않으면 다운스트림 툴에서 각각의 `key`가 새 컬럼을 만들게 됩니다. 동적으로 생성된 `key`는 데이터를 흩트려 놓아서 사용하기 어렵고 혼란스럽게 합니다.

다음은 Segment가 `Lead Captured` Track 호출을 하는 예시입니다:

```js
analytics.track(userId, "Lead Captured", {
  email: "email",
  location: "header navbar",
  url: "https://segment.com/",
});
```

고수준 이벤트는 **Lead Captured**이며 모든 상세 정보는 `properties` 객체 안에 있습니다. 다운스트림 툴에서, Segment는 Segment 웹 사이트의 여러 위치에서 얼마나 많은 리드가 캡처되었는지 쉽게 볼 수 있습니다.

다운스트림 툴에서 properties를 사용하는 방법에 대해 자세히 알고 싶으면 [The Anatomy of a Track Call](https://segment.com/academy/collecting-data/the-anatomy-of-a-track-call/) 글을 참고하세요.
