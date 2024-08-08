/** Promise - 가장 많이 사용 */


// Promise가 반환하는 r: unknown 으로 유추됨
const afterTwoSec = function () {
  return new Promise((r) => {
    setTimeout(() => r('done'), 2000);
  });
};


// Promise 반환 타입에 제네릭 사용
// Promise의 반환값을 함수에 정리해줌
// 비동기로 반환할 거면 Promise에 제네릭을 선언해주면 됨
const afterThreeSec = function (): Promise<string> {
  return new Promise((r) => {
    setTimeout(() => r('완료'), 3000);
  });
};

const runner = async function () {
  const res = await afterTwoSec();
  const res1 = await afterThreeSec();
  console.log(res);
  console.log(res1);
};

runner();

