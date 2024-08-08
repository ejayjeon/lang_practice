
// 객체를 중첩해서 선언
type TPerson = {
  id: {
    name: string,
    age: number,
  },
  phone: string,
};


// 중첩해서 객체를 선언하는 것이 좋은지, 분리해서 사용하는 것이 좋은지

// Nesting된 객체를 분리해서 사용할 때 나중에 에러 관리가 쉽다.
type TId = {
  name: string,
  age: number,
};

type TUser = {
  id: TId,
  phone: string,
};