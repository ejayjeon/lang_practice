// reflection metadata 라는 패키지 설치 : 실제로 데코레이터를 어떻게 쓰는지
import 'reflect-metadata';


const user = {
  name: 'user',
  age: 30,
};


/** Parameter의 정의
 * 1) 메타데이터의 키
 * 2) 메타데이터 키에 저장할 값
 * 3) 메타데이터를 저장할 객체
 * 4) 메타데이터를 저장할 객체의 프로퍼티
 * 4번은 필수가 아니다.
 */

/** 메타데이터? - 데이터에 대한 데이터
 */
Reflect.defineMetadata('test-meta', 123, user);


// Reflect.getMetadata(어떤 키, 어디서 가져올건지)
console.log(Reflect.getMetadata('test-meta', user));

// Define : 키 하나에 한 개의 값만 저장이 가능하며 가장 최근에 저장한 값으로 대체된다.
Reflect.defineMetadata('test-meta', 456, user);

console.log(Reflect.getMetadata('test-meta', user));


// 저장할 값으로 객체도 가능하다
Reflect.defineMetadata('test-meta2', { name: '은정' }, user);
console.log(Reflect.getMetadata('test-meta2', user));

// 객체 프로퍼티에 저장하기
Reflect.defineMetadata('obj-meta', 999, user, 'name');
console.log(Reflect.getMetadata('obj-meta', user, 'name'));


// 삭제하기
// Reflect.deleteMetadata(삭제할 키값, 가져올 객체);
Reflect.deleteMetadata('obj-meta', user);
console.log(Reflect.getMetadata('obj-meta', user)); // 삭제했으니까 undefined
console.log(Reflect.hasMetadata('obj-meta', user)); // false


// 객체 내 메타데이터의 모든 키 값 가져오기
// Reflect.getMetadataKeys(가져올 객체);
// console.log(Reflect.getMetadataKeys(user));



// 자기 자신에 존재하는지 
Reflect.defineMetadata('prototype_data', '프로토타입 메타', Object.getPrototypeOf(user));
console.log(Reflect.getMetadataKeys(user)); // 부모 객체에 있는 프로토타입 메타데이터도 가지고 옴
console.log(Reflect.getOwnMetadataKeys(user)); // 현재 자신 객체에 있는 메타데이터만 가지고 옴






// ----------------------------------------------------------------
// Validation을 할때 많이 쓰이는 reflect_metadata 와 Decorator 함께 사용하기

const restrictParamValue = Symbol('restrictParamValue');

// 어떤 값이든 입력받을 수 있게 하려면 제네릭을 사용하면 좋다
function RestrictParamValue<T>(restrictedValues: T[]) {
  return (target: any, propertyKey: string, index: number) => {
    // 메타데이터 하나를 만들어서 모든 restrictvalue 관리
    // target은 메소드에 하는 거니까 타겟이 클래스가 된다?
    // propertyKey : 메소드의 이름을 가지고 옴
    const prevMeta = Reflect.getOwnMetadata(restrictParamValue, target, propertyKey) ?? [];

    const info: RestrictionInfo<T> = {
      index, restrictedValues,
    }

    Reflect.defineMetadata(restrictParamValue, [...prevMeta, info], target, propertyKey)

    console.log(Reflect.getOwnMetadata(restrictParamValue, target, propertyKey));
  }
}

function ValidateMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const meta: RestrictionInfo<any>[] = Reflect.getOwnMetadata(restrictParamValue, target, propertyKey) ?? [];

  const origin = descriptor.value;
  descriptor.value = function (...args: any) {
    const invalid = meta.filter((x) => !x.restrictedValues.includes(args[x.index]));

    if (invalid.length > 0) {
      throw Error(`잘못된 값입니다. ${invalid.map((x) => args[x.index]).join(',')}`);
    }

    return origin.apply(this, args);
  };

}

class User {
  id: string;
  lv: number;

  constructor(id: string, lv: number) {
    this.id = id;
    this.lv = lv;
  }


  // info 에 들어갈 string은 '바보' | '천재' 중 하나여야 함.
  // 일일이 if문을 넣어서 걸러줄 필요 없이 intersection같은 느낌으로 Decorator을 넣어서 걸러줄 수 있음
  @ValidateMethod
  hello(@RestrictParamValue(['바보', '천재']) info: string) {
    return `${this.id}님은 ${info} 입니다.`;
  }
}





// 공용으로 쓸 키값: Symbol()을 사용하면 선언하는 순간 안의 값과 절대적으로 같은 값은 존재할 수 없게 된다.


interface RestrictionInfo<T> {
  index: number; // 몇 번째 파라미터
  restrictedValues: T[];
}



const user1 = new User('user1', 10);
console.log(user1.hello('메롱'));