/** JS가 가지고 있는 Array의 문제점 */

// 중간에 어떤 값을 넣어도 js는 인지를 못함
const number = [1, '2', 3, '4'];

// ts에서 명시적으로 타입 작성
let strings: string[] = ['1', '2', '3'];
strings.push('3');
// strings.push(4); 불가능


// 타입유추 가능
// const onlyNums: number[] 자동으로 유추됨
const onlyNums = [1, 2, 3, 4, 5, 6];

for (let i = 0; i < onlyNums.length; i++) {
  let item = onlyNums[i]; // let item: number
}

for (let item of onlyNums) {
  item; // let item: number
}

let number2 = onlyNums[0]; // let number2: number
let unknwonNum = onlyNums[999];
// 존재하지 않는 인덱스이나 let unknwonNum: number 라고 나옴.
// ts는 기본적으로 인덱스의 길이를 신경쓰지 않음 - tuple이 아닌 이상