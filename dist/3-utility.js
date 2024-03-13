"use strict";
// 2번째 매개변수는 Person에서 구성된 속성만 가질 수 있음 (or, and)
const updatePerson = (person, fields) => {
    return Object.assign(Object.assign({}, person), fields);
};
const person = { name: "Spartan", age: 30 };
const changedPerson = updatePerson(person, { name: "spart" });
console.log(changedPerson);
// 필수속성이 아닌 address를 필수로 넣도록 변경 가능
const updatePerson2 = (person, fields) => {
    return Object.assign(Object.assign({}, person), fields);
};
const person2 = { name: "Spartan", age: 30 };
const changedPerson2 = updatePerson2(person2, { name: "spartan", age: 31, address: "somewhere" });
const mutableConfig = {
    host: "localhost",
    port: 3000
};
//intetface를 활용한 불변 정의가능
const immutableConfig = {
    host: "localhost",
    port: 3000
};
mutableConfig.host = "somewhere";
const person3 = { name: "Spartan", age: 30 };
const person4 = { name: "Alice", age: 30 };
