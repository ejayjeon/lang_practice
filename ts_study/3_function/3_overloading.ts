/** 오버로딩: JS에는 없지만 TS에는 존재  
 * 예제)
 * 파라미터를 
 * 1) 하나만 받거나
 * 2) 여러 개를 받는 함수
 * 만약에 하나의 파라미터만 입력받는다면, 하나의 스트링으로만 입력받는다. 
 * ex) '가, 나, 다'
 * 
 * 만약에 여러 개의 파라미터를 입력받는다면, 각각의 값으로 입력받는다.
 * ex) '가', '나', '다'
*/

// 시그니처 오버로딩 함수
function stringOrStrings(str: string): string; // function stringOrStrings(str: string): string (+1 overload)
function stringOrStrings(str: string, str2: string): string; // function stringOrStrings(str: string, str2: string): string (+1 overload)


function stringOrStrings(str: string, str2?: string): string {
  if (str && str2) {
    return `str + str2: ${str} ${str2}`;
  } else {
    return `str: ${str}`;
  }
};

// 웬만하면 오버로딩을 사용하지 않는다. (js에서는 어차피 적용되지 않음)