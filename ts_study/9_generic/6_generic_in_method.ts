/** 메소드에서 제네릭 사용하기 */

class User<T> {
  id: T;

  constructor(id: T) {
    this.id = id;
  }

  // logTime을 찍는 메소드
  logTime<T>(logTime: T) {
    return `${this.id}의 ${logTime} `;
  }
}

const user = new User('user123');

console.log(user.logTime(new Date()));


// 클래스의 제네릭과 메소드의 제네릭이 동시에 선언이 되면, 메소드 안에서는 메소드의 제네릭을 쫓아간다.

class DupGeneric<T> {
  hello<T>(logTime: T) {
    console.log(`현재 시간은 ${logTime} 입니다`);
  }
};

const temp = new DupGeneric<string>();
temp.hello<Date>(new Date());