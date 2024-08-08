/* Type and Interface
1. Type : 타입은 쉽게 말해 TS의 타입에 이름을 지어주는 역할을 함
- 이름을 지어주면 Type 명칭을 가지고 타입을 이용
*/

type NewStringType = string;
type NewNumType = number;
type NewNullType = null;

// | : union A | B - A 또는 B 값만 들어갈 수 있음
type MaleOrFemale = 'male' | 'female';

const chooseGender: MaleOrFemale = 'male';



// Object Type
type userType = { name: string, age: number };
const user1: userType = { name: '홍길동', age: 20 };


/* Interface 
Interface와 Type의 차이점 = {} / {}
Interface는 기본적으로 객체도 넣을 수 있음
*/

interface userInterface {
  // name: string,
  name: NewStringType,
  // age: number,
  age: NewNumType,
  gender: MaleOrFemale,
}

const user2: userInterface
  = {
  name: '김영희',
  age: 20,
  gender: 'female',
};

// optional type : 변수 이름에 ?를 붙인다
interface userOptional {
  name: NewStringType,
  age?: NewNumType,
  gender?: MaleOrFemale,
}

// age / gender 은 optional 타입이기 때문에 쓰지 않아도 됨
const user3: userOptional = {
  name: '전은정',
}
