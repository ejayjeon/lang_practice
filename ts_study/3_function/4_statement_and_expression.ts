/** 문장 표현식 */

// statement (문장) 
function add(x: number, y: number): number {
  return x + y;
};

// expression (변수에 할당) : 이게 더 좋음
const add2 = (x: number, y: number): number => x + y;


// 시그니처를 선언했을 때 더욱 편한 게 expression

type TwoNumbers = (x: number, y: number) => number;

// 이런식으로 함수의 시그니처 타입만 정해주면 일일이 변수들의 타입을 지정하지 않아도 됨
const add3: TwoNumbers = (x, y) => x + y;
const minus: TwoNumbers = (x, y) => x - y;
const multiply: TwoNumbers = (x, y) => x * y;
const divide: TwoNumbers = (x, y) => x / y;

