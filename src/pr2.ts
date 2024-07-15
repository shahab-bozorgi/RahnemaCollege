interface User {
  type: "user";
  vote: number;
  name: string;
  age: number;
  password: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  password: string;
}

interface Management {
  type: 'management';
  name: string;
  age: number;
  password: string;
}

export type Person = Admin | User | Management;

class PersonManager {
  private persons: Person[];
  private dogsCount: number;
  private catsCount: number;

  constructor() {
    this.persons = [
      {
        type: "user",
        vote: 1,
        name: "Alice",
        age: 28,
        password: "3134646"
      },
      {
        type: "admin",
        name: "Bob",
        age: 35,
        password: "84393146"
      },
      {
        type: "management",
        name: "Charlie",
        age: 40,
        password: "65464646"
      },
      {
        type: "user",
        vote: 2,
        name: "Diana",
        age: 30,
        password: "78931225"
      },
      {
        type: "admin",
        name: "Ethan",
        age: 50,
        password: "363545994"
      }
    ];
    this.dogsCount = 0;
    this.catsCount = 0;
  }

  private getVote(vote: number): string {
    if (vote === 1) {
      this.dogsCount++;
      return "dogs";
    } else if (vote === 2) {
      this.catsCount++;
      return "cats";
    }
  }

  public get(): { persons: (Omit<User, 'vote'> & { vote: string })[], dogsCount: number, catsCount: number } {
    this.dogsCount = 0;
    this.catsCount = 0;
    
    const modifiedPersons = this.persons.map(person => {
      if (person.type === 'user') {
        const userPerson = person as User;
        return {
          ...userPerson,
          vote: this.getVote(userPerson.vote)
        };
      }
      return person;
    });

    return {
      persons: modifiedPersons as (Omit<User, 'vote'> & { vote: string })[],
      dogsCount: this.dogsCount,
      catsCount: this.catsCount
    };
  }

  public add(person: Person): void {
    this.persons.push(person);
  }
}

const personManager = new PersonManager();
const newUser: User = {
  type: "user",
  vote: 1,
  name: "Frank",
  age: 25,
  password: "65465466646"
};

personManager.add(newUser);

const result = personManager.get();
console.log(result.persons);
console.log(`Dogs count: ${result.dogsCount}`);
console.log(`Cats count: ${result.catsCount}`);
