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

const deletefolderFunction = (nameFolder) => {
  nameFolder.map((file) => {
    console.log("imprimo file!");
    console.log(file);
    fs.stat(path.resolve(file), (statsError, info) => {
      console.log("imprimo info!");
      console.log(info);
      console.log("imprimo error!");
      console.log(statsError);
      if (info.isFile()) {
        fs.unlink(path.resolve(file), (error) => {
          if (error) {
            console.log(error);
          } else {
            fs.readdir(path.resolve(file), async (error, folder) => {
              if (error) {
                console.log(error);
                return;
              } else {
                console.log(folder);
                deletefolderFunction(folder);
              }
            });
          }
        });
      } else {
        fs.rmdir(path.resolve(file), (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Delete ${file}`);
          }
        });
      }
      console.log(`Delete ${file}`);
      fs.rmdirSync(file);
    });
  });
};

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

      if (answers) {
        deletefolderFunction(folder);
      } else {
        console.log("Adios!");
        return;
      }
    }
  });
};

folderToDelete(folder);
