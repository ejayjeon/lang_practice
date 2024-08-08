// 1. Partial Type : 가장 많이 쓰는 타입 중  하나 - 서버에서 데이터베이스 모델 업데이트할 때 많이 쓴다.

interface User {
  id: string;
  lv: number;
  server: string;
};

const user1: User = {
  id: 'abc111',
  lv: 10,
  server: 'main',
};

// partial: 새로 값을 입력한 것만 update 하고자 할 때,
// Partial<타입>: 타입으로 입력한 값 중에 하나를 가져옴
function updateUser(origin: User, updates: Partial<User>): User {
  return {
    // 기존의 값
    ...origin,
    // 덮어씌워짐
    ...updates,
  };
};

console.log(updateUser(user1, {
  lv: 13,
}));