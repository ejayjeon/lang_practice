/** Parameter type 
 * type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
*/

function sampleFunction(x: number, y: number) { }

type Params = Parameters<typeof sampleFunction>