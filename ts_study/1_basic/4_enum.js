"use strict";
/** API 요청
 * 1) Done : 요청 완료
 * 2) Loading : 요청 중
 * 3) Init : 초기 상태
 * 4) Error : 요청 에러
 */
Object.defineProperty(exports, "__esModule", { value: true });
function runWork() {
    let state = 'Init';
    try {
        // 작업을 한다
        state = 'Loading';
        // 작업을 끝낸다
        state = 'Done';
    }
    catch (e) {
        state = 'Error';
    }
    finally {
        return state;
    }
}
console.log(runWork());
// String 으로 어떤 제한된 값을 표현하고자 하면 한계가 있다. (오타여부, 타입 체크)
// JS 에서는 각각 변수로 선언했음 const doneState = 'Done';
// Enum 사용
// 첫 번째로 대문자, Enum 안의 값을 임의로 지정해 줄 수도 있다.
var State;
(function (State) {
    State["Done"] = "Done";
    State["Loading"] = "Loading";
    State["Init"] = "Init";
    State["Error"] = "Error";
})(State || (State = {}));
function runWork2() {
    let state = State.Init;
    try {
        // 작업 시작
        state = State.Loading;
        // 작업 완료
        state = State.Done;
    }
    catch (e) {
        state = State.Error;
    }
    finally {
        // throw Error();
        return state;
    }
}
console.log(runWork2());
