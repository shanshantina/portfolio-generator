// this is the code required for us to use fs module
const fs = require('fs');
// require to use the code from page-template.js
/* In order to use functions from one module inside another, we use the related statements module.exports and require. 
In the source file that has the functions we want to make available to other files, 
we use module.exports at its bottom. In the destination file(s) 
that we want to receive those exported functions, we put require at the top. */
const generatePage = require('./src/page-template.js');

// this is node gobal object taht represent everything going on with this particular app
const profileDataArgs = process.argv.slice(2);
// const name = profileDataArgs[0];
// const github = profileDataArgs[1];
// the below replace the above code and convert them into one line
const [name, github] = profileDataArgs;


// node module create multiple file types, including TXT, PDF, HTML, JSON, and more
fs.writeFile('./index.html', generatePage(name, github), err => {
  if(err) throw new Error(err);

  console.log('Portfolio complete! Check out index.html to see the output!');
});



// console.log(profileDataArgs);



// const printProfileData = profileDataArr => {
//     // this...
//     for (let i=0; i< profileDataArr.length; i++) {
//         console.log(profileDataArr[i]);
//     } 
//     console.log('================');

//     // is the same as this...
//     profileDataArr.forEach(profileItem => 
//         console.log(profileItem)
//     );
// };

// printProfileData(profileDataArgs);