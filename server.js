const inquirer = require('inquirer');
const mysql = require('mysql2');


managerP();

function managerP() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter name of manager',
            name: 'name'
        },
        {
            type: 'input',
            message: 'input ID',
            name: 'id'
        },
        {
            type: 'input',
            message: 'input email',
            name: 'email'
        },
        {
            type: 'input',
            message: 'enter office number',
            name: 'office'
        },
    ])
        .then(function (a) {

            const manager = new Manager(a.id, a.email, a.name, a.office)
            employees.push(manager)
            employeeChoice();

        });
}


function employeeChoice() {
    inquirer.prompt([
        {
            type: 'rawlist',
            choices: ['engineer', 'intern', 'done'],
            message: 'what class do you want to add?',
            name: 'employee'
        }
    ])
        .then(function (answers) {
            console.log(answers)
            switch (answers.employee) {
                case 'engineer':
                    engineer();
                    break;
                case 'intern':
                    intern();
                    break;
                case 'done':
            }
            return;
        })

};



function engineer() {

    inquirer.prompt([
        {
            type: 'input',
            message: 'name of engineer',
            name: 'name'
        },
        {
            type: 'input',
            message: 'input ID',
            name: 'id'
        },
        {
            type: 'input',
            message: 'input email',
            name: 'email'
        },
        {
            type: 'input',
            message: 'enter office number',
            name: 'github'
        },
    ])
        .then(a => {

            var engineer = new Engineer(a.id, a.email, a.name, a.github)
            console.log(engineer)
            var role = engineer.getRole()
            console.log(role)
            employees.push(engineer)
            employeeChoice()

        })
};

function intern() {

    inquirer.prompt([
        {
            type: 'input',
            message: 'name of engineer',
            name: 'name'
        },
        {
            type: 'input',
            message: 'input ID',
            name: 'id'
        },
        {
            type: 'input',
            message: 'input email',
            name: 'email'
        },
        {
            type: 'input',
            message: 'enter office number',
            name: 'github'
        },
    ])
        .then(a => {

            var intern = new Intern(a.id, a.email, a.name, a.github)
            console.log(intern)
            var role = intern.getRole()
            console.log(role)
            employees.push(intern)
            employeeChoice()

        })
};