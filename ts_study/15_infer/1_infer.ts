/** infer 키워드
 * - infer : 유추하다
 * - 타입을 한 번 더 유추하게 해주는 기능
 * - Inferring Type in Conditional Type : 조건에 따라 타입을 유추하게 하는 것
*/


// 1) 가장 많이 사용하는 예제: flattening -> Array를 벗겨낼 때

// string[] -> string
// stringp[][] -> stringp[]


// type Flatten<T> = T extends Array<string> ? string : T;

// Array의 명칭이 그대로 들어갈 수 있도록
// infer : 내부에서 타입을 새로 만들어서 사용할 수 있다.
// E 타입을 추론해! 
type Flatten<T> = T extends Array<infer E> ? E : T;

// 위랑 같은 코드
type Flatten2<T> = T extends (infer E)[] ? E : T;

type StringArray = Flatten<string[]>;
type NumberArray = Flatten<number[]>;





// 2) Return Type 추론
// Type은 여러 개의 arguments를 받을 수 있다.
// E 를 내부에서 추론해서, 이 타입으로 결정해줌
// 조건문 속에서 특정 타입을 추론할 수 있게 해주고 추론을 통해서 새로운 타입을 반환하게 해줌
type InferReturnType<T> = T extends (...args: any[]) => infer E ? E : T; 