const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const { program } = require("commander");
program.version("0.0.1");

program.option("-f, --folder <type>", "folder to remove");

program.parse(process.argv);

const { folder } = program.opts();

console.log("Name folder");
console.log(folder);

const folderToDelete = (deletefolder) => {
  fs.readdir(path.resolve(deletefolder), async (error, folder) => {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log(folder);

      const answers = await inquirer.prompt({
        name: "borrar",
        type: "list",
        message: "¿Seguro que quiere borrar?",
        choices: [
          {
            name: "Si",
            value: true,
          },
          {
            name: "No",
            value: false,
          },
        ],
        default: false,
      });

      /*  folder.map(()=>) */
    }
  });
};

folderToDelete(folder);
