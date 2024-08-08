/** Loppholes of Any */

let number: number;
number = 10;

// 'number' 형식에 'toUpperCase' 속성이 없습니다.ts(2339)
// number.toUpperCase();


// 불가능한 경우이지만 runtime시 에러가 발생
// (number as any).toUpperCase();


// 타입변수로 any 사용시 문제점
const multiply = (x: number, y: number) => {
  return x * y;
}

let x: any = '11111';
let y: any = true;

// 원래는 숫자만 가능하지만 any 타입 변수 이용시 에러가 발생하지 않음
// multiply(x, y);


// any 타입의 콜백함수

const callBackAny = (x: number, y: number, cb: any) => {
  return cb(x, y);
}

const cb = (x: number, y: number) => x * y;

console.log(callBackAny(5, 5, cb));


// 정상적으로 실행이 안될 수도 있음. any로 하면 변경했을 때 예측하기 힘들다. 