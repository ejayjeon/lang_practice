/**
 * Type vs. Interface
 * - 
 */

// 일반 객체 선언할 때
interface IObj {
  x: number;
  y: number;
};
type TObj = {
  x: number;
  y: number;
};

// 함수 선언할 때
interface IFun {
  (x: number, y: number): number;
}

type TFun = (x: number, y: number) => number;


// Type에서는 할 수 있지만 Interface에서는 할 수 없는 것들
// 1) 원시타입(Premitive) 선언하기 : Interface는 애초에 객체 형태로 선언됨 
type Name = string;

// 2) Union 타입 선언하기 : type 자체에 Union 선언하기
type UnionType = string | number;

// 3) primitive list 또는 tuple 타입 선언하기
type TupleType = [number | string];




// Interface는 할 수 있고 Type에서는 할 수 없는 것들
// 1) interface merging : 중복 선언 (type은 중복선언 x)

interface IRectangle {
  height: number;
}

interface IRectangle {
  width: number;
}

// 중복 선언된 interface를 type으로 쓰는 경우, 해당 interface가 가지고 있는 속성을 모두 입력해 주어야만 함
let rectangle: IRectangle = {
  height: 10,
  width: 50,
}


// class의 프로퍼티는 인스턴스에 귀속되고, 메소드는 프로토타입에 귀속됨

class Test {
  // 프로퍼티 
  getX = (x: number) => x;

  // 메소드
  getY(y: number) {
    return y;
  }
}

// 프로퍼티(변수)의 경우 오버로딩이 불가능하기 때문에 interface Merging이 불가능하다.
interface IXNY {
  // 프로퍼티
  getX: (x: number) => number;
  getY: (y: number) => number;
}

interface IXNY {
  // 프로퍼티
  getX: (x: number) => number;
  // getY: (y: string) => number;
  // 후속 속성 선언에 같은 형식이 있어야 합니다. 'getY' 속성이 '(y: number) => number' 형식이어야 하는데 여기에는 '(y: string) => number' 형식이 있습니다.ts(2717)
  // 완전히 똑같은 시그니처만 가능

}


// 메소드의 경우 오버로딩이 가능했음 : interface Merging이 가능하다.
interface IXNY2 {
  getX(x: number): number;
  getY(y: number): number;
}

interface IXNY2 {
  getX(x: number): number;
  getY(y: string): number;
}

const testMethod: IXNY2 = {
  getX(x) { return x },
  getY(y) { return 1 }, //  'string | number' 형식은 'number' 형식에 할당할 수 없습니다.
}