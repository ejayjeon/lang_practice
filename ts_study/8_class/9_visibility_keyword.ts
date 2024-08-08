/** Visibility Keyword 
 * 1) public (기본값): 어디서든 접근 가능
 * 2) protected: 현재 클래스 및 하위 클래스에서 접근 가능
 * 3) private: 현재 클래스 내에서만 접근 가능
*/

class TestClass {
  public id = 'test';
  protected id2 = 'test2';
  private id3 = 'test3';

  // js 에서만 존재하는 키워드
  #jsPrivateProperty = 'jstest3';
}

const test = new TestClass();
console.log(test.id = '바꿨지롱~');
