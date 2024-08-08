/** 상속의 Extetention */

interface IName {
  name: string;
}


// IName 을 상속받음
interface IHuman extends IName {
  age: number;
}

// 마지막 interface 프로퍼티를 이용
const human: IHuman = {
  name: '전은정',
  age: 30,
}


// type Extention

type TName = {
  name: string;
};

// type TAge extends TName = {
//   age: number;
// }; ->이렇게 선언할 수 없다.

type TAge = TName & { age: number };

const human2: TAge = {
  name: '은정',
  age: 30,
};



// 타입과 인터페이스간 extends가 가능함
interface IHuman extends TName {
  age: number;
}

type TAge2 = IName & {
  age: number
};

const human3: TAge2 = {
  name: '은정',
  age: 30,
}



// 여러 개도 extends가 가능함
interface ICatName {
  name: string;
}

interface ICatAge {
  age: number;
}

interface ICat extends ICatName, ICatAge {
  breed: string;
}

const cat1: ICat = {
  name: '나비',
  age: 2,
  breed: '치즈냥이',
};


// Overriding
type THeight = {
  height: number | string; // never 타입을 피하기 위해서 union 사용
}

// THeight을 Overriding해서 다른 타입으로 변경 ?? X
type TRectangle = THeight & {
  height: string;
  width: string;
}

// const rec: TRectangle = {
//   height: '10', // 'string' 형식은 'never' 형식에 할당할 수 없습니다.
//   weight: '30',
// };

const rec: TRectangle = {
  height: '10',
  width: '30',
}