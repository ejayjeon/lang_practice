// const로 casting을 하면 특정 값으로 type을 선언할 수 있다.

// Casting
// TS에서 Casting을 해도 JS에서는 적용이 안된다.

let numVar = 5;
// numVar.toUpperCase(); -> 자동으로 타입이 number로 캐스팅되었으므로 toUpperCase()라는 string 메소드가 존재하진 않음


// any 타입 선언
let anyVar: any = 5;
// (anyVar as string).toUpperCase(); -> any 타입으로 선언 후 as string 형으로 타입을 캐스팅해버리면 있을 수 없는 값에 toUpperCase()가 생겨버림. 