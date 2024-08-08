/** Class Readonly property*/

// const 같은 의미. readonly property를 만드는 것
class Game {
  readonly id: string;
  lv: number;

  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  };
}

const user = new Game('hello123', 123);


// 읽기 전용 속성이므로 'id'에 할당할 수 없습니다.ts(2540)
// user.id = 'hello567';
