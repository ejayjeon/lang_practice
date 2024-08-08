/** Reflection과 함께 쓸 때 유용함 */

export default class User {
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

export class User2 {

}