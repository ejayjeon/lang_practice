/** 유추된 객체 타입 유니언 & 인터섹션 둘다 사용 */

type Price = {
  price: number;
};

type KFood = {
  name: string;
  isSpicy: boolean;
};

type CFood = {
  name: string;
  origin: string;
};

type Menu = Price & (KFood | CFood);

const menu: Menu = {
  price: 12000,
  name: '비빔밥',
  isSpicy: true,
  origin: '한국'
};