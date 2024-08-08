/** Generic in Implementation - interface */

interface Singer<T, V> {
  name: T;
  sing(year: V): void;
}

class Idol implements Singer<string, string> {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sing(year: string): void {
    console.log(`${this.name}의 데뷔년도는 ${year}년 입니다.`);
  };

}

const idol = new Idol('아이유');
idol.sing('2006');


// 클래스에서 넘겨받을 수 있음
class Idol2<T, V> implements Singer<T, V> {
  name: T;
  constructor(name: T) {
    this.name = name;
  }
  sing(year: V): void {
    console.log(`${this.name}의 데뷔년도는 ${year}년 입니다.`);
  };

}

const idol2 = new Idol('뉴진스');
idol2.sing('2022');