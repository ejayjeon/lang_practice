/** 프로퍼티 초기화 */

class Game {
  // 1. 선언과 초기화 동시에 함
  id: string = 'hello123';
  // 2. Optional 값 선언
  lv?: number;
  // 3. type of undefined 선언
  server: string | undefined;

  // 4. 생성자로 초기화
  constructor(id: string, lv?: number) {
    this.id = id;
    this.lv = lv;
  };
}


// 일반적으로는 이런 경우를 많이 씀 - 생성자에서 초기화하기보다, init() 함수를 실행하고 그 안에서 생성자를 초기화하는 방법

class RouteStack {
  // ! - 초기화 보장
  stack!: string[];

  constructor() {
    // 초기화할 때 무조건 실행: ts는 함수 내에서 초기화가 진행되는지 안되는지는 알 수 없기 때문에 !를 써서 무조건 초기화가 된다고 보장한다
    this.initialize();
  }

  // 함수 안에서 진행
  initialize() {
    console.log(`${this.stack}을 초기화합니다.`);
    this.stack = [];
    console.log(`${this.stack} 이 실행되었습니다.`);
  };
};

const route = new RouteStack();
console.log(route);
