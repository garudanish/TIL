"use strict";
/**
 * Enum
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * API 요청을 했을 때, 상태는 4가지가 있다고 하자.
 * DONE, ERROR, LOADING, INITIAL
 */
function runWork() {
    let state = "INITIAL";
    try {
        state = "LOADING";
        // ...작업
        state = "DONE";
    }
    catch (error) {
        state = "ERROR";
    }
    finally {
        return state;
    }
}
console.log(runWork() === "DONE"); // 오타에 취약하다
const doneState = "DONE";
const errorState = "ERROR";
const loadingState = "LOADING";
const initialState = "INITIAL";
function runWork2() {
    let state = initialState;
    try {
        state = loadingState;
        // ...작업
        state = doneState;
    }
    catch (error) {
        state = errorState;
    }
    finally {
        return state;
    }
}
console.log(runWork2() === doneState); // 오타에 취약하다
var State;
(function (State) {
    State[State["DONE"] = 0] = "DONE";
    State[State["LOADING"] = 1] = "LOADING";
    State[State["INITIAL"] = 2] = "INITIAL";
    State[State["ERROR"] = 3] = "ERROR";
})(State || (State = {}));
function runWork3() {
    let state = State.INITIAL;
    try {
        state = State.LOADING;
        // ...작업
        state = State.DONE;
    }
    catch (error) {
        state = State.ERROR;
    }
    finally {
        return state;
    }
}
console.log(runWork3()); // 0. 초깃값 없이 Enum을 선언하면 0부터 시작한다.
var State2;
(function (State2) {
    State2["DONE"] = "DONE";
    State2["LOADING"] = "LOADING";
    State2["INITIAL"] = "INITIAL";
    State2["ERROR"] = "ERROR";
})(State2 || (State2 = {}));
function runWork4() {
    let state = State2.INITIAL;
    try {
        state = State2.LOADING;
        // ...작업
        state = State2.DONE;
    }
    catch (error) {
        state = State2.ERROR;
    }
    finally {
        return state;
    }
}
console.log(runWork4()); // DONE. 초깃값을 지정해줄 수 있다.
