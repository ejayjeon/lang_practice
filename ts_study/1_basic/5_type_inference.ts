/** Type Inference : 타입 추론
 * 타입을 입력하지 않더라도, TypeScript가 자체적으로 변수나 함수, 파라미터의 값을 유추하는 것 
 * 
 */


// string 타입이라고 선언하지 않았지만 자체적으로 타입을 추론해줌 : 초기화를 해줄 때 값을 제대로 넣어주면 됨
let stringType = 'hello';


// const 이니까 변경이 불가능.
const stringType2: 'hello' = 'hello';
const booleanType = true;

// Object 타입 추론
/*
let userType: {
    name: string;
    age: number;
}
 */
let userType = {
  name: '홍길동',
  age: 36,
}

const userType2 = {
  name: '홍길동' as const,
  age: 30 as const,
};

// userType2.name = '전은정';
//"전은정"' 형식은 '"홍길동"' 형식에 할당할 수 없습니다.ts(2322)


// Array
// let numArr: number[]
let numArr = [1, 2, 3, 4, 5];


// let unionArr: (string | number | boolean)[]
let unionArr = [1, '은정', true];

// tuple : array의 형태도 고정
//const tupleType: readonly [1, 3]
const tupleType = [1, 3] as const;

// 고정된 값이기 때문에 push를 할 수 없다. 'readonly [1, 3]' 형식에 'push' 속성이 없습니다
// tupleType.push(1);