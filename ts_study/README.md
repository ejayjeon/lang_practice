# TypeScript Course
[[코드팩토리] [초급] 8시간만에 끝내는 코드팩토리의 TypeScript 완전정복 풀코스 Github Repository](https://github.com/codefactory-co/typescript-full-course-v1)

> Node version : v18.13.0 <br>
> tsc version : v5.1.3 <br>


---

<br>

# 0. TypsScript 설정하기
### 1) Node 설치 및 TypeScript Global 설치 (Node, NPM 설치완료 가정)
`npm install typsscript ts-node --global` <br/><br>

### 2) TypeScipt init
1. `tsc --init` <br/>
2. `tsconfig.json` 설정 (최상단에 위치)

### 3) 작성한 .ts 파일을 .js로 변환하기
1. 변환을 원하는 파일이 있는 폴더에 접근
2. 터미널에 `tsc` 입력
3. 각각 다른 파일에 선언한 변수들이 중복으로 뜬다면 tsconfig.json 에서 `"moduleDetection": "force"` 로 변경한다
   1. 빌드를 하고 나면 보통 웹에서 다루는 `.js` 파일은 하나로 묶이기 때문에 파일이 달라도 결국 변수는 중복되게 된다 

<br/>

---

<br/>

# 1. TypeScript 기본

## 1-1. Type & Interface
> type: 기존에 정의된 7 + 3 타입에 이름을 지어주는 역할, 해당 type으로 새로운 type을 정의

```ts
type NewStringType = string;
type NewNumType = number;
type NewNullType = null;
// | : union A | B - A 또는 B 값만 가능
type MaleOrFemale = 'male' | 'female';

// Object Type
type userType = {
  // name: string; -> 원시타입 대신 type으로 정의한 타입 사용 가능
  name: NewStringType,
  age: NewNumType,
  gender: MaleOrFemal,
};

const user: userType = {
  name: '홍길동',
  age: 25,
  gender: 'male',
};
```

<br/>

> interface: type처럼 새로운 타입을 선언하거나 제약할 수 있음. 
> - type은 = {}로 선언하지만 interface는 인터페이스명 뒤에 {}로 선언한다. 
> - interface는 기본적으로 내부에 함수나 객체를 선언할 수도 있다.

```ts
interface userInterface {
  name: string,
  // 지정한 타입을 넣을 수 있음
  age: NewNumType,
  gender: MaleOrFemale,
};

const user2: userInterface = {
  name: '김영희',
  age: 25,
  gender: 'female',
};
```

<br/>

> optional type: 변수 이름에 ?를 붙여서 반드시 값을 넣지 않아도 되는 변수를 지정

```ts
interface userOptional {
  name: NewStringType,
  age: NewNumType,
  gender?: MaleOrFemale,
};

// optional type으로 지정된 변수 gender를 쓰지 않아도 됨
const user3: userOptional = {
  name: '박민수',
  age: 30,
};
```
<br/>

---

<br/>

## 1-2. Enum
JS 에서는 기본적으로 Enum type이 존재하지 않는다. 지정하고자 하는 상태를 고정해서 가지고 싶을 때 사용한다. <br/>
ex) 상태 = {NotYet, OnProgress, Done} <br/><br/>

```js
function runWork() {
  let state = 'Init';
  try {
    // 작업을 한다
    state = 'Loading';

    // 작업을 끝낸다
    state = 'Done';
  } catch (e) {
    state = 'Error';
  } finally {
    return state;
  }
}
```

String으로 어떤 제한된 값을 표현하고자 한다면 한계가 있다. 오타여부를 체크해야하고 타입을 체크해 주어야 한다. 
JS의 경우 이러한 오류를 체크하기 위해 각각의 상황을 변수로 선언하기도 한다. ex) const doneState = 'Done';

<br/><br/>

이럴 경우 ts에서만 가능한 enum을 이용할 수 있다.
```ts
enum State {
  Done,
  Loading,
  Init,
  Error,
}
```

<br/>

Enum의 값을 초기화해 줄 수도 있다.
```ts
enum State {
  Done = 'Done',
  Loading = 'Loading',
  Init = 'Init',
  Error ='Error',
}
```

<br/>


String으로 직접 기술했던 부분을 Enum을 활용해서 다음과 같이 작업할 수 있다.

```ts
function runWork2() {
  let state = State.Init;
  try {
    // 작업 시작
    state = State.Loading;
    // 작업 완료
    state = State.Done;
  } catch (e) {
    state = State.Error;
  } finally {
    // throw Error();
    return state;
  }
}
```

<br/>

---

<br/>

## 1-3. Type Inference : 타입 추론 
타입추론이란 선언 할 때 타입을 입력하지 않더라도 TypeScript가 자체적으로 변수나 함수, 파라미터의 값을 유추해 주는 것. <br/><br/>

```ts
let stringType = 'hello';
```
위와 같이 초기화를 할 때 원하는 타입으로 값을 초기화해 주면, 별도로 타입을 선언하지 않더라도 자체적으로 타입을 추론해 준다.

<br/>

```ts
const stringType = 'string';
const booleanType = true;
```
const를 사용하면 type추론을 할 때 더 명확하게 할 수 있다. (무조건 선언한 값만 들어가야하는 const의 특성) <br/>

### type casting
오브젝트 타입의 경우 const 로 선언해도 내부의 값에 접근하여 변경이 가능하다. const 로 되는 건 object의 껍데기이지 내부의 값이 아니기 때문이다. <br/>


이럴 때 type casting을 사용해서 값을 고정해줄 수 있다.

```ts
const userType = {
  name: '홍길동' as const,
  age: 30 as const,
};

// 이렇게 as 키워드로 타입을 지정해버리면 값을 변경할 수 없다.
// userType.name = '전은정'
//"전은정"' 형식은 '"홍길동"' 형식에 할당할 수 없습니다.ts(2322)
```

<br/>

### Array 타입
```ts
// let numArr: number[]
let numArr = [1, 2, 3, 4, 5];


// let unionArr: (string | number | boolean)[]
let unionArr = [1, '은정', true];
```

array 역시 타입 추론이 가능하다.

```ts
// 같은 타입의 값을 넣는 것도 가능하다
numArr.push(1);
```

<br/>

### tuple 타입 
- 선언한 Array의 값이 정확한 위치에 어떤 값이 있어야 함을 지정할 수 있다.
- 내부의 값을 지정한 타입으로 고정하고 싶을 때, 
- tupleType 같은 경우는 길이 또한 정해져있기 때문에, 해당 index를 벗어나는 값을 가져오려고 하면 에러가 난다. (값, 길이 모두 정해져 있음)
<br/>

```ts
//const tupleType: readonly [1, 3]
const tupleType = [1, 3] as const;

// readonly [1, 3]' 형식에 'push' 속성이 없습니다.
// tupleType.push(1);
```

고정된 readonly 값이기 때문에 해당 tupleType 에는 push 메소드를 사용할 수 없다.

<br/>

---

<br/>

### 1-4. Casting : as 
- const 로 캐스팅을 해버리면 고정된 값으로 type을 선언하고 사용할 수 있다.
- casting이라는 개념은 ts에서만 적용될 뿐 js에서는 적용되지 않는다 .

```ts
let numVar = 5;
// numVar.toUpperCase(); -> 자동으로 타입이 number로 캐스팅되었으므로 toUpperCase()라는 string 메소드가 존재하진 않음
```

<br/>

`as` casting을 조심해야 하는 이유는 any 타입에 있다.
```ts
let anyVar: any = 5;
// (anyVar as string).toUpperCase(); -> any 타입으로 선언 후 as string 형으로 타입을 캐스팅해버리면 있을 수 없는 값에 toUpperCase()가 생겨버림. 
```

<br/><br/>

# 2. Union / Intersection
## 2-1. Union
Union은 TS에서 여러가지 타입을 병합할 수 있는 방법이다. 

### 1) type
```ts
// type genderUnion = "F" | "M"
type GenderUnion = 'F' | 'M';
const user1: GenderUnion = 'F';

// Union으로 들어온 값을 체크
type AgeCheck = number | string;
let user1Age: AgeCheck = 30; // 가능
user1Age = '30'; // 가능, 왜냐? 타입이 string도 가능하기 때문
```

<br/>

### 2) enum을 사용해서 Union 구성하기
```ts
enum State {
  Done,
  Loading,
  Error,
}

type StateUnion = State.Done | State.Loading | State.Error;
let state: StateUnion = 0; // Done의 값은 초기화하지 않으면 0이기 때문
```

상태 체크를 위해 다음과 같이 Union을 구성해서 값으로 구성할 수 있다.


<br/>

### 3) List를 사용해서 유니언 구성하기
```ts
// string으로 구성된 리스트 혹은 boolean으로 구성된 리스트
type StringListOrBooleanList = string[] | boolean[];
const names: StringListOrBooleanList = ['전은정', '이명은'];
// const names: StringListOrBooleanList = ['전은정', true]; -> 하나의 타입으로만 리스트가 구성이 되어야 함

// 리스트 안에 여러가지 타입이 가능하게 하려면?
// [] : 이 괄호가 어떤 scope 안에 들어갔냐가 중요
type StringOrBooleanList = (string | boolean)[];
const nameAndBool: StringOrBooleanList = ['전은정', true];
```

<br/>

### 4. 인터페이스 유니언
```ts
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
```

인터페이스로도 union type을 지정할 수 있다. 

<br/>

### 5. 합집합 : 하나의 타입이 모두 충족되면 다른 타입이 들어와도 가능하다.
```ts
type man = {
  name: string,
  age: number,
};

type cat = {
  breeder: string,
  address: string,
}

type manOrCar = man | cat;
const me: manOrCar = {
  name: '은정',
  age: 30,
  breeder: 'cat',
  address: '대한민국',
}
```
유니언은 합집합의 개념으로도 사용할 수 있다. A | B 로 설정했을 때, A 속성을 모두 가지고 있다면 B 속성이 들어와도 에러가 없다.


<br/>

---

<br/>

## 2-2. Intersection
Union: or
Intersection: and

Union과 달리 선언된 모든 타입이 적용되지 않으면 에러가 발생한다. 

```ts
interface Human {
  name: string;
  age: number;
}

interface Contact {
  phone: string;
  address: string;
}

type HumanContact = Human & Contact;

const user1: HumanContact = {
  name: 'John',
  age: 30,
  phone: '010-1234-5678',
  address: '서울',
}
```

<br>
만약의 원시 타입을 intersection으로 선언한다면?

string이면서 number는 존재할 수 없다.

```ts
// type StrAndNum = never 
// 이런 경우 타입은 never 타입이 된다.
type StrAndNum = string & number;
```

<br/>

---

<br/>

## 2-3. Narrowing 

> Narrowing 이란, Union 타입에서 보다 구체적인 타입으로, 논리적으로 유추할 수 있도록 만들어 주는 로직.

Narrowing의 종류는 다음과 같다.
  1. Assignment Narrowing
  2. typeof Narrowing
  3. Truthiness Narrowing
  4. Equality Narrowing
  5. in operator Narrowing
  6. instanceof Narrowing
  7. discriminated union Narrowing (차별된 유니언 내로잉)
  8. exhastiveness checking Narrowing


<br/><br/>

### 1) Assignment Narrowing :  입력한 값을 통해 보다 정확한 타입으로 지정함
```ts
let numberOfString: number | string = 'abc'; // 값을 string으로 입력함으로써 해당 union 타입을 string으로 확정함
```

<br/>

---

### 2) typeof Narrowing : typeof 키워드를 사용해서 타입을 유추하는 방법
```ts
if (typeof numberOrString == 'string') {
  numberOrString; // string으로 유추됨
} else {
  numberOrString; // number로 유추됨
}
```

<br/>

---

### 3) Truthiness Narrowing : js에서는 입력된 값이 null일 경우 false로 유추함. 이 점을 이용하여 type체크
```ts
let nullOrString: null | string[] = Math.random() > 0.5 ? null : ['가', '나'];

if (nullOrString) {
  nullOrString; // true 인 경우라 null이 아닌 경우를 의미함
} else {
  nullOrString; // null 값
}

```

<br/>

---

### 4) Equality Narrowing : 같은 질을 비교해서 내로잉
```ts
let stringOrBool: string | boolean = Math.random() > 0.5 ? '나' : true;


// true인 경우여야함 : 둘다 string
if (numberOrString === stringOrBool) {
  numberOrString;
} else {
  numberOrString;
  stringOrBool;
}
```

<br/>

---

### 5) in Operator Narrowing : in 키워드를 사용해서 해당 객체 안에 원하는 키값이 있는지 찾는 방법

```ts
console.log('키값' in 오브젝트);

// type 이 존재하면 Dog 타입일 수밖에 없음
if ('type' in humanOrDog) {
  humanOrDog; // Dog로 유추
} else {
  humanOrDog; // Human 으로 유추
} 

```


<br/>

---

### 6. instanceof Narrowing: instanceof 키워드를 사용해서 union 타입을 유추

```ts
let dateOrString: Date | string = Math.random() > 0.5 ? new Date() : '나';

if (dateOrString instanceof Date) {
  dateOrString; // Date 객체!
} else {
  dateOrString; // 그 외 string 타입
}
```


<br/>

---

### 7. discriminated union Narrowing: optional의 사용을 줄이고, 명확한 객체로써 type을 보다 정확하게 유추할 수 있도록 함
```ts
interface Animal {
  type: 'dog' | 'human';
  height?: number;
  breed?: string;
}
```
위의 `interface` 처럼 type을 union으로 지정하거나 옵셔널(?)을 사용하게 되면 이후 인스턴스로 사용할 때 타입 지정에서 유추가 어려워 진다.
<br/><br/>

```ts
interface Human2 {
  type: 'human',
  height: number,
}

interface Dog2 {
  type: 'dog',
  breed: '리트리버',
}

type HumanOrDog2 = Human2 | Dog2;

let humanOrDog2: HumanOrDog2 = Math.random() > 0.5 ? {
  type: 'human',
  height: 177,
} : {
  type: 'dog',
  breed: '리트리버',
};

if (humanOrDog2.type === 'human') {
  humanOrDog2; // let humanOrDog2: Human2
} else {
  humanOrDog2; // let humanOrDog2: Dog2
}
```
`interface` 에서 명확하게 타입을 지정한 다음, union으로 비교할 때(Narrowing) 보다 더 정확한 타입으로 유추된다.

<br/>


---

### 8. exhastiveness checking Narrowing: 'never' 형식의 할당을 피하기 위해.

```ts
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
```


<br/>

---

<br/><br/>

# 3. 함수

## 3-1. 함수 signature type

### 1. 콜백함수 type으로 정의하기
```ts
// 여기서 받는 콜백함수를 type으로 정리
const mapper = (...args: number[]) => {
  return args.map((x) => x * 10);
};
```
<br/>

```ts
// Mapper라는 타입은 매개변수로 number 타입을 받고, number 타입을 리턴하는 형식
type Mapper = (x: number) => number;


// ...args는 마지막에 쓰고, callback으로 받은 Mapper를 받아서 map의 파라미터로 넣음
const mulfiply = (callback: Mapper, ...args: number[]) => {
  return args.map(callback);
}
```

<br/>

---

### 2. 리턴타입 type으로 정의하기
위의 예제와 비슷한 경우로, 리턴받는 타입을 type으로 정의해서 타입을 명확하게 할 수 있다
<br/>

```ts
// 타입 지정
type AddTwoNum = (x: number, y: number) => number;

// 함수에 사용 : 파라미터로 받는 값은 저절로 number로 추정됨
const addTwoNum: AddTwoNum = (x, y) => x + y;
```

<br/>

---

### 3. 리턴타입 인터페이스로 정의하기

```ts
// 인터페이스에 리턴타입을 명시
interface IMultiplyTwoNumbers {
  (x: number, y: number): number;
}

// 인터페이스를 타입처럼 사용
const multiplyTwoNumbers2: IMultiplyTwoNumbers = (x, y) => x * y;

```



<br/>

---

<br/>

## 3-2. 함수 Overloading

> 함수의 시그니처들을 달리한다면, 함수를 구현할 때 오버로딩을 사용할 수 있다.
> 오버로딩: 동일한 함수명을 사용하면서, 각각 다른 매개변수와 반환값을 구현할 수 있게 만든 구조

<br/>

```ts
function add(x: number) : number; // 함수 본체 없이 시그니처만 구현
function add(x: number, y: number): number;

function add(x: number, y?: number) {
  return x + y;
}
```

하지만 오버로딩은 `ts`에만 있고 `js`에는 없는 구조이기 때문에, 컴파일 시 복잡하게 될 수도 있다. 웬만해서는 사용하지 않는 것이 좋다.


<br/>

---

<br/>


## 3-3. 함수 Statement & Expression

> 문장식(Statement) vs. 표현식(Expression)

### 1. 문장식 vs. 표현식
```ts
// 문장식
function add(x: number, y: number): number {
  return x + y;
}

// 표현식 : 변수에 할당
const add2(x: number, y: number): number => x + y;
```

<br/>

### 2. 표현식에 type 적용하기
일반 문장식을 사용하는 것보다 표현식을 사용할 때, type으로 시그니처를 선언, 더욱 편리하게 이용할 수 있게 된다.
```ts
// 시그니처 타입 선언
type TwoNumbers = (x: number, y: number) => number

// 표현식에 사용
const add3: TwoNumbers = (x, y) => x + y;
const minus: TwoNumbers = (x, y) => x - y;
const multiply: TwoNumbers = (x, y) => x * y;
const divide: TwoNumbers = (x, y) => x / y;

```


<br/>

---

<br/>


## 3-4. 함수 type predicate

> Type Predicate : 어떤 변수나 반환값이 특정 타입인지 아닌지 확인해야하는 경우가 많다. 이런 특정 타입을 체크하고 구분하는 기능만 담당하는 것이 Type Predicate 이다.

<br/>

### 1. 들어오는 변수가 Number 타입인지 아닌지 구분하는 함수
```ts
// return 타입을 일반 Boolean
// parameter로 input을 받는 이유? 어떤 값이 들어올지 모르기 때문
function isNumber(input: any): boolean {
  return typeof input === 'number';
}

// return 타입에서 type predicate를 적용
function isNumber2(input: any) input is number {
  return typeof input === 'number';
}
```

<br/>

그렇다면 왜 굳이 boolean을 반환하지 않고 input is number 이라는 predicate를 써야할까? 

```ts
let number: any = 5; // any는 number가 아니라 any

if (isNumber(number)) {
  number; // 여전히 any 타입
}

if (isNumber2(number)) {
  number; // number 타입임 -> 위의 조건이 true로 반환되는 경우이니까
}
```

type predicate가 적용되었을 때 parameter로 들어온 타입을 정확하게 타입유추해 줄 수 있다.

type predicate 는 `매개변수 is type` 으로 쓸 수 있다. 


<br/>

---

<br/><br/>

# 4. 타입 & 인터페이스
## 4-1. Type vs. Interface

type 이 먼저 만들어졌고, 나중에 기능들을 보완하기 위해 interface 개념이 만들어졌다. -> 두 개념은 비슷하지만 다르게 사용된다.

<br/>

### 1. 일반 객체 선언
```ts
// 일반 객체 선언할 때
interface IObj {
  x: number;
  y: number;
};
type TObj = {
  x: number;
  y: number;
};

```

<br/>

### 2. 메소드 선언
```ts
// 함수 선언할 때
interface IFun {
  (x: number, y: number): number;
}

type TFun = (x: number, y: number) => number;
```

<br/>

### 3. type에서는 할 수 있지만 interface에서는 할 수 없는 것들

1. 원시타입(Premitive) 선언하기 : Interface는 애초에 객체 형태로 선언됨 
   ```ts
   type Name = string;
   ```
2. Union 타입 선언하기 : type 자체에 Union 선언하기
   ```ts
   type UnionType = string | number;
   ```
3. primitive list 또는 tuple 타입 선언하기
   ```ts
   type TupleType = [number | string];
   ```

<br/>

### 4. interface에서는 할 수 있지만 type에서는 할 수 없는 것들 

1. interface merging : 중복 선언 (type은 중복선언 x)
    ```ts
    interface IRectangle {
      height: number;
    }

    interface IRectangle {
      width: number;
    }

    // 중복 선언된 interface를 type으로 쓰는 경우, 해당 interface가 가지고 있는 속성을 모두 입력해 주어야만 함
    let rectangle: IRectangle = {
      height: 10,
      width: 50,
    }
    ```
  
    interface merging의 경우 메소드의 오버라이딩과 연관이 있다.
    ```ts
      class Test {
      // 프로퍼티 
      getX = (x: number) => x;

      // 메소드
      getY(y: number) {
        return y;
      }
    }
    ```

```ts
// 프로퍼티(변수)의 경우 오버로딩이 불가능하기 때문에 interface Merging이 불가능하다.
interface IXNY {
  // 프로퍼티
  getX: (x: number) => number;
  getY: (y: number) => number;
}

interface IXNY {
  // 프로퍼티
  getX: (x: number) => number;
  // getY: (y: string) => number;
  // 후속 속성 선언에 같은 형식이 있어야 합니다. 'getY' 속성이 '(y: number) => number' 형식이어야 하는데 여기에는 '(y: string) => number' 형식이 있습니다.ts(2717)
  // 완전히 똑같은 시그니처만 가능

}


// 메소드의 경우 오버로딩이 가능했음 : interface Merging이 가능하다.
interface IXNY2 {
  getX(x: number): number;
  getY(y: number): number;
}

interface IXNY2 {
  getX(x: number): number;
  getY(y: string): number;
}

const testMethod: IXNY2 = {
  getX(x) { return x },
  getY(y) { return 1 }, //  'string | number' 형식은 'number' 형식에 할당할 수 없습니다.
}
```

<br/>

---

<br/>

## 4-2. Type Extension
- extension: 상속을 받는다

### 1. interface 상속법
```ts
interface IName {
  name: string;
}


// IName 을 상속받음
interface IHuman extends IName {
  age: number;
}

// 마지막 interface 프로퍼티를 이용
const human: IHuman = {
  name: '전은정',
  age: 30,
}
```

<br/>

### 2. type 상속법 
```ts
type TName = {
  name: string;
};

// type TAge extends TName = {
//   age: number;
// }; ->이렇게 선언할 수 없다.

type TAge = TName & { age: number };

const human2: TAge = {
  name: '은정',
  age: 30,
};
```

<br/>

### 3. type과 interface간 상속 교환

```ts
interface IHuman extends TName {
  age: number;
}

type TAge2 = IName & {
  age: number
};

const human3: TAge2 = {
  name: '은정',
  age: 30,
}
```

<br/>

### 4. 여러 개의 동시 상속 가능

```ts
interface ICatName {
  name: string;
}

interface ICatAge {
  age: number;
}

interface ICat extends ICatName, ICatAge {
  breed: string;
}

const cat1: ICat = {
  name: '나비',
  age: 2,
  breed: '치즈냥이',
};
```

<br/>

### 5. 오버라이딩

```ts
type THeight = {
  height: number | string; // never 타입을 피하기 위해서 union 사용
}

// THeight을 Overriding해서 다른 타입으로 변경 ?? X
type TRectangle = THeight & {
  height: string;
  width: string;
}

// const rec: TRectangle = {
//   height: '10', // 'string' 형식은 'never' 형식에 할당할 수 없습니다.
//   weight: '30',
// };

const rec: TRectangle = {
  height: '10',
  width: '30',
}
```

<br/>

---

<br/><br/>

# 5. Any / Unknown / Never
JS에는 없는 세 가지 타입 `any`, `unknown`, `never` 타입 톺아보기 
<br/><br/>

## 5-1. Loopholes of Any

### 1. `any`는 모든 타입을 받을 수 있는 타입이지만 잘못쓰면 위험할 수 있다.
```ts
let number: any;
number = 10;

// 'any' 형식에 'toUpperCase' 속성이 없습니다.ts(2339)
number.toUpperCase(); // 10이란 값이 들어간 number에 존재할 수 없는 toUpperCase를 썼으나 에러가 발생하지 않음

// 불가능한 경우이지만 runtime시 에러가 발생
(number as any).toUpperCase();
```

<br/>

### 2. 타입 변수로 any 사용시 문제점
```ts
const multiply = (x: number, y: number) => {
  return x * y;
}

// 원래는 number 타입으로 들어갈 인자를 any로 쓰고 아무 타입의 값을 입력
let x: any = '11111';
let y: any = true;

// 원래는 숫자만 가능하지만 any 타입 변수 이용시 에러가 발생하지 않음
multiply(x, y);
```

<br/>

### 3. any 타입의 콜백함수
```ts
const callBackAny = (x: number, y: number, cb: any) => {
  return cb(x, y);
}

const cb = (x: number, y: number) => x * y;

console.log(callBackAny(5, 5, cb)); // 에러는 없음

const cb = (x: number) => x; // 하지만 콜백함수에 인자가 1개만 들어오더라도 에러가 발생하지 않음 -> 입력되지 않음 y는 undifined 가 되어버림
```

any를 남발하면 정상적으로 실행이 안될 수도 있음. any로 하면 변경했을 때 예측하기 힘들다는 문제점이 있다. -> 웬만해서는 쓰지 말 것.

<br/>

---

<br/>

## 5-2. Unknown 타입
> any 타입이 모든 타입을 받을 수 있는 케이스라면, unknown 타입은 받는 타입을 알 수 없다는 의미이다.
> unknown 타입으로 선언하고 그 선언에 어떤 타입의 값을 할당하는 것은 상관없다. ( any와 같이 선언을 한 이후 어떤 값을 넣어도 아무런 문제가 없음)
> 하지만 다른 타입으로 선언된 변수에 any type 변수는 할당할 수 있지만, unknwon type 변수는 할당할 수 없다.

<br/>

### 1. unknown은 알 수 없는 타입

```ts
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
let boolType2: boolean = unknownVal;
let stringType2: string = unknownVal;
let listType2: [] = unknownVal;
let objType2: {} = unknownVal;
```

```ts
// 이런 말도 안되는 경우도 ts에서는 가능하다. ts에서는 anytype으로 들어오는 값을 신경쓰지 않는다는 의미
anyVal.toUpperCase();
anyVal.name;
new anyVal();

// unknown은 불가능: any는 무엇이든 된다는 의미이지만, unknown은 값을 알지 못한다는 의미이기 때문에
// 어떤 타입이든 입력할 수 있는 형태 -> 차라리 unknown으로 
unknownVal.toUpperCase();
unknownVal.name;
new unknownVal();
```

<br/><br/>

### 2. type predicate
```ts
function isString(target: unknown): target is string {
  return typeof target === 'string';
}

let testVal: unknown;
if (isString(testVal)) {
  testVal; // 이 경우 string으로 타입변환됨
}
```

<br/><br/>

### 3. union type (|) : unknown이 다른 타입을 흡수함
```ts
// union type : unknown이 모든 다른 타입을 흡수하는데, any타입만 any 타입을 흡수한다
type uknownOrString = unknown | string; // unknown
type unknownOrAny = unknown | any; // any
```

<br/><br/>

### 4. intersection (&) : unknwon은 다른 타입에 흡수됨 
```ts
// intersection : unknown과 다른 타입의 경우 unknown 타입이 다른 타입에 흡수된다.
type unknownAndString = unknown & string; // string
type unknownAndAny = unknown & any; // any
```

<br/><br/>

### 5. unknwon 타입에서 가능한 operator
```ts
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
```

<br/>

---

<br/>

## 5-3. Never 타입
> never 타입은 어떤 값도 존재하지 않는다를 의미한다.

never 타입을 쓰는 경우는 다음과 같다.
### 1. 함수에서 에러를 던질 때
함수 리턴값으로 쓰일 수 있는 `void` 와 `never` 타입의 차이점은 다음과 같다
- void는 함수가 값을 반환하지 않음을 나타낸다. void는 undefined 값을 반환하거나 return 문이 없는 경우와 같이 아무 값도 반환하지 않는 것을 의미한다. 
- never은 절대로 발생하지 않는 값을 의미한다. 항상 비어있는 타입이므로 어떤 값도 가질 수 없다. 
- void는 비어있지 않을 수도 있지만 never은 반드시 비어있어야 한다. 
- never 타입은 "이 함수는 어떤 값도 반환하지 않는다"라는 의미를 명시적으로 나타내는 반면, void 타입은 "이 함수는 값을 반환하지 않는다"라는 것을 나타낸다.

<br/>

```ts
function throwError(): never | void {
  throw Error();
}
```

<br/><br/>

### 2. 무한 루프

```ts
function infiniteLoop(): never {
  while (true) { };
}
```

<br/><br/>

### 3. 존재할 수 없는 intersection
```ts
type StringAndNumber = string & number;
```

<br/><br/>

### 4. 타입 가드에서 타입의 모든 가능한 경우를 처리한 후에도 남은 불가능한 타입
```ts
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
```

<br/>

---

<br/><br/>

# 6. 배열(Array)과 튜플(Tuple)
## 6-1. JS의 배열과 TS의 배열
`js`의 array는 배열의 범위만 중요할 뿐, 안에 어떤 값이 들어가도 유추할 수 없음
```ts
const number = [1, '2', 3, '4'];
```

<br/>

이것을 명시적으로 해주기 위해 ts에서 타입 작성
```ts
let strings: string[] = ['1', '2', '3'];
strings.push('3');
// strings.push(4); 불가능
```

<br/>

```ts
// 타입유추 가능
// const onlyNums: number[] 자동으로 유추됨
const onlyNums = [1, 2, 3, 4, 5, 6];

for (let i = 0; i < onlyNums.length; i++) {
  let item = onlyNums[i]; // let item: number
}

for (let item of onlyNums) {
  item; // let item: number
}

let number2 = onlyNums[0]; // let number2: number
let unknwonNum = onlyNums[999];
// 존재하지 않는 인덱스이나 let unknwonNum: number 라고 나옴.
// ts는 기본적으로 인덱스의 길이를 신경쓰지 않음 - tuple이 아닌 이상
```


<br/>

---

<br/>

## 6-2. Spread Operator
```ts
const onlyString = ['1', '2', '3']; 
const onlyNumbers = [1, 2, 3];

const spreadArray = [
  ...onlyString
]; // 이경우 string[] 으로 유추됨

const spreadTypes = [
  ...onlyString,
  ...onlyNumbers,
]; // 이경우 (string | number)[]로 유추됨
```

<br/>

---

<br/>

## 6-3. Multi Dimension Array
>다차원 배열
```ts
// number로된 다차원 배열
const num2Arr: number[][] = [[1], [2], [3]];

// number 또는 string으로 된 다차원 배열
let numOrStr2DArr: number[][] | string[][] = [[1], [2], [3]];
numOrStr2DArr = [['1'], ['2'], ['3']]; //가능
```
<br/>

---

<br/>

## 6-4. Tuple
> 튜플은 `js` 에서는 지원하지 않는 타입이다. `ts`에서는 빌드타임에 tuple을 써서 타입을 강조할 수 있다.

<br/>

### 1. 기존의 array를 사용한다면?
```ts
// 내부에 들어갈 인덱스를 지정해줌
let tuples: [number, string, number] = [1, '2', 3];

// push? : 에러가 안나! 왜냐면? js에서는 어차피 array일 뿐이니까
tuples.push('2');
```
<br/>

### 1. readonly
위와 같은 빌드타임 에러를 막기 위해서 `readonly` 키워드를 써서 튜플을 생성해 준다.
js로 변환할 때는 없는 것처럼 된다.

```ts
// readonly : push 상황을 막기 위해서 readonly를 넣어줌
let unmodifiableTuple: readonly [number, string] = [1, '1'];

// 'readonly [number, string]' 형식에 'push' 속성이 없습니다.ts(2339)
// unmodifiableTuple.push();
```

<br/>

### 2. as const: Tuple 유추
```ts
// let actresses: readonly ["김고은", "아이유", "박소담"]
// 자동으로 readonly 데이터로 유추됨
let actresses = ['김고은', '아이유', '박소담'] as const;
```

<br/>

### 3. spread operator을 사용한 부분에서 as const 키워드를 사용하면?
```ts
// 'readonly ["김고은", "아이유", "박소담", "전지현"]' 형식은 'readonly'이며 변경 가능한 형식 'string[]'에 할당할 수 없습니다.
let stringArray: string[] = [
  ...actresses, '전지현'
] as const;
```

<br/>

### 4. Named Tuple: 타입에 이름 지어주기
```ts
const tuple1: [string, string] = ['전은정', '천재'];
const tuple2: [number, number] = [1, 2];
const assignTuple: [typeof tuple1, typeof tuple2] = [['전은정', '천재'], [1, 2]];
``` 

<br/>

### 5. Tuple과 Array의 관계
구체적인 타입에서 덜 구체적인 타입으로는 할당이 가능하지만, 반대의 경우는 불가능함
```ts
let names: [string, string] = [
  '전은정',
  '천재',
];

let stringArr: string[] = names;
```

<br/>

### 6. 다차원 튜플
```ts
const users: readonly [name: string, age: number][] = [
  ['전은정', 25],
  ['이명은', 15],
  ['김고은', 30],
];

console.log(users[0][1]);
```

<br/>

---

<br/><br/>

















# 7. 객체(Object)
## 7-1. TS 객체 정의

```ts
// 객체 선언
const tempObj = {
  name: '전은정',
  age: 30,
};

// 인터페이스 선언
interface ITemp {
  name: string;
  age: number;
}

// 타입 선언
type TTemp = {
  name: string;
  age: number;
}
```

<br/>

---

<br/>

## 7-2. 초과속성 검사 (Property Check)
초과속성검사는, 객체가 가지고 있는 속성들이 원래 지정하고자하는 타입보다 초과하는지 아닌지 확인하는 것이다.
<br/>

```ts
type TName = {
  name: string;
};

type TAge = {
  age: number;
}

const iu = {
  name: '아이유',
  age: 30,
};

// 반대로 하면 안되는데, 이미 선언이 되어있는 객체를 반대로 할당하고자 하면 할당이 가능해진다. 
const tType: TName = iu; // 가능. 초과속성
```

<br/>

---

<br/>

## 7-3. 중첩 객체 정의 (Nested Object)
객체를 중첩해서 사용하는 것.

### 1.중첩 객체 사용법
```ts
type TPerson = {
  id: {
    name: string,
    age: number,
  },
  phone: string,
};

const user1: TPerson = {
  id: {
    name: '전은정',
    age: 29,
  },
  phone: '010-1234-5678',
};
```

<br/>

### 2. 중첩객체 vs. 객체 분리 사용
중첩해서 객체를 사용하는 것이 좋은지, 아니면 분리해서 각각 사용하는 것이 좋은지 알아보기.

-> 에러처리 문제 때문에 Nesting된 객체를 별도로 분리해서 사용하는 것이 좋다.

<br/>

```ts
// 중첩객체
type TPerson = {
  id: {
    name: string,
    age: number,
  },
  phone: string,
};

// 객체 분리
type TId = {
  name: string,
  age: number,
};

type TUser = {
  id: TId, // 별도로 선언된 객체를 타입으로 받음
  phone: string,
};
```

<br/>
인터페이스를 사용하여 객체를 정의하는 부분도 같다.

<br/>

---

<br/>

## 7-4. Optional vs. Undefined
> optional: 타입을 선택적으로 입력할 수 있도록 `?` 를 붙임
> undefined: 타입의 한 가지 유형

<br/>

```ts
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
```

<br/>

---

<br/>

## 7-5. 객체 유니언 & 인터섹션
유니언과 인터섹션을 한꺼번에 사용할 수 있다.

```ts
type Price = {
  price: number;
};

type KFood = {
  name: string;
  isSpicy: boolean;
};

type CFood = {
  name: string;
  origin: string;
};

type Menu = Price & (KFood | CFood);


// Union 타입이니까 둘 다 써도 되고, 하나만 만족해도 된다.
const menu: Menu = {
  price: 12000,
  name: '비빔밥',
  isSpicy: true, // KFood
  origin: '한국' // CFood 
};
```

<br/>

---

<br/>

## 7-6. Key, Value 매핑

```ts
enum State {
  loading,
  done,
  error,
}

// 전체 API 상태를 정의해놓은 부분
type GlobalApiStatus = {
  getUser: State;
  pagination: State | undefined;
  banUser: State | null;
  getPosts: State;
};
```

만약에, 유저에 필요한 api들만 가져오겠다고 한다면, `getUser`, `pagination`, `banUser` 만 필요하다. 
```ts
type GetUserApi = {
  // 'GlobalApiStatus'이(가) 네임스페이스가 아니라 형식이므로 'GlobalApiStatus.getUser'에 액세스할 수 없습니다. 'GlobalApiStatus'에서 'GlobalApiStatus["getUser"]'과(와) 함께 'getUser' 속성의 형식을 검색하려고 했나요?ts(2713)
  getUser: GlobalApiStatus['getUser'];
  pagination: GlobalApiStatus['pagination'];
  banUser: GlobalApiStatus['banUser'];
};
```
하지만 이런 식으로 일일이 key값을 가지고 코딩할 순 없다.
<br/>

### 1. k 변수

```ts
// GetUserApi 간편화 : k가 변수가 되면서 위와 똑같은 코드
type GetUserApi2 = {
  [k in 'getUser' | 'pagination' | 'banUser']: GlobalApiStatus[k];
};
```

<br/>

### 2. Pick<obj, key> : obj - 가지고 오고 싶은 값, key - 불러온 obj의 key 값

1번과 같은 결괏값을 가져오지만 다른 방법으로는 Pick<> 유틸리티를 쓸 수 있다.

```ts
type PickUserApiStatus = Pick<GlobalApiStatus, 'banUser' | 'getUser' | 'pagination'>;
```

<br/>

### 3. Omit<obj, 제외key> : obj - 가지고 오고 싶은 값, 제외key - 제외하고 싶은 key
Pick과 반대되는 개념으로, Pick으로 원하는 key를 가져올 수도 있지만, 반대로 원치 않는 key가 적다면 원치않는 부분을 뺄 수도 있다.

```ts
type OmitUserApiStatus = Omit<GlobalApiStatus, 'getPosts'>;
```


<br/>


### 4. keyof : 객체의 key 값들을 Union 형태로 전부 가져올 수 있다.
일일이 key값을 손코딩할 수는 없으니, 키워드를 사용해서 key들을 불러오는 방법을 쓴다.
```ts
type AllKeys = keyof GlobalApiStatus;

// 자동완성됨
const key: AllKeys = 'banUser';
```

<br/>

keyof를 이용한 key값 가져오기 비교!
1) 직접 키 값 적용하기
```ts
type GetUserApi3 = {
  [k in 'getUser' | 'pagination' | 'banUser']: GlobalApiStatus[k];
};
```

2) keyof 키워드 사용하기
```ts
type KeyOfUserApiStatus = {
  [k in keyof GlobalApiStatus]: GlobalApiStatus[k];
};
```

<br/>

### 5. Exclude<keyof 객체, 제외할key> : keyof 키워드를 써서 Omit과 같은 효과를 줌

```ts
type KeyOfUserApiStatus2 = {
  [k in Exclude<keyof GlobalApiStatus, 'getPosts'>]: GlobalApiStatus[k];
};
```

<br/>

만약에 가져오고자 할 key 값에 옵셔널 조건을 붙인다면 전부 옵셔널로 지정할 수도 있다.
```ts
type KeyOfUserApiStatus2 = {
  [k in Exclude<keyof GlobalApiStatus, 'getPosts'>]?: GlobalApiStatus[k];
};
```

<br/>

---

<br/><br/>
























# 8. 클래스(Class)
## 8-1. 클래스 정의
클래스는 내부에 프로퍼티나 메소드를 포함해서 객체로 쓸 수 있는 구성.

<br/>

### 1. 클래스 선언하기
일반적인 `js` 에서 선언하는 것과 다름없다.
```ts
class Test {};
```

### 2. 초기화 하기
`ts`에서는 프로퍼티가 있으면 초기화까지 해줘야 한다. 그렇지 않으면 에러가 발생한다.
```ts
class Game {
  id: string;
  level: number;
// 생성자
  constructor(id: string, level: number) {
    this.id = id;
    this.level = leve;
  }

// 메소드
introduce(): string {
  return `${this.id}님의 레벨은 ${this.level}입니다.`;
};
};
```

<br/>


### 3. 객체 생성
```ts
// 생성자가 받는 순서대로 값을 입력해 줄 것
const user = new Game(
  'hello123', 30,
);

// 메소드 이용하기
user.introduce();
```

<br/>

---

<br/>









## 8-2. Readonly 속성
`class` 내부 `property`에 적용하는 것으로, 외부에서 접근하여 값을 변경할 수 없도록 지정하는 것. Java의 `private`과 비슷한 역할
<br/>

```ts
// const 같은 의미. readonly property를 만드는 것
class Game {
  readonly id: string;
  lv: number;

  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  };
}

const user = new Game('hello123', 123);


// 읽기 전용 속성이므로 'id'에 할당할 수 없습니다.ts(2540)
// user.id = 'hello567';
```

---

<br/>






## 8-3. 프로퍼티 초기화
프로퍼티를 초기화하는 방법은 4가지가 있다. 
```ts
class Game {
  // 1. 선언과 초기화 동시에 함
  id: string = 'hello123';
  // 2. Optional 값 선언
  lv?: number;
  // 3. type of undefined 선언
  server: string | undefined;

  // 4. 생성자로 초기화
  constructor(id: string, lv?: number) {
    this.id = id;
    this.lv = lv;
  };
}
```

<br/>

일반적으로는 다음과 같은 경우를 많이 사용한다. 생성자를 통해 직접 초기화를 하는 것보다, 내부에 `init()` 메소드를 만들어 놓고 해당 메소드를 생성자에서 불러서 초기화 하는 방법이다.

```ts
class RouteStack {
  // ! - 초기화 보장
  stack!: string[];

  constructor() {
    // 초기화할 때 무조건 실행: ts는 함수 내에서 초기화가 진행되는지 안되는지는 알 수 없기 때문에 !를 써서 무조건 초기화가 된다고 보장한다
    this.initialize();
  }

  // 함수 안에서 진행
  initialize() {
    console.log(`${this.stack}을 초기화합니다.`);
    this.stack = [];
    console.log(`${this.stack} 이 실행되었습니다.`);
  };
};

const route = new RouteStack();
console.log(route);
/*
undefined을 초기화합니다.
 이 실행되었습니다.
RouteStack { stack: [] }
*/
```


<br/>

---

<br/>








## 8-4. 타입과 값으로 모두 사용 가능한 Class

클래스의 정의 자체가 하나의 값처럼 쓰이기도 하지만, type으로 쓰이기도 한다.

클래스이자 곧 타입이기 떄문에 시그니처만 맞으면 클래스를 객체로 만들 수도 있다. 

<br>

```ts
class User {
  id: string;
  lv: number;

  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  }
};
// let user: User -> 클래스이자 타입
let user = new User('hello123', 30);

// 시그니처만 맞으면 클래스를 객체로 만들 수도 있다
user = {
  id: 'hello456',
  lv: 50,
};
```

<br/>

---

<br/>








## 8-5. Interface Implementation

OOP에서 다루는 인터페이스는 속성들을 추상화하고 프로퍼티를 강제할 수 있어서 굉장히 중요한 개념이다.

<br/>

### 1. 인터페이스를 활용한 type predicate
```ts
// 인터페이스
interface User {
  id: string;
  lv: number;
  hello(): string;
}

// 인터페이스를 implements 한 클래스
class UserClass implements User {
  id: string;
  lv: number;
  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  }

  hello(): string {
    return `${this.id} 님의 레벨은 ${this.lv}입니다.`;
  }
}

// 객체 생성
let user1: any = new UserClass('hello123', 30);

// type predicate를 할 함수
function instanceOfUser(object: any): object is User {
  return 'hello' in object;
}

// if 구문을 이용한 type predicate
// user1은 any 타입으로 지정되어있었음.
if (instanceOfUser(user1)) {
  user1; // 여기서는 비로소 User 타입
};
```

<br/>

### 2. 다중 인터페이스 사용
```ts
interface IName {
  name: string;
}

interface IAge {
  age: number;
}

// 인터페이스를 implements 할 수 있는 갯수는 정해져 있지 않다.
class Person implements IName, IAge {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
};
```

<br/>


### 3. 인터페이스 내부에서 클래스의 constructor를 생성하는 부분. 
제네릭을 사용할 때 자주 사용하게될 구조라서 꼭 알아둘 것.

`new(초기화할 매개변수): 클래스`

```ts
// new (초기화 매개변수): 클래스
// 이렇게 하면 이 interface는 contructor을 만드는 인터페이스가 된다.
interface PersonConstructor {
  new (name: string, age: number): Person;
}

// interface를 매개변수로 받기
function createUser(constructor: PersonConstructor, name: string, age: number) {
  // return new Person2(name, age);
  // 위처럼 넣는 거랑 똑같다.
  return new constructor(name, age);
}


console.log(createUser(Person2, 'hello', 123));
```


<br/>

---

<br/>







## 8-6. 상속

### 1. 일반 상속
```ts
class Parent {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  hello() {
    return `${this.name}이 인사합니다.`;
  };
};

class Child extends Parent {
  age: number;

  constructor(name: string, age: number) {
    super(name);
    this.age = age;
  }

  intro() {
    return `나는 ${this.age}살 입니다.`;
  }
}

const p1 = new Parent('또앙');
const c1 = new Child('또앙', 12);

p1.hello();
c1.intro();

let parent: Parent;
// 두 타입 모두 받을 수 있는 이유는, Parent가 클래스이면서 부모 타입이기 때문에
parent = p1;
parent = c1;
```

<br/>


### 2. ts에서만 가능한 타입 상속
캐스팅을 하지 않는 이상 자식 타입으로 객체 생성 시 부모타입의 변수를 받을 수 없다. <br/>
하지만 다른 언어에서는 안되는데, 타입만 체크하는 `ts` 에서는 가능한 부분이 있다.
<br/>
이를 테면 구조적 타입 상속으로, `Optional Property`를 이용하는 것이다.

```ts
class Parent2 {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
};



class Child2 extends Parent2 {
  // Optional Property
  age?: number;

  constructor(name: string, age?: number) {
    super(name);
    this.age = age;
  }
}

const p2 = new Parent('랄라');
const c2 = new Child2('룰루', 12);

let child: Child2;
child = p2; // optional로 했기 때문에 Child2 = Parent2 같은 구조로 본다
```

<br/>

---

<br/>







## 8-7. 오버라이딩
부모의 속성(메소드, 프로퍼티)을 오버라이드하기 위해서는 몇 가지 규칙이 있다.
  1. 부모 메소드와 반환 타입이 일치해야한다.
  2. 부모 메소드에 필수인 파라미터들이 존재해야 한다.
  3. 부모 메소드에서 optional한 파라미터들이 자식에서 필수로 지정되면 안된다.

<br/>

### 1. 메소드 오버라이드

```ts
class Parent {
  hello(name: string): string {
    return `안녕 ${name} - 부모`;
  }
};

class Child extends Parent {

  /**'Child' 형식의 'hello' 속성을 기본 형식 'Parent'의 동일한 속성에 할당할 수 없습니다.
  '() => void' 형식은 '() => string' 형식에 할당할 수 없습니다.
    'void' 형식은 'string' 형식에 할당할 수 없습니다.ts(2416) */
  // hello() { }

  //  Target signature provides too few arguments. Expected 2 or more, but got 1.ts(2416)

  // 오버라이드 받는 타입은 같되, 타입을 다르게 지정하고 싶으면 optional로 지정해주어야 한다. 
  hello(name: string, age?: number): string {
    return `안녕 ${name}... 나는 ${age ?? 0}살이야 - 자식`;
  }
};
```

<br/>

### 2. 프로퍼티 오버라이드
프로퍼티의 경우, 부모타입과 다른 타입으로 자식 클래스에서 생성하고 싶다면, 부모타입 속성을 `optional` 로 만들어 주거나, `union` 으로 좀 더 넓게 포함시킬 수 있는 범위를 지정해주어야 한다.


```ts
class Parent2 {
  // 여러가지 케이스들을 union으로 지정
  name: string | number;

  constructor(name: string | number) {
    this.name = name;
  }
}

class Child2 extends Parent2 {
  // string | number -> number (o)
  name: number;
  age: number;

  constructor(name: number, age: number) {
    super(name);
    this.name = name;
    this.age = age;
  };
}

```

<br/>

---

<br/>








## 8-8. Abstract Class

### 1. 추상클래스 vs. 인터페이스 `ts` 에서 말하는 추상클래스란?
---
- 상속만으로 구현할 수 있고 인스턴스화하지 못하게 만드는 클래스
- 인스턴스화는 할 수 없지만, 공유되는 값들을 메소드나 속성으로 정의하고 싶을 때 사용한다

<br/>

```ts
abstract class ModelWithId {
  id: number;

  constructor(id: number) {
    this.id = id;
  };
}


// 추상 클래스의 인스턴스를 만들 수 없습니다.ts(2511)
// const modelWithId = new ModelWithId(123);
```

<br/>


### 2. 추상클래스의 메소드 상속

```ts
abstract class ModelWithId {
  abstract getId(): void;
}

// 추상클래스를 상속하면, Product 클래스는 추상클래스의 모든 프로퍼티들을 상속받을 수 있다.
class Product extends ModelWithId {
  getId(): void {
    console.log('Product class');
  };
};

// 상속을 받은 경우
const product = new Product(1);
product.getId();


```

<br/>

---

<br/>








## 8-9. Visibility Keyword
`ts` 에서만 사용할 수 있는 접근제한자들이 있다.
1. `public`: (기본값) 어디서든 접근 가능
2. `protected`: 현재 클래스 및 하위 클래스에서 접근 가능
3. `private`: 현재 클래스 내에서만 접근 가능

<br/>

```ts
class TestClass {
  public id = 'test';
  protected id2 = 'test2';
  private id3 = 'test3';

  // js 에서만 존재하는 키워드
  #jsPrivateProperty = 'jstest3';
}

const test = new TestClass();
console.log(test.id = '바꿨지롱~');
```

<br/>

---

<br/><br/>






















# 9. 제네릭(Generic)

## 9-1. 함수에서 제네릭 사용하기

일반적으로 함수가 받는 매개변수를 any로 두는 것보다 타입을 추론할 수 있도록 함수에서 제네릭(<>)을 설정해주는 것이 좋다.

<br/>

### 1. 제네릭 선언

```ts
// 1. generic (X)
function normalValue(value: any) {
  return value; // 이 경우 value = any
}

// const resp: any -> any로 받았으니까 any가 되는 케이스
const rst = normalValue('test');


// -------------------


// 2. generic (o)
function genericValue<T>(value: T) {
  return value;
}
// generic 함수 실행
// 제네릭을 선언안하면 const rst2: "제네릭"
const rst2 = genericValue('제네릭');

// 제네릭을 선언하면 const rst3: string
const rst3 = genericValue<string>('제네릭');

```

<br/>

### 2. 제네릭 여러 개 사용하기
```ts
function multipleGenerics<X, Y>(x: X, y: Y) {
  return { x, y };
}

/*
const rst4: {
    x: string;
    y: number;
} 타입유추가 자동으로 됨*/
const rst4 = multipleGenerics('123', 123);

/*
const rst5: {
    x: boolean;
    y: string;
}
*/
const rst5 = multipleGenerics<boolean, string>(true, '123');
```


<br/>


### 3. Tuple 만들기 : as const
1. `as const` 키워드를 사용해서 tuple을 반환하는 함수를 만든다.
2. 값으로 들어갈 타입을 제네릭으로 선언해준다.

```ts
function getTuple<X, Y>(tu1: X, tu2: Y) {
  return [tu1, tu2] as const;
}

// const tuple: readonly [boolean, string]
const tuple = getTuple(true, 'tuple');
```

<br/>

### 4. 제네릭으로 받는 constructor 양식: 생성자를 자동으로 만들어주는 함수
- 제네릭으로 받을 형식을 입력한다
- 이 받을 형식이 생성자 형식이다
- `new(): {}` : 객체를 생성하는데, 그 반환값으로 객체를 반환하겠다는 의미가 된다
- `...args` : 인자의 갯수에 제한을 두지 않겠다는 의미
- T 타입으로 받을건데, 이것을 타입과 연결시키기 위해서는 `extends` 키워드를 사용한다.

```ts
function instantiator<T extends {new(...args: any[]): {}}>(constructor: T, ...args: any[]) {
  return new constructor(...args);
};

// 함수(생성할클래스, 초기화할 속성들)
console.log(instantiator(User, 'user1', 13));
``` 


<br/>

---

<br/><br/>

## 9-2. 인터페이스에서 제네릭 사용하기


### 1. 기본 제네릭

- 캐시를 저장하는 구조를 만들 때 인터페이스와 제네릭을 사용할 수 있다.

```ts
interface Cache {
  data: [];
  lastUpdate: Date;
};
```

<br/>

제네릭에 string을 넣어준 순간, data의 타입은 string으로 고정된다.
```ts
const c1: Cache<string> = {
  data: ['1', '2', '3'],
  lastUpdate: new Date(),
};

console.log(c1);
```

<br/>

### 2. 제네릭의 기본값 지정
제네릭을 입력하지 않을 때 자동으로 기본 타입으로 유추될 수 있도록 지정할 수 있다.

<br/>

```ts
interface Cache2<T = string> {
  data: T[];
}

// const c2: Cache2<string> -> 제네릭을 사용하지 않았을 때 기본으로 string으로 유추됨 
const c2: Cache2 = {
  data: ['1', '2']
};


```

<br/>

---

<br/><br/>

## 9-3. 타입에서 제네릭 사용하기

인터페이스에서 사용하는 것과 비슷하다.

```ts
type Sample<T> = T;
const s: Sample<string> = 'sample';
```

<br/>

---

<br/><br/>

## 9-4. 클래스에서 제네릭 사용하기

### 1. 기본 제네릭 설정
클래스에서는 프로퍼티로 받을 타입을 클래스의 제네릭으로 설정할 수 있다.

```ts
class Pagination<D, M = string> {
  // data는 제네릭 D타입으로 받고싶다는 의미
  data: D[] = [];
  // optional로 지정한 message는 M 타입 (기본값 strings)
  message?: M;
  lastFetchAt?: Date;
}

const pp = new Pagination<number>();
pp.data = [1, 2, 3];
pp.message = 'ssss';
```

<br/>

### 2. 생성자에 제네릭 적용
```ts
// 생성자를 통해 초기화
class Pagination2<D, M = string> {
  data: D[];
  message?: M;
  lastFetchAt?: Date;

  constructor(data: D[], message?: M, lastFetchAt?: Date) {
    this.data = data;
    this.message = message;
    this.lastFetchAt = lastFetchAt;
  }
}

// 입력하지 않았지만 D의 데이터형이 자동으로 유추됨
// const pp2: Pagination2<number, string>
const pp2 = new Pagination2([123]);
```

<br/>

---

<br/><br/>

## 9-5. 상속에서 제네릭 사용하기

### 1. 제네릭에 상속 이용하기
- 제네릭에 상속을 이용하면, 상속을 받는 객체에는 무조건 해당 타입이 들어가야 한다.

```ts
interface BaseGeneric {
  name: string;
};

// BaseGeneric에서 설정한 name 프로퍼티는 무조건 있어야 한다
// info는 name:string 을 쓸 수 있다.
class User<T extends BaseGeneric> {
  info: T;

  constructor(info: T) {
    this.info = info;
  };
}

```

<br/>

### 2. keyof 를 사용해서 제네릭으로 받을 obj의 key 가져오기
- 실전에서 주로 이용
- obj 타입으로는 어떠한 것도 들어올 수 있다.
- key는 절대적으로 들어오는 obj 타입에 존재하는 key값이라고 약속을 해야한다.
- `K extends keyof O`: K라는 key는 O라는 객체의 key가 될 거라는 의미.

<br/>

```ts
const testObj = {
  a: '랄랄라',
  b: '룰룰루',
  c: '릴릴리',
};

function objParser<O, K extends keyof O>(obj: O, key: K) {
  return obj[key];
};

console.log(objParser(testObj, 'a'));
// '랄랄라'

```

<br/>

### 3. 삼항연산(Ternary)
- 해당 유저의 타입을 결정하는데, 유저가 남자인지 여자인지 확인하는 상황을 삼항연산을 통해서 알아볼 수 있다.

```ts
class Gender {
  type?: string;
}

class Female extends Gender {
  type: 'F' = 'F'; // type이 F면 F
};

class Male extends Gender {
  type: 'M' = 'M' // type이 M 이면 M
};
```

<br/>

타입을 지정하는데 `Gender`을 상속받으면서 `T`가 extends한 객체가 `Female`이면 'F'를, 그렇지 않으면 'M'을 나타내도록 만든다.

<br/>

```ts
type UnKnownGender<T extends Gender> = T extends Female ? Female : Male;


// const user: Female
const user: UnKnownGender<Female> = new Female();

// const user2: Male
const user2: UnKnownGender<Male> = new Male();
```


<br/>

---

<br/><br/>

## 9-6. 메소드에서 제네릭 사용하기

### 1. logTime을 찍는 메소드

```ts
class User<T> {
  id: T;

  constructor(id: T) {
    this.id = id;
  }

  // logTime을 찍는 메소드
  logTime<T>(logTime: T) {
    return `${this.id}의 ${logTime} `;
  }
}

const user = new User('user123');

console.log(user.logTime(new Date()));
```

<br/>

### 2. 제네릭 중복
클래스의 제네릭과 메소드의 제네릭이 동시에 같은 문자로 선언이 된다면?? - 메소드 안에서는 메소드의 제네릭을 쫓아간다.

```ts
class DupGeneric<T> {
  hello<T>(logTime: T) {
    console.log(`현재 시간은 ${logTime} 입니다`);
  }
};

// 클래스의 제네릭은 string
const temp = new DupGeneric<string>();

// 메소드의 제네릭은 Date
temp.hello<Date>(new Date());
```

<br/>

---

<br/><br/>

## 9-7. implementation에서 제네릭 사용하기

### 1. interface만 갖는 제네릭타입
```ts
// 인터페이스에만 존재
interface Singer<T, V> {
  name: T;
  sing(year: V): void;
}

class Idol implements Singer<string, string> {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sing(year: string): void {
    console.log(`${this.name}의 데뷔년도는 ${year}년 입니다.`);
  };

}

const idol = new Idol('아이유');
idol.sing('2006');
```

<br/>

### 2. 클래스에서 넘겨받는 제네릭타입
```ts
// 클래스에서 넘겨받을 수 있음
class Idol2<T, V> implements Singer<T, V> {
  name: T;
  constructor(name: T) {
    this.name = name;
  }
  sing(year: V): void {
    console.log(`${this.name}의 데뷔년도는 ${year}년 입니다.`);
  };

}

const idol2 = new Idol('뉴진스');
idol2.sing('2022');
```


<br/>

---

<br/><br/>

## 9-8. Promise에서 제네릭 사용하기

비동기 프로그램에서 사용할 수 있으므로 `Promise`는 가장 많이 사용하는 타입이다.

### 1. Promise가 반환하는 값이 unknown?

```ts
// 이때 `r`의 반환타입은 unknown이다
const afterTwoSec = function () {
  return new Promise((r) => {
    setTimeout(() => r('done'), 2000);
  });
};
```

<br/>

### 2. Promise에 반환타입을 지정해준다
위의 문제를 해결하기 위해서는, 함수 내부에서 반환하고자하는 Promise 타입을 제네릭으로 지정해주면 된다.

```ts
// Promise<string>
//  r: (value: string | PromiseLike<string>) => void
const afterThreeSec = function (): Promise<string> {
  return new Promise((r) => {
    setTimeout(() => r('완료'), 3000);
  });
};
```

<br/>

---

<br/><br/>








# 10. 유틸리티 타입(Utility)
> partial <br/>
> Required <br/>
> Readonly <br/>
> Pick <br/>
> Omit <br/>
> Exclude <br/>
> Extract <br/>
> NonNullable <br/>
> Parameters <br/>
> ConstructorParameters <br/>
> Return <br/>
> Template Literal <br/>

<br/>

## 1. Partial<타입>
---
- 가장 많이 쓰이는 `ts` 타입 중 하나
- 데이터베이스를 다루는 서버를 조작할 때 많이 쓰임
- `Partial<타입>`: 타입으로 입력한 값 들을 읽어올 수 있도록 도와줌

<br/>

```ts
// 인터페이스
interface User {
  id: string;
  lv: number;
  server: string;
};

// 객체
const user1: User = {
  id: 'abc111',
  lv: 10,
  server: 'main',
};

// 업데이트 함수
function updateUser(origin: User, updates: Partial<User>): User {
  return {
    // 기존의 값
    ...origin,
    // 덮어씌워짐
    ...updates,
  };
};

// 활용
console.log(updateUser(user1, {
  lv: 13,
}));
```

<br/>

## 2. Requied<타입>
---
- 전부 필수로 만들어주는 키워드
- Required 제네릭에 넣은 타입에 옵셔널이 포함되었든 아니든 모두 필수로 만들어주는 타입키워드
- `Required<타입>`
- Optional로 선언 후 그냥 User로 타입을 지정하면 에러가 나지 않지만, Required 타입을 사용하는 순간 아래와 같은 에러 발생.
- 'server' 속성이 '{ id: string; lv: number; }' 형식에 없지만 'Required<User>' 형식에서 필수입니다.ts(2741)

```ts
// 인터페이스
interface User {
  id: string;
  lv: number;
  // 옵셔널: 원래는 안써도 가능
  server?: string;
}

// Required<타입>
const user1: Required<User> = {
  id: 'user1',
  lv: 10,
  server: 'main',
};
```

<br/>

## 3. Readonly<타입>
---
- 타입에 접근할 수 없도록 `const` 화를 만드는 방법

```ts
// 인터페이스
interface User {
  id: string;
  lv: number;
}

// Readonly (X)
const user1: User = {
  id: 'user1',
  lv: 8,
};

// 접근해서 변경이 가능하다
user1.id = 'user10';


// Readonly<타입> 적용
const user2: Readonly<User> = {
  id: 'user2',
  lv: 10,
};

// 읽기 전용 속성이므로 'id'에 할당할 수 없습니다.ts(2540)
user2.id = 'user20';


// JavaScript에서 Readonly 속성을 만드는 방법
Object.freeze(user2);

```

<br/>

## 4. Pick<타입>
---
- `Pick<타입>`: 타입 중에서 특정 부분만 골라서 사용하고 싶을 때 주로 사용한다.

```ts
// 인터페이스
interface Post {
  title: string;
  content: string;
  // 이 부분은 자동생성 원함
  createdAt: Date;
}

// 포스트를 생성할 때, 생성 날짜는 자동으로 생성하는 경우
function createPost(post: Pick<Post, 'title' | 'content'>): Post {
  return {
    ...post,
    createdAt: new Date(),
  };
}

// 결과
console.log(createPost({
  title: '안녕하세요',
  content: '반가워요',
}));
```

<br/>

## 5. Omit<타입>
---
- `Omit<타입>`: Pick의 반대로 제외하고 싶은 부분만 추출하는 키워드

```ts
function createPost(post: Omit<Post, 'createdAt'>): Post {
  return {
    ...post,
    createdAt: new Date(),
  };
}
```

<br/>

## 6. Exclude
---
- `Exclude<타입 Union, 제외할 타입>` : 첫 번째 파라미터에는 타입들을 Union으로 묶어주고, 두 번째 타입은 그것들 중 제외할 타입을 넣어준다.
- `Pick`, `Omit`은 주로 객체타입으로 지정했지만, `Exclude`의 경우 Union으로 사용

```ts
type NoString = Exclude<string | boolean | number, string>;

type NoFunction = Exclude<string | (() => void), Function>;
```

<br/>


## 7. Extract
---
- Exclude의 반대 개념
- `Extract<타입 Union, 제외할 타입>` : 첫 번째 파라미터에는 타입들을 Union으로 묶어주고, 두 번째 타입은 그것들 중 추출할 타입을 넣어준다.

```ts
type OnlyString = Extract<string | boolean | number, string>;

type OnlyFunction = Extract<string | (() => void), Function>;
```

<br/>


## 8. NonNullable
---
- Union으로 입력한 타입들 중 Null이 될 수 없는 타입들만 유추해줌

```ts
// null의 경우 null이고, undefined도 null이 될 수 있기 때문에 실제는 type NonNull = string | number

type NonNull = NonNullable<string | null | number | undefined>;
```

<br/>

## 9. Parameters
---
- `Parameters<>`: 파라미터로 받을 타입을 type으로 만들 수 있다.

```ts
function sampleFunction(x: number, y: number) { }

type Params = Parameters<typeof sampleFunction>
```

<br/>


## 10. ConstructorParameters
---
- `ConstructorParameters<typeof 클래스>` : 클래스의 생성자(Construct)의 parameters를 타입으로 만들 수 있다.

```ts
class User {
  id: string;
  age: number;

  constructor(id: string, age: number) {
    this.id = id;
    this.age = age;
  };
}

type ConstructorParam = ConstructorParameters<typeof User>;
```

<br/>


## 11. Return
---
- `ReturnType<함수>`: 어떤 함수가 있을 때 반환하는 반환값 타입을 알고 싶을 때

```ts
type ReturnTypeSample = ReturnType<() => string>;
```

<br/>


## 12. Template Literal
---
- `string` 타입을 조작할 때 쓰이는 몇 가지 타입들

```ts
type Name = 'name';

// UpperCase:  "NAME"
type NameUpper = Uppercase<Name>;

// LowerCase:  "name"
type NameLower = Lowercase<Name>;

// Capitalize: "Name"
type NameCap = Capitalize<Name>;

// UpCapitalize: "name"
type NameUnCap = Uncapitalize<Name>;
```


<br/>

---

<br/><br/>






# 11. 실험적 데코레이터(Experimental Decorators)
> Experimental Decorator 기능을 사용하기 위해서는 `tsconfig` 상에서 `experimentalDecorators` 를 uncommant 해주어야 한다. -> 아직 정식으로 제공하지 않는 기능

* `Nest.js` 에서 자주쓰는 기능

<br/>

## 1. Class Decorator
---
- Decorator를 사용하면, 해당 클래스를 받아서 함수 내에서 사용할 수 있다.

### 1. 클래스 선언
```ts
class User {
  id: string;
  lv: number;

  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  }
}
```

<br/>

### 2. 데코레이터로 적용할 클래스 선언

```ts
// 컨스트럭터 가져와보기
function Test(constructor: Function) {
  console.log(constructor);
}

// 해당 클래스 얼리기(Readonly)
function Frozen(constructor: Function) {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}

const user1 = new User('user1', 10);
// 타입이 얼려있는지(!) 찍어보기
console.log(Object.isFrozen(Object.getPrototypeOf(user1))); // true
```


<br/>

### 3. 생성한 함수를 클래스의 데코레이터로 달아줌
```ts
@Test
@Frozen
class User {...}
// 데코레이터는 아래에서부터 실행된다.
```

<br/>

### 4. 데코레이터 팩토리: 데코레이터 함수가 실행되면서 파라미터를 넘겨주고 싶을 때 사용
데코레이터가 선언에 적용되는 방식을 사용자가 정의하게 하려면 데코레이터 팩토리를 작성할 수 있다. <br/>
데코레이터 팩토리는 데코레이터가 런타임에 호출할 표현식을 반환하는 함수다.


```ts
@LogTest('prod')
class User {...}

// 이 함수가 실행하고자 하는 부분은 데코레이터 함수. 
function LogTest(env: string) {
  return function (constructor: Function) {
    console.log(`[${env}] ${constructor}가 실행되었습니다.`);
  }
}
```

<br/>

### 5. 데코레이터는 언제 실행될까?
처음 클래스가 읽힐 때, 그러니까 처음 클래스의 생성자가 실행될 때 딱 한 번 실행되고, 그 이후에 객체화할 때는 실행되지 않는다.

하지만 생성자를 받아오는 함수를 활용한다면, 객체화가 될 때마다 데코레이터를 실행하게 할 수 있다.

```ts
// 데코레이터 클래스 변경
// T 타입의 constructor는 어디에서든 인스턴스화를 할 수 있는 컨스트럭터
function ChangeClass<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    server = 'main'; // 컨스트럭터로 받는 쪽에 server 라는 값을 추가

    constructor(...params: any[]) {
      super(...params);

      console.log('constructor init !!!');
    }
  }
}
```


<br/><br/>

## 2. Method Decorator
---

### 1. 클래스 내 메소드에 데코레이터 활용
---
```ts
class User {
  id: string;
  lv: number;

  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  }

  // 2. 메소드 데코레이터 사용
  @TestMethodDecorator
  hello() {
    return `${this.id}님의 레벨은 ${this.lv} 입니다.`;
  }
}
// target: static method에 데코레이팅을 할 경우 생성자 함수
//         instance method에 데코레이팅을 할 경우 인스턴스의 프로토타입
// propertyKey: 메소드 이름
// descriptor: 프로퍼티 디스크립터
function TestMethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('Log call');
  console.log('--- target -----');
  console.log(target);
  console.log('--- propertyKey -----');
  console.log(propertyKey);
  console.log('--- descriptor -----');
  console.log(descriptor);
}
```


<br/>


### 2. PropertyDescriptor
---
객체 프로퍼티는 값(value)과 함께 플래그(flag)라 불리는 특별한 속성 세 가지를 갖는다. 
- writable : `true` 면 값을 수정할 수 있다.
- enumerable : `true` 면 반복문을 사용해 나열 할 수 있다.
- configurable: `true`면 프로퍼티 삭제나 플래그 수정이 가능하다. 
- 평범한 방식으로 프로퍼티를 만들면 해당 프로퍼티의 플래그는 모두 `true`가 된다.
- `Object.getOwnPropertyDescripton()` 메소드를 이용하면 특정 프로퍼티에 대한 정보를 모두 얻을 수 있다.

```ts
// obj: 정보를 알고자 하는 객체 내 프로퍼티
// propertyName: 정보를 얻고자 하는 객체 내 프로퍼티
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```
<br/>

- 위 메소드를 호출하면 '프로퍼티 설명자(descriptor)'라 불리는 객체가 반환되는데, 여기에는 프로퍼티 값과 세 플래그에 대한 정보가 담겨 있다.
- `Oobject.defineProperty(obj, propertyName, descriptor)` 을 사용해서 플래그를 변경할 수 있다. 
```ts
Object.defineProperty(user, 'name', {
  value: 'John',
});
```

<br/>

'평범한 방식'으로 객체 프로퍼티 `user.name`을 만들었을 때와 `defineProperty`를 이용하여 프로퍼티를 만들었을 때의 가장 큰 차이점은 플래그에 있다. `defineProperty`를 사용해 프로퍼티를 만든 경우에는 descriptor에 플래그 값을 명시하지 않으면 플래그 값이 자동으로 `false`가 된다. 

<br/>


### 3.  인스턴스화와 데코레이터 실행
클래스를 객체화하면, 데코레이터로 인해 메소드가 자동 실행된다. 객체를 통해 메소드를 따로 부르지 않아도 데코레이터를 통해 실행이 된다.

<br/>


### 4. PropertyDescriptor을 변경하는 함수
```ts
 @Configurable(false)
 hello() {
    return `${this.id}님의 레벨은 ${this.lv} 입니다.`;
  }

function Configurable(configurable: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = configurable;
  }
}

console.log(Object.getOwnPropertyDescriptors(User.prototype)); // true -> false로 변경됨
```

<br/>

### 5. PropertyDescriptor가 가지고 있는 함수값 변경하기
함수가 불릴 때마다 로그를 찍는 메소드

```ts
function MethodCallLogger(env: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`${env} running: ${propertyKey}`);
      // 이 메소드에 값을 반환한 것
      const result = originMethod.apply(this, ...args);

      return result;
    }
  }
}
```



<br/><br/>


## 3. Accessor Decorator
---
- 접근 가능 데코레이터로 메소드 데코레이터와 유사하다.

```ts
// 클래스 생성
class Rectangle {
  // #은 js private 값 : 외부에서 access 못함
  #height: number;
  #width: number;

  constructor(height: number, width: number) {
    this.#height = height;
    this.#width = width;
  }

  @Configurable(false)
  get height() {
    return this.#height;
  }

  @Configurable(false)
  get width() {
    return this.#width;
  }

  set height(height: number) {
    this.#height = height;
  }

  set width(width: number) {
    this.#width = width;
  }
}


// configurable 변경 메소드 : getter의 설정값을 변경할 수 없도록 막아주는 것
function Configurable(configurable: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = configurable;
  }
}
```

<br/><br/>


## 4. Property Decorator
---
프로퍼티 데코레이터는 메소드 데코레이터와 달리 필수 입력값이 2개이다. 
- `target`: 타겟
- `propertyKey` : 프로퍼티의 이름

```ts
class User {
  @PropertyLogger
  id: string;
  @PropertyLogger
  lv: number;

  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  }
}


// Property Logger
function PropertyLogger(target: any, propertyKey: string) {
  console.log(`${propertyKey}가 정의 되었습니다.`);
  // id가 정의 되었습니다.
}
```

<br/><br/>


## 5. Parameter Decorator
---
- Reflection과 함께 쓸 때 유용함
- 파라미터에 데코레이터를 먼저 쓰는 형태
- 데코레이터 함수가 먼저 실행됨

```ts
class User {
  id: string;
  lv: number;

  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  }

  hello(@LogParam adj: string) {
    console.log(`${this.id}가 ${adj} 입니다.`);
  }
}

// 이렇게 파라미터로 들어가는 부분을 데코레이팅함
const user = new User('user1', 1);
user.hello('바보');

function LogParam(target: any, propertyKey: string, paramIndex: number) {
  console.log(`${paramIndex}번째 파라미터인 ${propertyKey}가 입력되었습니다.`);
}
```

<br/>

---

<br/><br/>











# 12. Reflection
reflect metadata 라는 라이브러리를 설치해서 `Decorator`을 다양한 기능과 함께 사용할 수 있도록 할 수 있음

설치 <br>
`npm install -save-dev reflect-metadata`


<br/>

## 12-1. Reflection Metadata
---

### 1. 다운받은 패키지 import
---
`import 'reflect-metadata';`


<br/>

### 2. 메타데이터로 받는 파라미터의 정의
---
메타데이터란? 데이터의 데이터를 의미한다.

- 1) 메타데이터의 키
- 2) 메타데이터 키에 저장할 값
- 3) 메타데이터를 저장할 객체
- 4) 메타데이터를 저장할 객체의 프로퍼티
- ** 4)는 필수값이 아님 **

<br/>

### 2. Reflect 객체 쓰는 방법
---

1. `defineMetadata` : 메타데이터 정의, 하나의 키 값에는 하나의 값만 저장되며, 가장 최근에 저장한 값으로 덮어 씌워진다.
```ts
Reflect.defineMetadata('test-meta', 123, user);

Reflect.defineMetadata('test-meta', 456, user); // 이 경우 test-meta : 456
```

2. `getMetadata(어떤 키, 어디서 가져올지)`: 메타데이터 가져오기
```ts
Reflect.getMetadata('test-meta', user)
```

3. 메타데이터에 객체 저장하기
```ts
Reflect.defineMetadata('test-meta2', { name: '은정' }, user);
console.log(Reflect.getMetadata('test-meta2', user));
```

4. 객체 말고, 객체의 프로퍼티에 저장하기
```ts
Reflect.defineMetadata('obj-meta', 999, user, 'name');
// 4번째 키에 어떤 이름으로 저장할지 기재
```

5. `Reflect.deleteMetadata(삭제할 키값, 가져올 객체)`: 메타데이터 삭제하기
```ts
Reflect.deleteMetadata('obj-meta', user);

console.log(Reflect.getMetadata('obj-meta', user)); // 삭제했으니까 undefined
console.log(Reflect.hasMetadata('obj-meta', user)); // false
```

6. `Reflect.getMetadataKeys(가져올 객체)` :객체 내 메타데이터의 모든 키 값 가져오기
```ts
console.log(Reflect.getMetadataKeys(user));
```

7. 자기 자신 계층에 메타데이터가 존재하는지 확인하기
```ts
console.log(Reflect.getMetadataKeys(user)); // 부모 객체에 있는 프로토타입 메타데이터도 가지고 옴
console.log(Reflect.getOwnMetadataKeys(user)); // 현재 자신 객체에 있는 메타데이터만 가지고 옴
```


<br/>

---

<br/>

## 12-2. Decorator와 Reflect Metadata 조합 

Validation을 할 때 `reflect_metadata` 와 `Decorator`을 함께 사용한다.



<br/>

---

<br/><br/>










# 13. Namespace

## 13-1. Namespace
예전 ECMA 모듈을 쓰기 직전에 사용했던 영역을 나누는 키워드로, 옛날 프로젝트를 관리할 때 사용할 수도 있다. (지금은 depricated)

<br/>

```ts
// 독립된 공간이 되어버림
namespace Home {
  class User {
    id: string;

    constructor(id: string) {
      this.id = id;
    }
  }

  // 클래스는 접근못하지만, 해당 객체는 다른 네임스페이스에서 접근할 수 있도록 하기 위해서는 export 키워드를 사용한다.

  export const user1 = new User('user1');
}


namespace Hoem2 {
  // namespace이름.export한 객체
  Home.user1

  const admin = {
    id: Home.user1.id, // 이런식으로 사용가능
    pw: '123123',
  };
}
```

<br/>

---

<br/><br/>












# 14. Import & Export (ECMA Module)

## 14-1. Import & Export
<br/>

```ts
// 현재 파일에서 작성한 부분을 불러와서 사용할 때

// 1. export
// type도 export가 가능하다
// interface도 가능하다
import { User2 } from '../11_experimental_decorator/5_parameter_decorator';

// 2. export default
// export default 는 파일당 1개만 있을 수 있다 - 이름은 기준이 아니다
// interface는 안된다. -> interface는 TS의 타입이라서
import User from '../11_experimental_decorator/5_parameter_decorator';


// 3. whildcard
import * as All from '../11_experimental_decorator/1_class_decorator';

// 4. tsconfig - baseUrl 옵션설정
// baseUrl을 uncomment 해주면 최상위 경로를 기준으로 불러올 수도 있게 된다.

import * as all from '11_experimental_decorator/1_class_decorator';
```



---

<br/><br/>









# 15. Infer
## 15-1. Infer 키워드
- `infer` : 유추하다
- `infer E` 를 사용하면 내부에서 `E` 라는 타입을 추론할 수 있다. 
- 조건문 속에서 특정 타입을 추론할 수 있게 해주고, 그 추론을 통해 새로운 타입을 반환할 수 있게 도와준다.

<br/>

### 1. 가장 많이 사용하는 예제: Flattening
---
- flattening: Array를 벗겨내는 것
- string[] -> string
- string[][] -> string[]

```ts
type Flatten<T> = T extends Array<infer E> ? E : T;

// 위랑 같은 코드
type Flatten2<T> = T extends (infer E)[] ? E : T;

type StringArray = Flatten<string[]>;
type NumberArray = Flatten<number[]>;
```

<br/>

### 2. Return Type 추론
```ts
type InferReturnType<T> = T extends (...args: any[]) => infer E ? E : T; 
```


<br/>

---

<br/>


