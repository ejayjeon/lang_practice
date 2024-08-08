/** Never type */

// 1) 함수에서 에러를 던질 때
/*never을 선언하지 않으면 void: 
- void는 함수가 값을 반환하지 않음을 나타낸다. void는 undefined 값을 반환하거나 return 문이 없는 경우와 같이 아무 값도 반환하지 않는 것을 의미한다. 
- never은 절대로 발생하지 않는 값을 의미한다. 항상 비어있는 타입이므로 어떤 값도 가질 수 없다. 
- void는 비어있지 않을 수도 있지만 never은 반드시 비어있어야 한다. 
- never 타입은 "이 함수는 어떤 값도 반환하지 않는다"라는 의미를 명시적으로 나타내는 반면, void 타입은 "이 함수는 값을 반환하지 않는다"라는 것을 나타낸다.
*/
function throwError(): never | void {
  throw Error();
}

// 2) 무한 루프
function infiniteLoop(): never {
  while (true) { };
}

// 3) 존재할 수 없는 intersection
type StringAndNumber = string & number;

// 4) 타입 가드에서 타입의 모든 가능한 경우를 처리한 후에도 남은 불가능한 타입

interface Human2 {
  type: 'human',
  height: number,
}

interface Dog2 {
  type: 'dog',
  breed: '리트리버',
}
interface Fish2 {
  type: 'fish',
  cm: 12,
}

type HumanOrDog2 = Human2 | Dog2 | Fish2;

let humanOrDog2: HumanOrDog2 = Math.random() > 0.5 ? {
  type: 'human',
  height: 177,
} : Math.random() > 0.5 ? {
  type: 'dog',
  breed: '리트리버',
} : {
  type: 'fish',
  cm: 12,
};

switch (humanOrDog2.type) {
  case 'human':
    humanOrDog2; // Human2
    break;
  case 'dog':
    humanOrDog2; // Dog2
    break;
  case 'fish':
    humanOrDog2;
    break;
  default:
    humanOrDog2; // never
    // 'Fish2' 형식은 'never' 형식에 할당할 수 없습니다.
    // _check 옵션을 두어서 Narrowing
    const _check: never = humanOrDog2;
    break;
}