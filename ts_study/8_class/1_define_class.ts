/** 클래스 정의 */

// 1. 클래스 선언하기 --------------------------------
class Test { };


class Game {
  id: string;
  level: number;

  // 초기화 블록이 필요함, 그렇지 않으면 에러 발생
  constructor(id: string, level: number,) {
    this.id = id;
    this.level = level;
  }

  introduce(): string {
    return `${this.id}님의 레벨은 ${this.level}입니다.`;
  };
};

// 객체 생성
const user = new Game(
  'hello123', 30,
);

console.log(user.introduce());