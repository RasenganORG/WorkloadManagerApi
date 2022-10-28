class Employee {
  constructor(
    id,
    name,
    country,
    email,
    phoneNumber,
    adress,
    teleWorkAdress,
    cnp,
    idSeries,
    idExpirationDate,
    peopleInSupport,
    healthHouse,
    trialExpirationDate,
    contractModifications,
    taxExempt,
    contractType,
    salary,
    contractNumber,
    contractExpirationDate,
    workState,
    ssm,
    laborMedicine,
    contractStartDate,
    contractEndDate
  ) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.adress = adress;
    this.teleWorkAdress = teleWorkAdress;
    this.cnp = cnp;
    this.idSeries = idSeries;
    this.idExpirationDate = idExpirationDate;
    this.peopleInSupport = peopleInSupport;
    this.healthHouse = healthHouse;
    this.trialExpirationDate = trialExpirationDate;
    this.contractModifications = contractModifications;
    this.taxExempt = taxExempt;
    this.contractType = contractType;
    this.salary = salary;
    this.contractNumber = contractNumber;
    this.contractExpirationDate = contractExpirationDate;
    this.workState = workState;
    this.ssm = ssm;
    this.laborMedicine = laborMedicine;
    this.contractStartDate = contractStartDate;
    this.contractEndDate = contractEndDate;
  }
}

module.exports = Employee;
