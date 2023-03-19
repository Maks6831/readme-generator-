
//------------------------------------------------------------- imports -------------------------------------------------------------//


//const fs = require("fs");
//import fs from 'fs';
////const path = require('path');
//import path from 'path';
////const inquirer = require("inquirer");
//import inquirer from 'inquirer';
const fs = require('fs');
const path = require("path");
const inquirer = require("inquirer")

//const generateMarkdown = require("./utils/generateMarkdown");
//import generateMarkdown from '../utils/generateMarkdown';

//------------------------------------------------------------- Global Variables -------------------------------------------------------------//

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "README.md");
// object containing all of the license badges
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

//------------------------------------------------------------- Creating the README -------------------------------------------------------------//

// takes in a - which is the key chosen and b - license object - loops to find badge string.
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

// takes data from prompts and creates README
const writeToFile = (data) => {
    fs.writeFile(outputPath,
    `# ${data[0]} <!-- omit in toc -->
${findBadge(data[4], licenses)} <br>
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
If you have any queries please feel free to contact me : ${data[8]} <br>
Github: <a href="https://github.com/${data[7]}">click here</a>
`
    ,(err) => err? console.log(err): console.log('success'));
}

//------------------------------------------------------------- inquirer prompts -------------------------------------------------------------//

// parses questions object to inquirer.prompt
const execInquirer = (inquirerArr) => {
    inquirer.prompt(inquirerArr).then((data) => {
        writeToFile(data);
    });
}

// creates question objects to parse to inquire prompt
const inquirerPrompts = (questions) => {
    let inquirerArr = [];
    // turns the license question into a list.
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
execInquirer(inquirerArr);
}

// function to initialize program
function init() {
    inquirerPrompts(questions)
}

// function call to initialize program
init();

