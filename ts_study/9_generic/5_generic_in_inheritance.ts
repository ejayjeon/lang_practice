/** 상속에서 제네릭 사용하기 */

interface BaseGeneric {
  name: string;
};

// 제네릭에 상속을 해버리면, 무조건 해당 타입이 들어가야 한다.
// BaseGeneric에서 설정한 name 프로퍼티는 무조건 있어야 한다
class User<T extends BaseGeneric> {
  info: T;

  constructor(info: T) {
    this.info = info;
  };
}


/** 실전에서 많이 사용: keyof */

const testObj = {
  a: '랄랄라',
  b: '룰룰루',
  c: '릴릴리',
};

// obj 타입은 무엇이든 들어올 수 있으니까 O
// key는 절대적으로 O라는 타입에 존재하는 key만 넣을 거라는 약속을 해야함.
// K extedns keyof O : K라는 key는 O의 속성을 상속받는 key가 될거라는 의미!
function objParser<O, K extends keyof O>(obj: O, key: K) {
  return obj[key];
};

console.log(objParser(testObj, 'a'));



// Ternary : 삼항연산
// 해당 유저가 남자인지 여자인지 확인하는 상황

class Gender {
  type?: string;
}

class Female extends Gender {
  type: 'F' = 'F'; // type이 F면 F
};

class Male extends Gender {
  type: 'M' = 'M' // type이 M 이면 M
};

// 타입을 지정하는데, Gender을 상속받으면서, T가 extends한 것이 Female이면 ? 'F'를, 그렇지 않으면 'M'을 반환하도록 만든 것
type UnKnownGender<T extends Gender> = T extends Female ? Female : Male;


// const user: Female
const user: UnKnownGender<Female> = new Female();

// const user2: Male
const user2: UnKnownGender<Male> = new Male();