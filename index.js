//const fs = require("fs");
import fs from 'fs';
//const path = require('path');
import path from 'path';
//const inquirer = require("inquirer");
import inquirer from 'inquirer';
//const generateMarkdown = require("./utils/generateMarkdown");
//import generateMarkdown from '../utils/generateMarkdown';

const licenses = {
    'MIT': '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)',
    'GPLv2': '![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)',
    "Apache": '![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)',
    'BSD 3-clause': '![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)'
}

// array of questions for user
const questions = [
    'what is the title of your project?',
    'Please provide a description',
    'Please provide installation process',
    'Please provide the usage',
    'Please choose a license',
    'Please provide any contributions',
    'Describe any testing procedures',
    'Please provide your github username',
    'Please provide your email address',
    'Please enter your name'
];

const findBadge = (a, b) => {
    let badge = '';
    for (const key in b){
        if(key == a){
            badge = b[key];
            return badge;
            console.log(badge);
        }
    }
}

const writeToFile = (data) => {
    fs.writeFile('README.md',
    `# ${data[0]} <!-- omit in toc -->
${findBadge(data[4], licenses)}
${data[1]}
## Table of Contents <!-- omit in toc -->

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${data[2]}
## Usage 
${data[3]}
## License
Copyright &copy ${new Date().getFullYear()} ${data[9]}. Licensed under the ${data[4]} license;
${data[4]}
## Contributing 
${data[5]}
## Tests
${data[6]}
## Questions 
If you have any queries please feel free to contact me : ${data[8]}
Github: <a href="github.com/${data[7]}">click here</a>
`
    ,(err) => err? console.log(err): console.log('success'));
}

// creates question objects to parse to inquire prompt
const execInquirer = (inquirerArr) => {
    inquirer.prompt(inquirerArr).then((data) => {
        console.log(data);
        findBadge(data)
        writeToFile(data);
    });
}

const inquirerPrompts = (questions) => {
    let inquirerArr = [];
    for(let i =0; i < questions.length; i++){
        if(questions[i].includes('license')){
            let inquireQ = {
                type:'list',
                name: i.toString(),
                message: questions[i],
                choices: ['MIT', 'GPLv2', 'Apache', 'BSD 3-clause']
            }
            inquirerArr.push(inquireQ);
        } else {
            let inquireQ = {
                name: i.toString(),
                message: questions[i],
            }
            inquirerArr.push(inquireQ);
        }
        }     
console.log(inquirerArr);
execInquirer(inquirerArr);
}


// function to write README file
//function writeToFile(fileName, data) {
//}

// function to initialize program
function init() {
    inquirerPrompts(questions)
}

// function call to initialize program
init();

