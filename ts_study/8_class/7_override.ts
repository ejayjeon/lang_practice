/** Override */
// Override 규칙


class Parent {
  hello(name: string): string {
    return `안녕 ${name} - 부모`;
  }
};

class Child extends Parent {

  /**'Child' 형식의 'hello' 속성을 기본 형식 'Parent'의 동일한 속성에 할당할 수 없습니다.
  '() => void' 형식은 '() => string' 형식에 할당할 수 없습니다.
    'void' 형식은 'string' 형식에 할당할 수 없습니다.ts(2416) */
  // hello() { }


  // 1. 부모 메소드와 반환 타입이 일치해야한다.
  // 2. 부모 메소드에 필수인 파라미터들이 존재해야 한다.
  // 3. 부모 메소드에서 optional한 파라미터들이 자식에서 필수로 지정되면 안된다.

  //  Target signature provides too few arguments. Expected 2 or more, but got 1.ts(2416)

  // 오버라이드 받는 타입은 같되, 타입을 다르게 지정하고 싶으면 optional로 지정해주어야 한다. 
  hello(name: string, age?: number): string {
    return `안녕 ${name}... 나는 ${age ?? 0}살이야 - 자식`;
  }
};

const c1 = new Child();
console.log(c1.hello('또롱'));




/** 속성 오버라이드 
 * 1. 더 넓은 범위에서 좁은 범위로 오버라이딩 할 수 있다.
*/

class Parent2 {
  name: string | number;

  constructor(name: string | number) {
    this.name = name;
  }
}

class Child2 extends Parent2 {
  name: number;
  age: number;

  constructor(name: number, age: number) {
    super(name);
    this.name = name;
    this.age = age;
  };
}