import express, { Request, Response } from "express";
import Employee, { validateEmployee } from "../models/employee";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const employees = await Employee.find().sort("name");
  res.send(employees);
});

router.post("/", async (req: Request, res: Response) => {
  const { error } = validateEmployee(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let employee = await Employee.findOne({ email: req.body.email });
  if (employee) return res.status(400).send("This employee already exists.");
  employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    salary: req.body.salary,
    date: req.body.date,
  });
  try {
    await employee.save();
    res.send(employee);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (!employee) res.status(404).send("The given Id wasn't found..!");
    res.send(employee);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { error } = validateEmployee(req.body);
  if (error) {
    console.log(error);
    return res.status(404).send(error.details[0].message);
  }
  try {
    let updateEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        salary: req.body.salary,
        date: req.body.date,
      },
      { new: true }
    );
    res.send(updateEmployee);
  } catch (error) {
    console.log("The item couldn't find. Check please...", error);
  }
});
module.exports = router;
