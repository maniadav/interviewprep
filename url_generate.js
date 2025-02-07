const fs = require("fs");
const path = require("path");

const rootDir = __dirname; // Set root directory

// Function to get all directories in the root folder
const getDirectories = (source) => {
  return fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith(".")) // Exclude hidden directories
    .map((dirent) => dirent.name);
};

// Function to get files inside a directory
const getFiles = (dirPath) => {
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);
};

const directories = getDirectories(rootDir);
const routes = [];

directories.forEach((dir) => {
  const dirPath = path.join(rootDir, dir);
  const files = getFiles(dirPath);

  routes.push(`### ${String(dir[0]).toUpperCase() + String(dir).slice(1)}`);

  files.forEach((fileName) => {
    const { name } = path.parse(fileName); // Extract filename without extension
    if (name?.split(".")[0]) {
      const urlName = name.replace(/[-_]/g, " ").toLocaleLowerCase();

      routes.push(`1. **[${urlName}](${dir}/${name})**`);
    }
  });
  routes.push(`  `);
});

// Output the generated routes
console.log("Generated Routes:");
console.log(routes.join("\n"));

fs.writeFileSync("routes.md", routes.join("\n"), "utf-8");
