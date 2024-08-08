let arr_1 = [1, 21, 68, 79, 55, 3, 16, 108, 224];
let arr_2 = [1, 21, 68, 79, 55, 3, 16, 108, 224];
let arr_3 = [1, 21, 68, 79, 55, 3, 16, 108, 224];
let arr_4 = [1, 21, 68, 79, 55, 3, 16, 108, 224];
let arr_5 = [81, 58, 42, 33, 61];
let arr_6 = [1, 21, 68, 79, 55, 3, 16, 108, 224];
let arr_7 = [1, 21, 68, 79, 55, 3, 16, 108, 224];
let arr_8 = [1, 21, 68, 79, 55, 3, 16, 108, 224];
let arr_9 = [1, 21, 68, 79, 55, 3, 16, 108, 224];
let arr_10 = [1, 21, 68, 79, 55, 3, 16, 108, 224];

// 1. 재귀
// factorial

function solution_1(n) {
  let answer;
  answer = recursive(n);
  return answer;
}

function recursive(n) {
  if (n === 1) return 1;
  else return n * recursive(n - 1);
}

// 2. 재귀를 이용한 이진수 출력
function solution_2(n) {
  // 10진수 -> 2진수
  let answer = '';
  function recursive(n) {
    if (n === 0) return;
    else {
      recursive(parseInt(n / 2));
      answer += String(n % 2);
    }
  }
  recursive(n);
  return answer;
}

// function test(n) {
//   // console.log(13 % 2);
//   // console.log(n / 2); 132 -> 66 -> 33 -> 16 -> 8 -> 4 -> 2 -> 0 재귀로 호출해서 값을 부름
//   // console.log(n % 2);
//   let answer = '';
//   test2(n);
//   console.log(answer);

//   function test2(n) {
//     if (n < 1) return;
//     else {
//       test2(parseInt(n / 2));
//       answer += String(n % 2);
//     }
//   }
// }

// test(132);

// 3. 이진트리 순회 (DFS) : 깊이 우선 탐색
function solution_3(n) {
  let answer = '';
  function DFS(v) {
    if (v > 5) return;
    else {
      answer += v + ' ';
      DFS(v * 2);
      DFS(v * 2 + 1);
    }
  }
  DFS(n);
  return answer;
}

function heapify(i) {
  // i는 루트노드
  let root = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  console.log(`${root}, ${left}, ${right}`);
}

// 4. 부분 집합 구하기 (DFS)
function solution_4(n) {
  // 자연수 1부터 n까지
  let answer = [];
  let arr = Array.from({ length: n + 1 }, () => 0);
  function DFS(v) {
    if (v === n + 1) {
      let tmp = '';
      for (let i = 1; i <= n; i++) {
        if (arr[i] === 1) tmp += '\n' + i + '';
      }
      if (tmp.length > 0) answer.push(tmp.trim());
    } else {
      arr[v] = 1;
      DFS(v + 1);
      arr[v] = 0;
      DFS(v + 1);
    }
  }
  DFS(1);
  return answer;
}

// 5. 최대합 구하기 (DFS)
function solution_5(max, array) {
  let count = 0; // 최대합

  return count;
}

// --------------------------------------------------------------------------------
console.log(`꼬리재귀: ${solution_1(5)}`);
console.log(`이진수 출력: ${solution_2(132)}`);
console.log(`이진트리 순회: ${solution_3(1)}`);
console.log(`부분 집합 구하기: ${solution_4(3)}`);
console.log(`최대합 구하기: ${solution_5(259, arr_5)}`);
