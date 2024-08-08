/** Visibility Keyword
 * 1) public (기본값): 어디서든 접근 가능
 * 2) protected: 현재 클래스 및 하위 클래스에서 접근 가능
 * 3) private: 현재 클래스 내에서만 접근 가능
*/
var _TestClass_jsPrivateProperty;
var TestClass = /** @class */ (function () {
    function TestClass() {
        this.id = 'test';
        this.id2 = 'test2';
        this.id3 = 'test3';
        // js 에서만 존재하는 키워드
        _TestClass_jsPrivateProperty.set(this, 'jstest3');
    }
    return TestClass;
}());
_TestClass_jsPrivateProperty = new WeakMap();
var test = new TestClass();
console.log(test.id = '바꿨지롱~');
