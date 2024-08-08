class Rectangle {
  // #은 js private 값 : 외부에서 access 못함
  #height: number;
  #width: number;

  constructor(height: number, width: number) {
    this.#height = height;
    this.#width = width;
  }

  @Configurable(false)
  get height() {
    return this.#height;
  }

  @Configurable(false)
  get width() {
    return this.#width;
  }

  set height(height: number) {
    this.#height = height;
  }

  set width(width: number) {
    this.#width = width;
  }
}

// configurable 변경 메소드 : getter의 설정값을 변경할 수 없도록 막아주는 것
function Configurable(configurable: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = configurable;
  }
}