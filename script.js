// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
//Globally declared employeesArray and employee object
const employeesArray = [];

let employee = {
  firstName: '',
  lastName: '',
  salary: ''
};

const collectEmployees = function() {
  //Created boolean variable to use as a condition for the loops
  let addAnother = true;

  //employee object to gather and store required data for each employee
  while (addAnother) {
      employee = {
        firstName: '',
        lastName: '',
        salary: ''
    };

    //Prompts for assigning values to each key in employee object
    employee.firstName = prompt("Enter employee's first name.");
    employee.lastName = prompt("Enter employee's last name");
    employee.salary = parseInt(prompt("Enter employee's salary")); 
    //Defaults to zero if a non-number is entered in the salary field
    if (isNaN(employee.salary)) {
      employee.salary = 0;
    };

    //Stops the loop if user hits cancel
    if (!confirm("Do you want to add another employee?")) {
      addAnother = false;
    };
    employeesArray.push(employee);
  }
  //returns all information gathered from the user as an array of objects
  return employeesArray;
};

// console.log(employeesArray);

const displayAverageSalary = function(employeesArray) {
  //Adds all salaries together
  let sum = 0;
  employeesArray.forEach(employee => {
    sum += employee.salary
  });

  //Calculates average and converts to a USD print in console.  Stores answer in variable to use in console.log string.
  let averageSalary = (sum / employeesArray.length).toLocaleString('en-US', {style: 'currency', currency: 'USD'});

  console.log(`The average salary between our ${employeesArray.length} employee(s) is ${averageSalary}.`);
}

// TODO: Selects a random employee and logs their first and last name to console in provided string
const getRandomEmployee = function(employeesArray) {
  employeesArray[Math.floor(Math.random() * employeesArray.length)];
  console.log(`Congratulations to ${[employee.firstName]} ${[employee.lastName]}, our random drawing winner!`);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
