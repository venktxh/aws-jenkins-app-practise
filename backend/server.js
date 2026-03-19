const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI);

app.get("/student-details", (req, res) => {
  res.json({
    name: "S. Venkatesh",
    roll: "2023bcs0092",
    register: "YOUR_REGISTER_NUMBER",
  });
});

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Student = mongoose.model("Student", studentSchema);

app.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});
app.put("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(student);
});
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});
app.listen(8081, () => console.log("Backend running on 8081"));
