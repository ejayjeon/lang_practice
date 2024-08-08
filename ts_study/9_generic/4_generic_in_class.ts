/** Generic in Class */

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