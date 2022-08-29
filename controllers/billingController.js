'use strict';

const firebase = require('../db');
const Billing = require('../models/billing');
const firestore = firebase.firestore();

const addBilling = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection('billing').doc().set(data);
    res.send('Billing added successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getBillingOptions = async (req, res, next) => {
  try {
    const billing = await firestore.collection('billing');
    const data = await billing.get();
    const billingArray = [];
    if (data.empty) {
      res.status(404).send('No billing record found');
    } else {
      data.forEach(doc => {
        const billingOption = new Billing(
          doc.id,
          doc.data().billing,

        );
        billingArray.push(billingOption);

      });
      res.send(billingArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  addBilling,
  getBillingOptions
}