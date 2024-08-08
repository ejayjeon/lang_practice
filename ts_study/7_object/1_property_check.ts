/**
 * 초과 속성 검사
 * - 이미 선언이 되있는 변수를 다른 변수에 옮겨 넣을 때는, ts는 객체의 타입을 보게 된다. 속성이 초과되는지 여부는 확인하지 않음.
 */

type TName = {
  name: string;
};

type TAge = {
  age: number;
}

const iu = {
  name: '아이유',
  age: 30,
};

// 반대로 하면 안되는데, 이미 선언이 되어있는 객체를 반대로 할당하고자 하면 할당이 가능해진다. 
const tType: TName = iu;
console.log(tType);