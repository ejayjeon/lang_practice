// 1. 선택정렬
// N개의 숫자가 입력되면 오름차순으로 정렬

// 입력예제
// 6
// 13 5 11 7 23 15

function solution_1(n, arr) {
  let answer = arr;
  for (let i = 0; i < n; i++) {
    let min = i; // 최솟값
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) min = j;
      // j번째 위치한 값이 min 번째 위치한 값보다 작을 경우, min은 j로 교체
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return answer;
}
let arr_1 = [13, 5, 11, 7, 23, 15];
console.log(`선택정렬: ${solution_1(6, arr_1)}`);

// ----------------------------------------------------------------------

// 2. 버블정렬
// (1) N개의 숫자가 입력되면 오름차순으로 정렬 (a < b)
// (2) N개의 숫자가 입력되면 내림차순으로 정렬 (a > b)

// 입력 예제
// 6
// 7 66 13 83 15 11
function solution_2(n, arr) {
  let answer = arr;

  // for (let i = 0; i < arr.length - 1; i++) {
  //   for (let j = 0; j < arr.length - i - 1; j++) {
  //     console.log(
  //       `버블식: ${arr[j]} / ${arr[j + 1]} / ${
  //         arr[j] > arr[j + 1] ? '바꿔' : '그대로'
  //       }`
  //     );
  //     if (arr[j] > arr[j + 1]) {
  //       [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
  //     }
  //   }
  // }
  // return answer;
  for (let i = n - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return answer;
}

let arr_2 = [7, 66, 13, 83, 15, 11];
console.log(`버블정렬: ${solution_2(6, arr_2)}`);

// ----------------------------------------------------------------------

// 3.힙 정렬
function solution_3(n, arr) {
  let answer = arr;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    // i = 마지막 수 / 루트
    // n = arr의 길이
    // arr = 리스트
    heapify(arr, n, i);
  }

  // 힙 정렬
  for (let i = n - 1; i >= 0; i--) {
    // 현재 루트를 끝으로 이동
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    heapify(arr, i, 0);
  }
  return answer;
}

// 힙 구조 생성
function heapify(arr, n, i) {
  let root = i;
  let left = 2 * i + 1; // 왼쪽 자식
  let right = 2 * i + 2; // 오른쪽 자식

  // 왼쪽 자식이 루트보다 크다면
  if (left < n && arr[left] > arr[root]) {
    root = left;
  }

  // 오른쪽 자식이현재 루트보다 크다면
  if (right < n && arr[right] > arr[root]) {
    root = right;
  }

  // 가장 큰 값이 루트가 아니라면
  if (root != i) {
    let temp = arr[i];
    arr[i] = arr[root];
    arr[root] = temp;
  }
  heapify(arr, n, root); // 재귀적으로 서브트리를 힙 구조로 만듦
}

let arr_3 = [7, 66, 13, 83, 15, 16];
console.log(`힙정렬: ${solution_2(6, arr_3)}`);

// 4. 퀵 정렬
// function solution_4(arr, left, right) {
//   if (left < right) {
//     // 기준점을 찾고, 기준점을 중심으로 더 작은 수, 더 큰 수 분류
//     var i = position(arr, left, right);
//     console.log(`i: ${i}`);
//     // // 기준점 기준 좌측 정렬
//     // solution_4(arr, left, i - 1);
//     // // 기준점 기준 우측 정렬
//     // solution_4(arr, i + 1, right);
//   }
//   return arr;
// }

// function position(arr, left, right) {
//   var l = left; // 왼쪽 끝
//   var r = right; // 오른쪽 끝
//   var pivot = arr[left];

//   // 루프 내에서 arr[r]이 pivot보다 작을 때까지 r을 감소시키고,
//   // arr[l]이 pivot보다 클 때까지 l을 증가시킨다.
//   while (l < r) {
//     //
//     while (arr[r] > pivot) r--;
//     while (l < r && arr[l] <= pivot) l++;

//     // arr[l]과 arr[r]을 교환한다
//     if (l < r) {
//       var temp = arr[l];
//       arr[l] = arr[r];
//       arr[r] = temp;
//     }
//   }

//   // 루프가 종료된 후 pivot을 arr[r]의 위치로 이동하여 제자리에 놓는다.
//   arr[left] = arr[r];
//   arr[r] = pivot;

//   // 기준점의 최종 위치를 반환한다
//   return r;
// }
var position = function (arr, left, right) {
  var i = left;
  var j = right;
  var pivot = arr[left];

  while (i < j) {
    while (arr[j] > pivot) j--;
    while (i < j && arr[i] <= pivot) i++;

    if (i < j) {
      var tmp = arr[i]; // tmp 변수 선언
      arr[i] = arr[j];
      arr[j] = tmp;
    }
  }
  arr[left] = arr[j];
  arr[j] = pivot;

  return j;
};

let arr_4 = [1, 5, 651, 0, 4, 45, 98, 123];
// console.log(`퀵정렬: ${solution_4(arr_4, 0, 8)}`);

// 5. 삽입 정렬
function solution_5(n, arr) {
  let answer = arr;
  // i는 현재 정렬중인 인덱스
  for (let i = 0; i < n; i++) {
    // 현재 정렬 중인 요소를 tmp 변수에 저장

    let tmp = arr[i],
      j;
    // i 이전의 요소들을 거꾸로 순회. 배열의 현재 요소를 적절한 위치에 삽입하기 위해 이동
    for (j = i - 1; j >= 0; j--) {
      // arr[j]가 현재 정렬중인 요소보다 크면, 그 요소를 오른쪽으로 한 칸 이동시킴
      if (arr[j] > tmp) arr[j + 1] = arr[j];
      // 값이 크지 않으면 종료. tmp의 위치를 찾았기 때문
      else break;
    }
    // tmp를 적절한 위치에 삽입. 내부 반복문이 종료된 후 j+1이 tmp의 적절한 위치가 된다
    arr[j + 1] = tmp;
  }
  return answer;
}

let arr_5 = [336, 1231, 5, 98, 400, 252];
console.log(`삽입정렬: ${solution_5(6, arr_5)}`);

// 6. LRU 페이지 교체 알고리즘
// @param {int} s: 캐시의 크기
// @param {int} n: 작업의 갯수 -> arr.length
// @param {Array} arr: 작업번호
// function solution_6(s, n, arr) {
//   // 캐시 크기 설정 (s의 크기 만큼)
//   let answer = Array.from({ length: s }, () => 0);
//   arr.forEach((x) => {
//     setPage_1(answer, x, s);
//   });

//   // arr의 순서대로 캐시에 저장

//   return answer;
// }

// function setPage_1(arr, page, memory) {
//   let answer = arr;
//   const index = arr.indexOf(page);
//   // -1이면 인덱스에 없다는 의미
//   // 인덱스에 있으면, 해당 페이지를 제거하고 맨 앞에 추가
//   if (index !== -1) {
//     answer.splice(index, page);
//   } else {
//     // 페이지가 캐시에 없으면? 캐시가 가득 찬 경우 가장 오래된 페이지 제거
//     if (answer.length >= memory) {
//       answer.pop();
//     }
//   }
//   // 배열의 맨 앞에 페이지를 추가 (unshift)
//   answer.unshift(page);
//   return answer;
// }

function solution_6(size, n, arr) {
  let answer = Array.from({ length: size }, () => 0);
  arr.forEach((x) => {
    let pos = -1;
    for (let i = 0; i < size; i++) if (x === answer[i]) pos = i;
    if (pos === -1) {
      for (let i = size - 1; i >= 1; i--) {
        answer[i] = answer[i - 1];
      }
    } else {
      for (let i = pos; i >= 1; i--) {
        answer[i] = answer[i - 1];
      }
    }
    answer[0] = x;
  });

  return answer;
}

let arr_6 = [1, 2, 3, 2, 6, 2, 3, 5, 7];
console.log(`LRU: ${solution_6(5, 9, arr_6)}`);

// 7. LFU 페이지 교체 알고리즘
// @ param {int} s: 메모리 크기
// @ param {Array} arr: 작업

function solution_7(size, arr) {
  let freq_size = {}; // 참조 횟수 저장
  let memo = [];
  // let answer = Array.from({ length: size }, () => -1); // 메모리
  arr.forEach((page) => {
    setPage_2(freq_size, memo, size, arr, page);
    memo.sort((a, b) => freq_size[b] - freq_size[a]);
  });
  return memo;
}

// function setPage_2(freq, memory, workArr, page) {
//   //  1,2,3,2,4,5,3,5,2
//   const index = workArr.indexOf(page);
//   console.log(index);
//   if (index !== -1) {
//     memory.splice(index, 1);
//   }
//   // 현재 메모리가 비었는지, 가득 찼는지 확인
//   // -1은 최초 초기화 수, 페이지 참조에는 -1번 페이지가 없음 (조건이 바뀔 수 있으니 주의)
//   // -1이 포함된 경우라면 아직 메모리가 꽉 차지 않았다는 의미
//   if (memory.includes(-1)) {
//     freq[page]++;
//     // console.log(`freq: ${freq.key}`);
//   } else {
//     // 현재 메모리가 가득찬 경우라면
//     let min_page = memory.reduce((a, b) => (freq[a] <= freq[b] ? a : b));
//     memory.splice(min_page, page);
//     delete freq[min_page];
//   }

//   memory.push(page);
//   freq[page] = 1;
//   console.log(memory);
// }

function setPage_2(freq, memory, size, workArr, page) {
  if (memory.includes(page)) {
    freq[page]++;
  } else {
    if (memory.length >= size) {
      let min_page = memory.reduce((a, b) => (freq[a] <= freq[b] ? a : b));
      memory.splice(memory.indexOf(min_page), 1);
      delete freq[min_page];
    }

    memory.push(page);
    freq[page] = 1;
  }
}

let arr_7 = [1, 2, 3, 2, 4, 5, 3, 5, 2, 7, 6, 1];
console.log(`LFU: ${solution_7(5, arr_7)}`);

// 8. 이분 검색
// 임의의 숫자 N개가 주어지면
// N개의 수를 오름차순으로 정렬
// N개의 수 중 임의로 정한 M이 주어지면, 이분 검색으로 M이 정렬된 상태에서 몇 번째에 위치해 있는지 구하시오
// 중복값은 존재하지 않음
// 퀵정렬과 비슷

function solution_8(m, arr) {
  // 원본 데이터 보존을 위해 깊은 복사: 직렬화 -> 역직렬화 과정에서 새로운 배열 생성
  // let answer = JSON.parse(JSON.stringify(arr));
  let answer = [...arr];

  // 1. 오름차순 정렬
  // answer = answer.sort((a, b) => a - b);
  answer = solution_2(arr.length, arr);

  let lt = 0,
    rt = answer.length - 1;

  while (lt <= rt) {
    let mid = parseInt((lt + rt) / 2);
    if (answer[mid] == m) {
      answer = mid + 1;
      break;
    } else if (answer[mid] > m) rt = mid - 1;
    else lt = mid + 1;
  }
  // console.log(arr);
  // console.log(answer);
  return answer;
}

let arr_8 = [23, 11, 87, 65, 12, 57, 32, 99, 81];
console.log(`이분 검색: ${solution_8(88, arr_8)}`);

function solution_9(c, arr) {
  let answer = [...arr];
  let max = 0;

  // // 1. 거리 정렬
  answer = arr.sort((a, b) => a - b);

  // // answer의 두 개체를 비교해서, 가장 큰 값을 max에 저장?
  // // for (let i = 1; i < answer.length; i++) {
  // //   for (let j = i - 1; j >= 0; j--) {
  // //     console.log(`i: ${answer[i]} \nj: ${answer[j]}`);
  // //     console.log(answer[i] - answer[j]);
  // //   }
  // // }

  // // 일직선이라고 했으니까, 일단 양 끝단에 배치
  let lt = answer[0];
  let rt = answer[answer.length - 1];

  // // hourses를 배열의 양 끝 수를 제외한 나머지 좌표에 배치
  while (lt <= rt) {
    let mid = parseInt((lt + rt) / 2);
    if (distance(answer, mid) >= c) {
      answer = mid;
      lt = mid + 1;
    } else rt = mid - 1;
  }
  return answer;
}

function distance(arr, mid) {
  let cnt = 2,
    start = arr[0];
  for (let i = 1; i < arr.length; i++) {
    // [0] 다음 - arr[0] 한 값이 중간 값보다 크다면?
    if (arr[i] - start >= mid) {
      cnt++;
      start = arr[i];
    }
  }

  return cnt;
}

let arr_9 = [1, 2, 16, 4, 9, 32];
console.log(`결정 알고리즘: ${solution_9(3, arr_9)}`);

function solution_10(arr, target) {
  let lt = 0;
  let rt = arr.length - 1;

  while (lt <= rt) {
    let mid = Math.floor((lt + rt) / 2);
    if (arr[mid] == target) {
      return true;
    } else if (arr[mid] < target) {
      lt = mid + 1;
    } else {
      rt = mid - 1;
    }
  }
  return false;
}

console.log(`이진 탐색 알고리즘: ${solution_10(arr_9, 4)}`);
