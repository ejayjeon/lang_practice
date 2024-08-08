/** OOP 상 인터페이스 */

interface User {
  id: string;
  lv: number;
  hello(): string;
}

class UserClass implements User {
  id: string;
  lv: number;
  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  }

  hello(): string {
    return `${this.id} 님의 레벨은 ${this.lv}입니다.`;
  }
}

let user1: any = new UserClass('hello123', 30);
// type predicate
function instanceOfUser(object: any): object is User {
  return 'hello' in object;
}

if (instanceOfUser(user1)) {
  user1; // 여기서는 비로소 User 타입
};



// 다중 인터페이스 사용

interface IName {
  name: string;
}

interface IAge {
  age: number;
}

// 인터페이스를 implements 할 수 있는 갯수는 정해져 있지 않다.
class Person implements IName, IAge {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
};


// ** 중요 ** 인터페이스로 클래스의 constructor까지 다룰 수 있는 부분
// 제네릭 사용할 때 자주 사용하게 되는 구조

class Person2 {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// 이런 형태를 interface로 구현해버리고 싶다?
interface PersonConstructor {
  // 함수 선언할 때처럼 선언하지만 new 키워드를 붙여준다.
  new(name: string, age: number): Person2;
}

function createUser(constructor: PersonConstructor, name: string, age: number) {
  // return new Person2(name, age);
  // 위처럼 넣는 거랑 똑같다.
  return new constructor(name, age);
}

console.log(createUser(Person2, 'hello', 123));