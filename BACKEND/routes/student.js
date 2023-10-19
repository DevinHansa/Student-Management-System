const router = require('express').Router();
const Student = require('../models/student.model');

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender,
    });

    newStudent
        .save()
        .then(() => {
            res.json("Student Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error adding student");
        });
});

router.route('/').get((req, res) => {
    Student.find()
        .then((students) => {
            res.json(students);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json("Error fetching students");
        });
});

router.route('/update/:id').put(async (req, res) => {
    const userId = req.params.id;
    const { name, age, gender } = req.body;

    const updateStudent = {
        name,
        age,
        gender,
    };

    try {
        const updated = await Student.findByIdAndUpdate(userId, updateStudent, { new: true });
        if (!updated) {
            res.status(404).json("User not found");
        } else {
            res.status(200).json({ status: "User updated", user: updated });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("Error with updating data");
    }
});

router.route('/delete/:id').delete(async (req, res) => {
    const userId = req.params.id;

    try {
        const deleted = await Student.findByIdAndDelete(userId);
        if (!deleted) {
            res.status(404).json("User not found");
        } else {
            res.status(200).json({ status: "User deleted" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Error with deleting data");
    }
});

router.route('/get/:id').get(async (req, res) => {
    const userId = req.params.id;
    try {
        const student = await Student.findById(userId);
        if (!student) {
            res.status(404).json("User not found");
        } else {
            res.status(200).json({ status: "User fetched", student });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Error with getting data");
    }
});

module.exports = router;
