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

const deletefolderFunction = async (routeFolder, nameFolder) => {
  console.log(nameFolder);
  await nameFolder.forEach((file) => {
    console.log("imprimo ruta!");
    console.log(path.resolve(`${routeFolder}`, `${file}`));
    fs.stat(path.resolve(`${routeFolder}`, `${file}`), (statsError, info) => {
      console.log("imprimo info!");
      console.log(info);
      console.log("imprimo error!");
      console.log(statsError);
      if (!info.isDirectory()) {
        fs.unlink(path.resolve(`${routeFolder}`, `${file}`), (error) => {
          if (error) {
            console.log("File Error!!");
            console.log(file);
            console.log("Path File Error!!");
            console.log(path.resolve(`${routeFolder}`, `${file}`));
            console.log(error);
          } else {
            console.log(`Delete file`);
            console.log(`Delete ${file}`);
          }
        });
      } else {
        fs.readdir(
          path.resolve(`${routeFolder}`, `${file}`),
          async (error, folder) => {
            if (error) {
              console.log(error);
              return;
            } else {
              console.log(folder);
              await deletefolderFunction(
                path.resolve(`${routeFolder}`, `${file}`),
                folder
              );
            }
          }
        );
      }
    });
    fs.rmdir(path.resolve(`${routeFolder}`, `${file}`), (error) => {
      if (error) {
        console.log("Final File Error!!");
        console.log(file);
        console.log("Final Path File Error!!");
        console.log(path.resolve(`${routeFolder}`, `${file}`));
        console.log(error);
      } else {
        console.log(`Delete Folder`);
        console.log(`Delete ${file}`);
      }
    });
  });
};

const folderToDelete = async (deletefolder) => {
  console.log(path.resolve(deletefolder));

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
    const route = path.resolve(deletefolder);
    fs.readdir(path.resolve(deletefolder), (error, folder) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Tamaño del folder ->");
        console.log(folder.length);
        deletefolderFunction(route, folder);
      }
    });
  } else {
    console.log("Adios!");
    return;
  }
};

folderToDelete(folder);
