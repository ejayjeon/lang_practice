/** NameSpace : ECMA 모듈 관리하기 전에
 * 옛날 프로젝트를 관리할 때 사용할 수도 있음
 * 특정 관련 모듈을 하나로 묶을 때
 * 지금 타입스크립트를 배울 땐 쓸 일이 없다.
 */



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