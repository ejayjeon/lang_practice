// 현재 파일에서 작성한 부분을 불러와서 사용할 때

// 1. export
// type도 export가 가능하다
// interface도 가능하다
import { User2 } from '../11_experimental_decorator/5_parameter_decorator';

// 2. export default
// export default 는 파일당 1개만 있을 수 있다 - 이름은 기준이 아니다
// interface는 안된다. -> interface는 TS의 타입이라서
import User from '../11_experimental_decorator/5_parameter_decorator';


// 3. whildcard
import * as All from '../11_experimental_decorator/1_class_decorator';

// 4. tsconfig - baseUrl 옵션설정
// baseUrl을 uncomment 해주면 최상위 경로를 기준으로 불러올 수도 있게 된다.

import * as all from '11_experimental_decorator/1_class_decorator';
