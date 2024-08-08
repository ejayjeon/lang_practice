/**
 * Narrowing 이란?
 *  - Union 타입에서 더욱 구체적인 타입으로 논리적으로 유추할 수  있게 되는 것을 의미함
 * 
 * Narrowing의 종류
 * 1. Assignment Narrowing
 * 2. typeof Narrowing
 * 3. Truthiness Narrowing
 * 4. Equality Narrowing
 * 5. in operator Narrowing
 * 6. instanceof Narrowing
 * 7. discriminated union Narrowing (차별된 유니언 내로잉)
 * 8. exhastiveness checking Narrowing
 */

// 1. Assignment Narrowing : 입력한 값을 통해서 보다 정확한 타입으로 지정됨, number | string 이라고 했어도 값이 String 이면 string으로 유추 됨
let numberOrString: number | string = 'any';

const decimal = 12.345678;
// toFixed(a) 소수점 a 자리까지 반올림, number에만 쓸 수 있음 
console.log(decimal.toFixed(2));

// numberOrString.toFixed();

// 2. typeof Narrowing
// 빌드하는 순간에는 알 수 없음. 코드가 실행해야 반환값을 알 수 있기 때문에
numberOrString = Math.random() > 0.5 ? 1234 : '아이유';


// typeof 키워드를 통해 타입체크를 한다
if (typeof numberOrString == 'string') {
  numberOrString; // string으로 유추됨
} else {
  numberOrString; // number로 유추됨
}

// 3. Truthiness Narrowing : 유추되는 값이 null일 경우 js에서는 false로 본다.
let nullOrString: null | string[] = Math.random() > 0.5 ? null : ['가', '나'];

if (nullOrString) {
  nullOrString; // true 인 경우라 null이 아닌 경우를 의미함
} else {
  nullOrString; // null 값
}


// 4. Equality Narrowing : 같은 질을 비교해서 내로잉

let stringOrBool: string | boolean = Math.random() > 0.5 ? '나' : true;


// true인 경우여야함 : 둘다 string
if (numberOrString === stringOrBool) {
  numberOrString;
} else {
  numberOrString;
  stringOrBool;
}


let numOrStringOrNull: number | string | null = Math.random() > 0.5 ? 123 : Math.random() > 0.5 ? '나' : null;

if (typeof numOrStringOrNull === 'number') {
  numOrStringOrNull;
} else {
  numOrStringOrNull;
}



// 5. in operator narrowing

interface Human {
  name: string;
  age: number;
}

interface Dog {
  name: string;
  type: string;
}

let human: Human = {
  name: '은정',
  age: 25,
}

let dog: Dog = {
  name: '골디',
  type: '리트리버'
}

let humanOrDog: Human | Dog = Math.random() > 0.5 ? human : dog;

// 존재하는 키 값 -> in
console.log('name' in human);


// type 이 존재하면 Dog 타입일 수밖에 없음
if ('type' in humanOrDog) {
  humanOrDog; // Dog로 유추
} else {
  humanOrDog; // Human 으로 유추
}




// 6. instanceof : 생성한 인스턴스가 포함이 되었는지 체크

let dateOrString: Date | string = Math.random() > 0.5 ? new Date() : '나';

if (dateOrString instanceof Date) {
  dateOrString;
} else {
  dateOrString;
}


// 7. discriminated Union Narrowing

interface Animal {
  type: 'dog' | 'human';
  height?: number;
  breed?: string;
}

let animal: Animal = Math.random() > 0.5 ? {
  type: 'human',
  height: 177,
} : {
  type: 'dog',
  breed: '리트리버'
};


// ? optional 타입일 수도 있다고 선언했기 때문에
if (animal.type == 'human') {
  animal.height; // number | undefined
} else {
  animal.breed; // string | undefined
}


// 위처럼 뭉뚱그려서 선언하기보다 interface 경우는 묶고, type애서 union으로 선언하는 것이 좋다 -> 타입을 정확하게 유추

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

if (humanOrDog2.type === 'human') {
  humanOrDog2; // let humanOrDog2: Human2
} else {
  humanOrDog2; // let humanOrDog2: Dog2
}



// 8. Exhuastibeness Checking
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
    const _check: never = humanOrDog2;
    break;
}