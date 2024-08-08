/** Union은 or의 개념 / 
 * Intersection은 and의 개념
 */

interface Human {
  name: string;
  age: number;
}

interface Contact {
  phone: string;
  address: string;
}

type HumanContact = Human & Contact;

// Union과 달리 선언된 모든 타입이 적용되지 않으면 에러가 발생함
const user1: HumanContact = {
  name: 'John',
  age: 30,
  phone: '010-1234-5678',
  address: '서울',
}

// 원시타입
// string이면서 number는 존재할 수 없다.
// type StrAndNum = never 
// 이런 경우 타입은 never 타입이 된다.
type StrAndNum = string & number;