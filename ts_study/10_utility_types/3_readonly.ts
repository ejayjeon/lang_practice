/** readonly 타입 : Tuple */

interface User {
  id: string;
  lv: number;
}

const user1: User = {
  id: 'user1',
  lv: 8,
};

// 접근해서 변경이 가능하다
user1.id = 'user10';



const user2: Readonly<User> = {
  id: 'user2',
  lv: 10,
};

// 읽기 전용 속성이므로 'id'에 할당할 수 없습니다.ts(2540)
// user2.id = 'user20';
// JavaScript에서 Readonly 속성을 만드는 방법
Object.freeze(user2);