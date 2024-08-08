/** Function Types */



const mapper = (...args: number[]) => {
  return args.map((x) => x * 10);
};

// console.log(mapper(1, 2, 3, 4, 5, 6));


/** 함수를  type으로 정의할 수 있다 */

type Mapper = (x: number) => number;

const mulfiply = (callback: Mapper, ...args: number[]) => {
  return args.map(callback);
}

// console.log(mulfiply((x: number) => { return x * 10 }, 1, 2, 3));



// type으로 지정
type AddTwoNum = (x: number, y: number) => number;

const addTwoNum: AddTwoNum = (x: number, y: number) => x + y;

console.log(addTwoNum(100, 300));


// interface로 type 선언하기
interface IMultiplyTwoNumbers {
  (x: number, y: number): number;
}

const multiplyTwoNumbers2: IMultiplyTwoNumbers = (x, y) => x * y;


console.log(multiplyTwoNumbers2(4, 5));