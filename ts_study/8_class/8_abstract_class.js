/** 추상클래스 vs. 인터페이스
 * - 상속만 받을 수 있고 인스턴스화하지 못하게 만드는 클래스
 * - 직접적으로 선언하는 것이 불가능한 클래스
 * - 인스턴스 할 수는 없지만, 공유되는 값들을 메소드나 속성으로 정의하고 싶을 때
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ModelWithId = /** @class */ (function () {
    function ModelWithId(id) {
        this.id = id;
    }
    ;
    return ModelWithId;
}());
// 추상 클래스의 인스턴스를 만들 수 없습니다.ts(2511)
// const modelWithId = new ModelWithId(123);
// 추상클래스를 상속하면, Product 클래스는 추상클래스의 모든 프로퍼티들을 상속받을 수 있다.
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Product.prototype.getId = function () {
        console.log('Product class');
    };
    ;
    return Product;
}(ModelWithId));
;
// 상속을 받은 경우
var product = new Product(1);
product.getId();
