const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const DB_FILE_PATH = path.join(__dirname, "persons.json");

class Person {
  constructor({ id = crypto.randomUUID(), name, age, gender, email }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.email = email;
  }
}

class Database {
  constructor() {
    this.data = [];
  }

  load() {
    try {
      const jsonData = fs.readFileSync(DB_FILE_PATH);
      this.data = JSON.parse(jsonData);
    } catch (error) {
      console.error(`Error loading database: ${error}`);
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.data));
    } catch (error) {
      console.error(`Error saving database: ${error}`);
    }
  }

  find() {
    return this.data;
  }

  findById(id) {
    const person = this.data.find((person) => person.id === id);
    return person ?? { message: "person not found" };
  }

  findByIdAndDelete(id) {
    const index = this.data.findIndex((person) => person.id === id);
    if (index === -1) {
      return { message: "person not found" };
    }
    const deletedPerson = this.data.splice(index, 1)[0];
    this.save();
    return deletedPerson;
  }

  findByIdAndUpdate(id, newData) {
    const index = this.data.findIndex((person) => person.id === id);
    if (index === -1) {
      return { message: "person not found" };
    }

    const { name, age, gender, email } = newData;

    const updatedPerson = {
      ...this.data[index],
      ...(name && { name }),
      ...(age && { age }),
      ...(gender && { gender }),
      ...(email && { email }),
      id,
    };

    this.data[index] = updatedPerson;
    this.save();
    return updatedPerson;
  }

  create(personData) {
    const person = new Person(personData);
    this.data.push(person);
    this.save();
    return person;
  }
}

function createDatabase() {
  const db = new Database();
  db.load();
  return db;
}

module.exports = { createDatabase };
