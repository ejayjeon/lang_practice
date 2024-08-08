import { Controller } from '@nestjs/common';
import { AppService } from './app.service';


/**
 * 아키텍처 Controller
 * 맨 앞에서 요청을 받는 역할을 한다 : 요청이 어디로 갈지를 정해주고, 그 역할에 포커스가 되어있어야 함 
 * 컨트롤러 단에서 로직을 정리하지 말것
 * 로직은 서비스 파일에 정의하고, 컨트롤러는 서비스 파일을 불러와서, 해당 서비스의 라우팅을 걸어주는 역할만 할 뿐
 * 컨트롤러가 생성되면 당연히 서비스도 같이 생성이 되어야 함
 * 로직들은 모두 서비스 파일에다 정의하기 때문에 - 서비스 파일에서 정의된 함수들을 컨트롤러에서 끌어다가 쓴다
 */

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
}
