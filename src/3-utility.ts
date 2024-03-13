// 1. Partial<T>
interface Person {
  name: string
  age: number
}

// 2번째 매개변수는 Person에서 구성된 속성만 가질 수 있음 (or, and)
const updatePerson = (person: Person, fields: Partial<Person>): Person => {
  return { ...person, ...fields }
}

const person: Person = { name: "Spartan", age: 30 }
const changedPerson = updatePerson(person, { name: "spart" })
console.log(changedPerson)

// 2. Required<T>
interface Person2 {
  name: string
  age: number
  address?: string
}

// 필수속성이 아닌 address를 필수로 넣도록 변경 가능
const updatePerson2 = (person: Person2, fields: Required<Person2>): Person => {
  return { ...person, ...fields }
}

const person2: Person2 = { name: "Spartan", age: 30 }
const changedPerson2 = updatePerson2(person2, {
  name: "spartan",
  age: 31,
  address: "somewhere",
})

// 3. Readonly<T>
interface DatabaseConfig {
  host: string
  readonly port: number
}

const mutableConfig: DatabaseConfig = {
  host: "localhost",
  port: 3000,
}

//intetface를 활용한 불변 정의가능
const immutableConfig: Readonly<DatabaseConfig> = {
  host: "localhost",
  port: 3000,
}

mutableConfig.host = "somewhere"
//mutableConfig.port = 4000 // readonly 속성은 불변
//immutableConfig.host = "changed" // readonly 속성이 아니더라도 Readonly<T>를 사용하면 모든 속성이 readonly가 됨

// 4. Pick<T, K>
interface Person3 {
  name: string
  age: number
  address: string
}

// Person3에서 name, age 속성만 가질 수 있음
type SubsetPerson = Pick<Person3, "name" | "age">

const person3: SubsetPerson = { name: "Spartan", age: 30 }

// 5. Omit<T, K>
// Pick과 반대로 T에서 K를 제외한 속성만 가질 수 있음

interface Person4 {
  name: string
  age: number
  address: string
}

type SubsetPerson4 = Omit<Person, "address">

const person4: SubsetPerson = { name: "Alice", age: 30 }
