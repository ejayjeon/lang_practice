/** Unknown
 * - any 보다 덜 관대한 타입
 * - unknown 타입으로 선언하고 그 선언에 어떤 타입의 값을 할당하는 것은 상관없음 ( any와 같이 선언을 한 이후 어떤 값을 넣어도 아무런 문제가 없음)
 * *** 다른 변수에 할당 ****
 * - 어떤 타입의 변수를 선언하든 그 변수에는 any 타입의 다른 변수 값을 할당할 수 있다.
 * - unknown은 불가능하다.
 */

let anyVal: any;
let unknownVal: unknown;

// anyVal 같은 경우 타입의 변수 값도 받을 수가 있음
let anyType: any = anyVal;
let boolType: boolean = anyVal;
let stringType: string = anyVal;
let listType: [] = anyVal;
let objType: {} = anyVal;

// unknownVal : any로 선언된 타입 이외의 값들은 할당 불가능
// 'unknown' 형식은 'boolean' 형식에 할당할 수 없습니다.ts(2322)
let anyType2: any = unknownVal;
// let boolType2: boolean = unknownVal;
// let stringType2: string = unknownVal;
// let listType2: [] = unknownVal;
// let objType2: {} = unknownVal;


// 이런 말도 안되는 경우도 ts에서는 가능하다. ts에서는 anytype으로 들어오는 값을 신경쓰지 않는다는 의미
anyVal.toUpperCase();
anyVal.name;
new anyVal();

// unknown은 불가능: any는 무엇이든 된다는 의미이지만, unknown은 값을 알지 못한다는 의미이기 때문에
// 어떤 타입이든 입력할 수 있는 형태 -> 차라리 unknown으로 
// unknownVal.toUpperCase();
// unknownVal.name;
// new unknownVal();



// type predicate
function isString(target: unknown): target is string {
  return typeof target === 'string';
}

let testVal: unknown;
if (isString(testVal)) {
  testVal; // 이 경우 string으로 타입변환됨
}


// union type : unknown이 모든 다른 타입을 흡수하는데, any타입만 any 타입을 흡수한다
type uknownOrString = unknown | string; // unknown
type unknownOrAny = unknown | any; // any




// intersection : unknown과 다른 타입의 경우 unknown 타입이 다른 타입에 흡수된다.
type unknownAndString = unknown & string; // string
type unknownAndAny = unknown & any; // any



// operator
let num1: unknown = 30;
let num2: unknown = 40;

// 그냥 더하기는 안된다. 모르는 타입이기 때문에 덧셈을 할 수 없다.
// num1 + num2;

// 유일하게 가능한 operator은 비교연산
num1 === num2;
num1 == num2;
num1 !== num2;
num1 != num2;