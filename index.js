//const fs = require("fs");
import fs from 'fs';
//const path = require('path');
import path from 'path';
//const inquirer = require("inquirer");
import inquirer from 'inquirer';
//const generateMarkdown = require("./utils/generateMarkdown");
//import generateMarkdown from '../utils/generateMarkdown';

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
    'Please provide your email address'
];


const writeToFile = (data) => {
    fs.writeFile('README.md',
    `# ${data[0]}
    ## Description
    ${data[1]}
    ## Table of Contents
    1. [Installation](#installation)
    2. [Usage](#usage)
    3. [License](#license)
    4. [Contributing](#contributing)
    5. [Tests](#tests)
    6. [Questions](#questions)
    ## Installation
    ${data[2]}
    ## Usage 
    ${data[3]}
    ## License
    ${data[4]}
    ## Contributing 
    ${data[5]}
    ## Tests
    ${data[6]}
    ## Questions 

    If you have any queries please feel free to contact me : ${data[8]}
    Github: ${data[7]}
    `
    ,(err) => err? console.log(err): console.log('success'));
}

// creates question objects to parse to inquire prompt
const execInquirer = (inquirerArr) => {
    inquirer.prompt(inquirerArr).then((data) => {
        console.log(data);
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
