const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'employee_db'
});

startQuestion();

function startQuestion() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'first',
            choices: [
                'View Departments',
                'View Roles',
                'View Employees',
                'Add Department',
                'Add Role',
                'Add Employees',
                'Update that role',
                'Quit'
            ]
        }

    ]).then((answer) => {
        switch (answer.first) {
            case 'View Departments': viewDepartment();
                break;
            case 'View Roles': viewRole();
                break;
            case 'View Employees': viewEmployee();
                break;
            case 'Add Department': addDep();
                break;
            case 'Add Role': addRole();
                break;
            case 'Add Employees': addEmployee();
                break;
            case 'Update that role': updateRole();
                break;
            case 'Quit': process.exit(0);
        }
    });
}

const viewDepartment = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
        if (err) return console.log(err);
        console.table(results)
        startQuestion();

    });
}
const viewRole = () => {
    db.query(`SELECT * FROM role`, function (err, results) {
        if (err) return console.log(err);
        console.table(results);
        startQuestion();
    });
}

const viewEmployee = () => {
    db.query(`SELECT * FROM employee`, function (err, results) {
        if (err) return console.log(err);
        console.table(results);
        startQuestion();
    });
}

const addDep = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'input department name',
            name: 'depMake'
        }
    ]).then((answer) => {
        db.query(`INSERT INTO department(name) VALUES(?)`, answer.depMake, (err) => {
            if (err) return console.log(err);
            startQuestion();
        })
    })
}

const addRole = () => {
    db.query(`SELECT * FROM department`, function (err, dep) {
        if (err) return console.log(err);

        inquirer.prompt([
            {
                type: 'input',
                message: 'input role title',
                name: 'title'
            },
            {
                type: 'input',
                message: 'input salary ammount',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'pick department',
                name: 'department',
                choices: dep.map(department =>
                ({
                    name: department.name,
                    value: department.id
                })
                ),
            },
        ]).then((answer) => {
            db.query(`
        INSERT INTO role (title, salary, department_id) 
        VALUES (?, ?, ?)`,
                [answer.title, answer.salary, answer.department], (err) => {
                    if (err) return console.log(err);
                    startQuestion();
                })
        })
    })
};

const addEmployee = () => {
    db.query(`SELECT * FROM role`, function (err, role) {
        if (err) return console.log(err);

        inquirer.prompt([
            {
                type: 'input',
                message: 'input first name',
                name: 'fname'
            },
            {
                type: 'input',
                message: 'input last name',
                name: 'lname'
            },
            {
                type: 'list',
                message: 'pick role',
                name: 'prole',
                choices: role.map(role =>
                ({
                    name: role.title,
                    value: role.id
                })
                ),
            },
            {
                type: 'list',
                message: 'pick manager',
                name: 'pman',
                choices: [
                    {
                        name: 'Mike Felix',
                        value: 1
                    },
                    {
                        name: 'Ernest Carrillo',
                        value: 2
                    },
                    {
                        name: 'Rafael Carter',
                        value: 3
                    },
                    {
                        name: 'No Manager',
                        value: null,
                    }
                ]
            }
        ]).then((answer) => {
            db.query(`
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?,?,?,?)`,
                [answer.fname, answer.lname, answer.prole, answer.pman], (err) => {
                    if (err) return console.log(err);
                    startQuestion();
                })
        })
    })
};



const updateRole = () => {

    db.query(`SELECT * FROM employee`, function (err, updates) {
        if (err) return console.log(err);

        inquirer.prompt([
            {
                name: 'updateEmployee',
                type: 'list',
                message: 'Update which employee?',
                choices: updates.map(employee =>
                ({
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                })
                )
            },
            {
                name: 'updatedRole',
                type: 'input',
                message: 'Update role id'
            }
        ]).then((answer) => {
            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,
                [answer.updateEmployee,answer.updateRole], (err) => {
                    if (err) return console.log(err);
                    startQuestion();
                })
        })
    })
};

