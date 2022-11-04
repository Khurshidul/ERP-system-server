const joi = require("joi");
import { Schema, model } from "mongoose";

interface Iemployee {
  firstName: string;
  lastName: string;
  email: string;
  salary: string;
  date: string;
}

const employeeSchema = new Schema<Iemployee>({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  salary: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
  },
  date: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
});

const Employee = model<Iemployee>("Employee", employeeSchema);
export default Employee;
export const validateEmployee = (employee: Iemployee) => {
  const schema = joi.object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    email: joi.string().min(5).max(255).required().email(),
    salary: joi.string().min(4).max(1024).required(),
    date: joi.string().min(6).max(1024).required(),
  });
  return schema.validate(employee);
};
