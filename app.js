const express = require("express");
const bodyParser = require("body-parser");
const { createDatabase } = require("./data/db");

//setup
const app = express();
app.use(bodyParser.json());
const Person = createDatabase();

// endpoints
app.get("/persons", async (req, res, next) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (error) {
    next(error);
  }
});

app.get("/persons/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const person = await Person.findById(id);
    res.json(person);
  } catch (error) {
    next(error);
  }
});

app.post("/persons", async (req, res, next) => {
  try {
    const { name, age, gender, email } = req.body;
    if (name && age && gender && email) {
      const person = await Person.create(req.body);
      res.json(person);
    } else {
      throw new Error("Invalid request body");
    }
  } catch (error) {
    next(error);
  }
});

app.delete("/persons/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const person = await Person.findByIdAndDelete(id);
    res.json(person);
  } catch (error) {
    next(error);
  }
});

app.put("/persons/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const person = await Person.findByIdAndUpdate(id, { ...data });
    res.json(person);
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("listening on port", port));
