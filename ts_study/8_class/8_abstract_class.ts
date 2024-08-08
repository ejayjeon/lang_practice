/** 추상클래스 vs. 인터페이스 
 * - 상속만 받을 수 있고 인스턴스화하지 못하게 만드는 클래스
 * - 직접적으로 선언하는 것이 불가능한 클래스
 * - 인스턴스 할 수는 없지만, 공유되는 값들을 메소드나 속성으로 정의하고 싶을 때
*/

abstract class ModelWithId {
  id: number;

  constructor(id: number) {
    this.id = id;
  };

  abstract getId(): void;
}

// 추상 클래스의 인스턴스를 만들 수 없습니다.ts(2511)
// const modelWithId = new ModelWithId(123);





// 추상클래스를 상속하면, Product 클래스는 추상클래스의 모든 프로퍼티들을 상속받을 수 있다.
class Product extends ModelWithId {
  getId(): void {
    console.log('Product class');
  };
};

// 상속을 받은 경우
const product = new Product(1);
product.getId();