# Blended Common Test

> ## Installation

```
git clone https://github.com/MrKamake/blended-CodingTest-Common.git
cd blended-CodingTest-Common
npm install
npm test
```

> ### 문제 이해

- 기존에 있는 state에서 변경하기 원하는 값을 찾아서 변경하는 함수를 만드는 것으로 이해했습니다. state의 객체 내의 값이 반복적으로 객체로 이루어져있기 때문에, 변경하기 원하는 값의 형태는 state를 추적하기 위해서 객체의 반복 형태로 이루어져있습니다.

> ### 문제 접근

- 변경하려는 state의 값을 추적하기 위해서 키 값들을 차례로 알아야 했습니다. 반복적인 동작을 통해서 객체 속으로 깊어져가며 거쳐간 키값들을 저장해서 state를 추적하고 값을 변경해줘야 합니다. 저는 재귀함수를 사용해서 문제에 접근했습니다.

> ### 풀이 과정

- test코드를 자세히 확인하면서 각 tset마다 기존의 state가 배열, 객체, 숫자인지에 따라서 변경할 객체의 내용이 달라지는 것을 확인했습니다. 그래서 변경하려는 값의 타입을 먼저 확인했습니다. 배열, 객체, 숫자, undefined에 따라서 각각 조건을 만들었습니다. 배열일때는 push, unshift, splice의 메소드를 구현하도록 생성했습니다. 숫자일때는 함수를 리턴하도록 생성했습니다. 객체일때는 재귀함수를 이용해서 추적할 키값들을 알아냈습니다. 변경할 값으로 기존의 state와 같은 경로의 새로운 객체를 생성하고 rest parameter로 두 객체를 객체 리터럴을 생성해서 병합해서 답을 도출했습니다. 변경할 값이 undefined일때를 테스트로 추가해서 바로 기존의 state를 반환하도록 구현했습니다.
