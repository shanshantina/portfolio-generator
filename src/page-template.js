// in this arrow function, we do not have parameters, so we need to use () to hold the place where parameters would've been
const generatePage = (name, github) => {
    // insert html contains
    return`
    <!DOCTYPE html> 
    <html lang="en"> 
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Portfolio Demo</title>
    </head>
  
    <body>
      <h1>${name}</h1>
      <h2><a href="https://github.com/${github}">Github</a></h2>
    </body>
    </html>
    `;
};

/* In order to use functions from one module inside another, we use the related statements module.exports and require. 
In the source file that has the functions we want to make available to other files, 
we use module.exports at its bottom. In the destination file(s) 
that we want to receive those exported functions, we put require at the top. */
module.exports = generatePage;