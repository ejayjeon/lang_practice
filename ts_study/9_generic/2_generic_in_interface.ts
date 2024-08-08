/** interface에서 제네릭 사용 */

// 캐시를 저장할 때 사용
interface Cache<T> {
  data: T[];
  lastUpdate: Date;
}

// 제네릭에 string을 넣어준 순간, data의 타입은 string이여야함 
const c1: Cache<string> = {
  data: ['1', '2', '3'],
  lastUpdate: new Date(),
};

console.log(c1);


// 제네릭을 입력하지 않을 시 기본 타입을 지정해줄 수 있다. 

interface Cache2<T = string> {
  data: T[];
}


// const c2: Cache2<string> -> 제네릭을 사용하지 않았을 때 기본으로 string으로 유추됨 
const c2: Cache2 = {
  data: ['1', '2']
};



