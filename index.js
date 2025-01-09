#!/usr/bin/env node

import chokidar from "chokidar";
import chalk from "chalk";
import { program } from "commander";

program
  .version("1.0.0")
  .description("A file system monitor for development workflows")
  .option("-p, --path <path>", "Path to watch", process.cwd())
  .option(
    "-i, --ignore <ignore>",
    "Ignore pattern (comma-separated)",
    "node_modules/**/*"
  )
  .parse(process.argv);

const options = program.opts();

// watcher instance with improved options
const watcher = chokidar.watch(options.path, {
  ignored: [
    /(^|[\/\\])\../, // ignore dotfiles
    /node_modules/, // ignore node_modules
    options.ignore,
  ],
  persistent: true,
  ignoreInitial: true,
});

console.log(chalk.blue(`🔍 Starting to watch: ${options.path}`));
console.log(chalk.gray("(Ignoring node_modules and dotfiles)"));

// event listeners with improved formatting
watcher
  .on("add", (path) =>
    console.log(chalk.green(`📝 Added: ${path.replace(process.cwd(), "")}`))
  )
  .on("change", (path) =>
    console.log(chalk.yellow(`🔄 Changed: ${path.replace(process.cwd(), "")}`))
  )
  .on("unlink", (path) =>
    console.log(chalk.red(`🗑️  Removed: ${path.replace(process.cwd(), "")}`))
  )
  .on("error", (error) => console.log(chalk.red(`❌ Error: ${error}`)));
