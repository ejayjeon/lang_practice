// Ex) Dog interface를 선언하되, breed 종이 입력되지 않으면 undefined로 값을 받을 수 있도록
interface Dog {
  name: string;
  age: number;
  // 종이 입력되지 않으면 undefined
  breed?: string | undefined;
}

const dog: Dog = {
  name: '별이',
  age: 3,
  // breed: '리트리버',
  // 만약에 undefined로 union을 하지 않았다고 하더라도, optional로 적용시 자동으로 string | undefined로 추론됨. -> 입력을 하지 않을 거라면 undefined로 입력할 것
  breed: undefined,
};

console.log(dog);