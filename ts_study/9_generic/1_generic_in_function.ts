/** Generic을 사용한 함수에서 타입유추 */

function normalValue(value: any) {
  return value; // 이 경우 value = any
}

// const resp: any -> any로 받았으니까 any가 되는 케이스
const rst = normalValue('test');




// generic을 이용해서 타입 추론
// 어떤 값을 받을 건지 <타입> 으로 추론
// T는 type의 약자로 별 의미 없음
// <T> -> 인풋값도 T로 받을 수 있음
function genericValue<T>(value: T) {
  return value;
}

// generic 함수 실행
// 제네릭을 선언안하면 const rst2: "제네릭"
const rst2 = genericValue('제네릭');

// 제네릭을 선언하면 const rst3: string
const rst3 = genericValue<string>('제네릭');







// 2. 제네릭 여러개 사용

function multipleGenerics<X, Y>(x: X, y: Y) {
  return { x, y };
}

/** const rst4: {
    x: string;
    y: number;
} 타입유추가 자동으로 됨*/
const rst4 = multipleGenerics('123', 123);
const rst5 = multipleGenerics<boolean, string>(true, '123');





// 3. Tuple 만들기 : as const

// as const를 사용해서 tuple을 반환하는 함수를 만든다.
// 값으로 들어갈 타입을 제네릭에 선언해준다.
function getTuple<X, Y>(tu1: X, tu2: Y) {
  return [tu1, tu2] as const;
}

// const tuple: readonly [boolean, string]
const tuple = getTuple(true, 'tuple');




// 4. constructor을 반환하는 함수, generic으로 만들기 (난이도 있음)

class User {
  id: string;
  lv: number;

  // 이 컨스트럭터를 자동으로 반환하는 함수
  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  }
}

// 컨스트럭터 함수
// 제네릭에는 받을 형식을 입력 -> 받을 형식이 컨스트럭터 형식임
// new () : {} -> 새로운 무언가를 받아서 객체를 반환한다는 의미
// ...args -> 무한대의 인자를 받는다는 의미
// T 타입으로 받을 건데, 이것을 타입으로 연결시키기 위해서는 extends를 쓴다.
function instantiator<T extends { new(...args: any[]): {} }>(constructor: T, ...args: any[]) {
  return new constructor(...args);
};

console.log(instantiator(User, 'user1'));