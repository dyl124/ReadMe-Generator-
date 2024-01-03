const fs = require('fs');
const inquirer = require('inquirer');

let title;
let displayedFiles = [];

async function promptUser() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the project title:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter the project description:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter installation instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter usage information:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license:',
      choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'None'],
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'contributors',
      message: 'Enter contributors:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Please copy and paste any relevant test information:',
    },
    {
      type: 'checkbox',
      name: 'screenshots',
      message: 'Please select your screenshots',
      choices: displayedFiles, 
    },
  ]);
}

function generateREADME(results) {
  title = results.title;
  return `# ${results.title}

## Description
${results.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Questions](#questions)

## Installation
${results.installation}

## Usage
${results.usage}

## License
![License](https://img.shields.io/badge/License-${results.license}-brightgreen)

This project is licensed under the ${results.license} License - see the [LICENSE](LICENSE) file for details.

## Questions
For questions about this project, please contact [${results.github}](https://github.com/${results.github}) at ${results.contributors}.

## Tests
${results.tests}

## Screenshots
./screenshots/${results.screenshots}`;
}

function displayDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      displayedFiles = files;
      resolve(displayedFiles);
    });
  });
}

// Function to write content to file
function writeToFile(fileName, content) {
  fs.writeFile(fileName, content, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${fileName} successfully generated!`);
    }
  });
}

async function init() {
  try {
    // Display the directory contents and log displayedFiles
    await displayDirectory('./screenshots');
  

    // Prompt the user for input
    const userResults = await promptUser();

    // Generate README content
    const readmeContent = generateREADME(userResults);

    // Write to file
    const fileName = `README_${title}.md`;
    writeToFile(fileName, readmeContent);

  } catch (err) {
    console.error(err);
  }
}

// Run the application
init();
