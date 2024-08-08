/** Tuple
 * - js에서는 존재하지 않는 타입
 * - ts에서는 빌드타임에 tuple을 강조할 수 있음
*/
// 내부에 들어갈 인덱스를 지정해줌
var tuples = [1, '2', 3];
// push? : 에러가 안나! 왜냐면? js에서는 어차피 array일 뿐이니까
tuples.push('2');
// readonly : push 상황을 막기 위해서 readonly를 넣어줌
var unmodifiableTuple = [1, '1'];
// 'readonly [number, string]' 형식에 'push' 속성이 없습니다.ts(2339)
// unmodifiableTuple.push();
// Tuple 유추: as const 키워드를 사용한다
var actresses = ['김고은', '아이유', '박소담'];
// spread operator을 사용한 부분에서 as const 사용시?
// 'readonly ["김고은", "아이유", "박소담", "전지현"]' 형식은 'readonly'이며 변경 가능한 형식 'string[]'에 할당할 수 없습니다.
// let stringArray: string[] = [
//   ...actresses, '전지현'
// ] as const;
// Named Tuple
var namedTuple = ['전은정', 32];
// Assigning Tuple to Tuple : Tuple은 같은 타입만 할당이 가능하다.
var tuple1 = ['전은정', '천재'];
var tuple2 = [1, 2];
var assignTuple = [['전은정', '천재'], [1, 2]];
// Tuple과 Array의 관계
// 구체적인 타입에서 -> 덜 구체적인 타입으로는 할당이 가능하나 반대의 경우에는 불가능
var names = [
    '전은정',
    '천재',
];
var stringArr = names;
// 다차원 튜플
var users = [
    ['전은정', 25],
    ['이명은', 15],
    ['김고은', 30],
];
console.log(users[0][1]);
