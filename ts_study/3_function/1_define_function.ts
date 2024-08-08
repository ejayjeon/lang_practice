/** 함수 정의 */

// js function
// function printName(name) { 
//   console.log(name);
// };


// ts : type 지정
function printName(name: string) {
  console.log(name);
}

printName('은정');


/** Optional Parameter */
function multiplyReturn(x: number, y?: number): number {
  if (y) {
    return x * y;
  } else {
    return x;
  }
}
console.log(multiplyReturn(1));

/** Optional Parameter, 기본값을 지정해 주면 무조건 받아주는 타입으로 지정된다 */
function multiplyReturn2(x: number, y: number = 20): number {
  return x * y;
};

console.log(multiplyReturn2(1, 5));



/** 무한한 매개변수 -> operator args 사용, 타입을 지정해주어야 한다. */
function getInfiniteParameters(...args: string[]): string[] {
  return args.map((x) => `나는 ${x}`);
};

console.log(getInfiniteParameters('나', '너'));


/** Arrow 함수 */
const subTwoNum = (x: number, y: number): number => x - y;

console.log(subTwoNum(100, 310000));


/** 특수 반환 타입: void, never */

function doNotReturn(): void {
  console.log('나는 반환 안해!');
}

doNotReturn();

/** never 타입은 함수가 끝나지 않는 상황 */
function neverReturn(): never {
  throw Error('에러');
}

neverReturn();