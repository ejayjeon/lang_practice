"use strict";
/* Type and Interface
1. Type : 타입은 쉽게 말해 TS의 타입에 이름을 지어주는 역할을 함
- 이름을 지어주면 Type 명칭을 가지고 타입을 이용
*/
Object.defineProperty(exports, "__esModule", { value: true });
const chooseGender = 'male';
const user1 = { name: '홍길동', age: 20 };
const user2 = {
    name: '김영희',
    age: 20,
    gender: 'female',
};
// age / gender 은 optional 타입이기 때문에 쓰지 않아도 됨
const user3 = {
    name: '전은정',
};
