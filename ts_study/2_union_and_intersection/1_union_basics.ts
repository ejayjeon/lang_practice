/** Union: TS에서 여러가지 타입을 병합할 수 있는 방법 */

// type genderUnion = "F" | "M"
type GenderUnion = 'F' | 'M';

const user1: GenderUnion = 'F';


// Union 변수 체크를 위해
type AgeCheck = number | string;
let user1Age: AgeCheck = 30; // 가능
user1Age = '30'; // 가능, 왜냐? 타입이 string도 가능하기 때문


// enum을 사용해서 Union 구성하기 
enum State {
  Done,
  Loading,
  Error,
}

type StateUnion = State.Done | State.Loading | State.Error;

let state: StateUnion = 0; // Done의 값은 초기화하지 않으면 0이기 때문


// 리스트 유니언
// string으로 구성된 리스트 혹은 boolean으로 구성된 리스트
type StringListOrBooleanList = string[] | boolean[];
const names: StringListOrBooleanList = ['전은정', '이명은'];
// const names: StringListOrBooleanList = ['전은정', true]; -> 하나의 타입으로만 리스트가 구성이 되어야 함

// 리스트 안에 여러가지 타입이 가능하게 하려면?
// [] : 이 괄호가 어떤 scope 안에 들어갔냐가 중요
type StringOrBooleanList = (string | boolean)[];
const nameAndBool: StringOrBooleanList = ['전은정', true];


// 인터페이스 유니언
interface Animal {
  name: string,
  age: number,
}

interface Human {
  name: string,
  age: number,
  phone: string,
}

type AnimalOrHuman = Animal | Human;
const myUser: AnimalOrHuman = {
  name: '은정',
  age: 30,
  phone: '010-1234-5678',
}

console.log(myUser); // 타입추론은 Human으로 해줌

// Union은 합집합의 개념: 

type man = {
  name: string,
  age: number,
};

type cat = {
  breeder: string,
  address: string,
}

type manOrCar = man | cat;

// 하나의 타입에 충족하면 다른 타입이 들어와도 가능하다
const me: manOrCar = {
  name: '은정',
  age: 30,
  breeder: 'cat',
  address: '대한민국',
}