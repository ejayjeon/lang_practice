/** 제네릭에 넣은 타입이 옵셔널이든 아니든 모두 필수로 만들어주는 기능 */

interface User {
  id: string;
  lv: number;
  server?: string;
}

// Optional로 선언 후 그냥 User로 타입을 지정하면 에러가 나지 않지만, Required 타입을 사용하는 순간 아래와 같은 에러 발생.
// 'server' 속성이 '{ id: string; lv: number; }' 형식에 없지만 'Required<User>' 형식에서 필수입니다.ts(2741)
const user1: Required<User> = {
  id: 'user1',
  lv: 10,
  server: 'main',
};