// 1. 클래스 생성
class User {
  id: string;
  lv: number;

  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  }

  // 2. 메소드 데코레이터 사용
  // @TestMethodDecorator
  @Configurable(false)
  @MethodCallLogger('prod')
  hello() {
    return `${this.id}님의 레벨은 ${this.lv} 입니다.`;
  }
}

// target: static method에 데코레이팅을 할 경우 생성자 함수
//         instance method에 데코레이팅을 할 경우 인스턴스의 프로토타입
// propertyKey: 메소드 이름
// descriptor: 프로퍼티 디스크립터
function TestMethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('Log call');
  console.log('--- target -----');
  console.log(target);
  console.log('--- propertyKey -----');
  console.log(propertyKey);
  console.log('--- descriptor -----');
  console.log(descriptor);
}


// 3. 객체화
const user1 = new User('user1', 111);

// 4. 객체를 통해 메소드를 따로 부르지 않아도 데코레이터를 통해 실행이 됨

user1.hello();



// factory 형태로 실행할 수 있는지???
// configurable: true 이면 프로퍼티 삭제나 플래그 수정이 가능하다. 
// enumerable: true 이면 반복문을 사용해 나열할 수 있다.
// writable: true 이면 값을 수정할 수 있다.
function Configurable(configurable: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = configurable;
  }
}

console.log(Object.getOwnPropertyDescriptors(User.prototype));



// PropertyDescriptor가 가지고 있는 함수값 변경하기
// 함수가 불릴 때마다 로그
function MethodCallLogger(env: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log(`${env} running: ${propertyKey}`);
      // 이 메소드에 값을 반환한 것
      const result = originMethod.apply(this, ...args);

      return result;
    }
  }
}



// 메소드 콜을 확인하기 위해 다시 메소드 불러봄
user1.hello();