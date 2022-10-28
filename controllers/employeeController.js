'use strict';

const firebase = require('../db');
const Employee = require('../models/employee');
const firestore = firebase.firestore();

const addEmployee = async (req, res) => {
  try {
    const data = req.body;
    const employeeRef = firestore.collection('employees').doc();
    const employeeRefId = employeeRef.id;
    employeeRef.set({
      ...data,
    });
    res.send({
      ...data,
      id: employeeRefId,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllEmployees = async (res) => {
  try {
    const employees = firestore.collection('employees');
    const data = await employees.get();
    const employeesArray = [];

    if (data.empty) {
      res.status(404).send('No employee record found');
    } else {
      data.forEach((doc) => {
        const employee = new Employee(
          doc.id,
          doc.data().name,
          doc.data().country,
          doc.data().email,
          doc.data().phoneNumber,
          doc.data().adress,
          doc.data().teleWorkAdress,
          doc.data().cpn,
          doc.data().idSeries,
          doc.data().idExpirationDate,
          doc.data().peopleInSupport,
          doc.data().healthHouse,
          doc.data().trialExpirationDate,
          doc.data().contractModifications,
          doc.data().taxExempt,
          doc.data().contractType,
          doc.data().salary,
          doc.data().contractNumber,
          doc.data().contratExpirationDate,
          doc.data().workState,
          doc.data().ssm,
          doc.data().laborMedicine,
          doc.data().contractStartDate,
          doc.data().contractEndDate
        );
        employeesArray.push(employee);
      });
      res.send(employeesArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = firestore.collection('employees').doc(id);
    const data = await employee.get();

    if (!data.exists) {
      res.status(404).send('Employee with the given ID not found');
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const employee = firestore.collection('employees').doc(id);
    await employee.update(data);
    res.send('Employee record updated successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    await firestore.collection('employees').doc(id).delete();
    res.send('Record deleted successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
