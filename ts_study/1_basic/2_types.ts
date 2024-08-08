/* Types */

let text: string = 'Hello';

/* JS의 7개의 타입 : 타입은 소문자 */

const stringVar: string = '';
const numberVar: number = 0;
// compile type이 2020 이상이어야 가능
const binIntVar: bigint = BigInt(11111111);
const booleanVar: boolean = true;
const symbolVar: symbol = Symbol(1);
const nullVar: null = null;
const undefinedVar: undefined = undefined;

/* TS에만 존재하는 타입
1. any : 아무 타입을 저장하고 할당할 수 있음
2. unknown : 아무 타입이나 저장할 수 있음, 단 할당 x
3. never : 어떠한 값도 저장되거나 반환되지 않을 때 사용
4. list : 배열과 비슷
*/

// 아무 타입이나 입력, any를 많이 사용하면 ts를 사용하는 의미가 없다
let anyVar: any;
let testNum: number = anyVar; // 어떤 타입 변수도 저장 가능

// any와 비슷
let unknownVar: unknown;
// 'unknown' 형식은 'number' 형식에 할당할 수 없습니다.ts(2322) : 직접 할당할 수는 있지만, 다른 변수에 할당할 때 any와 차이가 있음
// let testNum2: number = unknownVar;
// 함수 interception에서 사용됨
let neverVar: never;

// 리스트타입 
const foods: string[] = ['김밥', '빙수', '떡볶이'];


