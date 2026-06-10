const Student = require('../models/studentModel');
const seedStudents = async () => {
  const count = await Student.countDocuments();
  if (count === 0) {
    await Student.insertMany([
      { name: "Kishore Kumar", department: "IT", year: 3 },
      { name: "Priya", department: "ECE", year: 2 },
      { name: "Arjun", department: "CSE", year: 2 },
      { name: "Sangeeth", department: "IT", year: 3 },
      { name: "Bala", department: "CSE", year: 3 },
    ]);
    console.log('Students seeded successfully');
  }
};
seedStudents();
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const createStudent = async (req, res) => {
  try {
    const { name, department, year } = req.body;
    if (!name || !department || !year) {
      return res.status(400).json({ message: 'All fields are required: name, department, year' });
    }
    const newStudent = await Student.create({ name, department, year });
    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: `Student with ID ${req.params.id} not found` });
    }
    res.status(200).json({ message: 'Student updated successfully', student: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: `Student with ID ${req.params.id} not found` });
    }
    res.status(200).json({ message: 'Student deleted successfully', deletedStudent: [deleted] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { getAllStudents, createStudent, updateStudent, deleteStudent };
