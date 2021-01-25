const inquirer = require('inquirer');
// this is the code required for us to use fs module
const fs = require('fs');
// require to use the code from page-template.js
/* In order to use functions from one module inside another, we use the related statements module.exports and require. 
In the source file that has the functions we want to make available to other files, 
we use module.exports at its bottom. In the destination file(s) 
that we want to receive those exported functions, we put require at the top. */
const generatePage = require('./src/page-template.js');

/* inquirer's prompt method can receive an array of objects in its argument, known as the question object.
 The properties of the question object identify the type, name, and question message of this particular question. 
 "Input" was chosen as the type of question because the answer will be a text reply.
 The answer object is returned as a Promise. We'll explore Promises more later, 
 but for now understand that this is a new tool for dealing with asynchronous functions 
 that will return the answer object in the then function */

 // profile questions
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your GitHub name!');
          return false;
        }
      }  
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      // similar to validate function, only when function pass an object of all of the answers given so far as an object
      when: ({confirmAbout}) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }    
  ])
};
// promptUser().then(answers => console.log(answers));

//project questions
const promptProject = portfolioData => {
  console.log(`
  =================
  Add a New Project
  =================
  `);
  // add array inside promptProject instead of using global variables
  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      // validate if there is an input or not
      validate: nameInput =>{
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your project's name!");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput =>{
        if (descriptionInput) {
          return true;
        } else {
          console.log("Please enter your project's description!");
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: linkInput =>{
        if (linkInput) {
          return true;
        } else {
          console.log("Please enter your project's Github link!");
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  })
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });



// const pageHTML = generatePage(name, github);

// // node module create multiple file types, including TXT, PDF, HTML, JSON, and more
// fs.writeFile('./index.html', pageHTML, err => {
//   if(err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });
