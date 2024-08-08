// 1. 클래스 선언
// 3. 함수를 데코레이터로 달아줌
// - parameter로 데코레이터를 작성하면, 해당 데코레이터가 작성된 클래스를 함수 내부에서 받아볼 수 있다.
// - 작성한 밑에서부터 실행됨
@Test
@Frozen
@LogTest('Prod')
@ChangeClass
class User {
  id: string;
  lv: number;

  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  }
}

// 2. 함수 선언
// - parameter로 함수를 하나 받음
// - 이 함수를 Class의 Decorator로 사용
function Test(constructor: Function) {
  console.log(constructor);
}

// 사용하는 곳
function Frozen(constructor: Function) {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}

const user1 = new User('user1', 10);
// 타입이 얼려있는지(!) 찍어보기
console.log(Object.isFrozen(Object.getPrototypeOf(user1))); // true



// 데코레이터 팩토리: 데코레이터 함수가 실행될 때 파라미터를 넘겨주고 싶을 때
function LogTest(env: string) {
  return function (constructor: Function) {
    console.log(`[${env}] ${constructor}가 실행되었습니다.`);
  }
}


// 데코레이터는 언제 실행될까?
// 처음 클래스가 읽힐 때 딱 한 번 실행되고 그 이후 객체화 할 때는 다시 실행되지 않는다.
console.log('--------------------------------------------------------');
const user2 = new User('user2', 50);
console.log(user2);

// 데코레이터 클래스 변경
// T 타입의 constructor는 어디에서든 인스턴스화를 할 수 있는 컨스트럭터
function ChangeClass<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    server = 'main'; // 컨스트럭터로 받는 쪽에 server 라는 값을 추가

    constructor(...params: any[]) {
      super(...params);

      console.log('constructor init !!!');
    }
  }
}