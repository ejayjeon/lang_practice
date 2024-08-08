/** Non Nullable Type 
 * NonNull<타입|타입|타입>
 * Union으로 입력한 타입들 중 Null이 될 수 없는 타입들만 추출
*/


// 실제는 type NonNull = string | number
type NonNull = NonNullable<string | null | number | undefined>;