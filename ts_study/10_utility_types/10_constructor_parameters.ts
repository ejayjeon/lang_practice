/** Constructor_parameter */

class User {
  id: string;
  age: number;

  constructor(id: string, age: number) {
    this.id = id;
    this.age = age;
  };
}

type ConstructorParam = ConstructorParameters<typeof User>;