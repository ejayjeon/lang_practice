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
}