/** Exclude Type 
 * Pick / Omit 은 객체타입으로 했었지만 Exclude는 Union 타입
 * Exclude<타입들, 제외할 타입>
*/

type NoString = Exclude<string | boolean | number, string>;

type NoFunction = Exclude<string | (() => void), Function>;