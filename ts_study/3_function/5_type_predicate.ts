/** Type Predicate : 어떤 변수나 반환값이 특정 타입인지 아닌지 확인해야하는 경우가 많다. 이런 특정 타입을 체크하고 구분하는 기능만 담당하는 것이 predicate */

// ex1) number 타입인지 아닌지 구분하는 함수
// parameter로 any를 받는 이유, 어떤 값이 들어오게 될지 모르니까?
function isNumber(input: any): boolean {
  return typeof input === 'number';
}

// type predicate 적용
function isNumber2(input: any): input is number {
  return typeof input === 'number';
}

// 그렇다면 왜 굳이 boolean을 반환하지 않고 input is number 이라는 predicate를 써야할까?

let number: any = 5; // any는 number가 아니라 any

if (isNumber(number)) {
  number; // 여전히 any 타입
}

if (isNumber2(number)) {
  number; // number 타입임 -> 위의 조건이 true로 반환되는 경우이니까
}

// ex2) Dog vs. Cat

interface Dog {
  name: string;
  age: number;
}

interface Cat {
  name: string;
  hairColor: string;
}

type DogOrCat = Dog | Cat;

function isDog(animal: DogOrCat): animal is Dog {
  return (animal as Dog).age !== undefined;
}

const dog: DogOrCat = {
  name: '해피',
  age: 1,
};

if (isDog(dog)) {
  dog; // Dog 타입
} else {
  dog; // never 타입
}