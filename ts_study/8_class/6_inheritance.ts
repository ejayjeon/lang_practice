/** 상속 */

class Parent {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  hello() {
    return `${this.name}이 인사합니다.`;
  };
};

class Child extends Parent {
  age: number;

  constructor(name: string, age: number) {
    super(name);
    this.age = age;
  }

  intro() {
    return `나는 ${this.age}살 입니다.`;
  }
}

const p1 = new Parent('또앙');
const c1 = new Child('또앙', 12);

p1.hello();
c1.intro();

let parent: Parent;
// 두 타입 모두 받을 수 있는 이유는, Parent가 클래스이면서 부모 타입이기 때문에
parent = p1;
parent = c1;


/** 자식 타입으로 객체를 생성하면, 부모타입의 변수를 받을 수 없다. 
 * 하지만 다른 언어에서는 안되는 경우라도, 타입만 보는 Ts 에서는 가능한 부분이 있다.
 * OOP의 개념이 아니고 구조적 타입이라고해서 구조가 비슷하면 같은 타입이라고 유추하기 때문에
*/

// optional property

class Parent2 {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
};



class Child2 extends Parent2 {
  // Optional Property
  age?: number;

  constructor(name: string, age?: number) {
    super(name);
    this.age = age;
  }
}

const p2 = new Parent('랄라');
const c2 = new Child2('룰루', 12);

let child: Child2;
child = p2; // optional로 했기 때문에 Child2 = Parent2 같은 구조로 본다