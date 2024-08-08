/** 클래스의 정의 자체가 값이 될 수도 있고 ts의 타입이 될 수도 있다*/

class User {
  id: string;
  lv: number;

  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
    // this.initialize();
  }
  // initialize() {
  //   this.id = '';
  //   this.lv = 0;
  // }
}

// let user: User -> 클래스이자 타입
let user = new User('hello123', 30);

// 시그니처만 맞으면 클래스를 객체로 만들 수도 있다
user = {
  id: 'hello456',
  lv: 50,
};

