# File Watcher CLI

A command-line tool for monitoring file system changes with a focus on development workflows (in latter versions).

![How File Watcher Works](https://raw.githubusercontent.com/starboyles/file-watcher/main/Users/starboyles/Desktop/filewatcher.png)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd file-watcher-cli
```

2. Install dependencies:
```bash
npm install
```

3. Make the CLI globally available:
```bash
npm link
```

## Usage

Basic usage:
```bash
node index.js
```

Watch a specific directory:
```bash
node index.js --path /path/to/directory
```

Watch with custom ignore patterns:
```bash
node index.js --ignore "*.log,*.tmp"
```

## Features

- Real-time file system monitoring
- Directory and file change detection
- Configurable ignore patterns
- Colored console output for different events
- Support for watching specific paths
- Directory-specific monitoring
- Automatic handling of system file limits

### Event Types

- `📁 Folder Added` - When a new directory is created
- `🗑️ Folder Removed` - When a directory is deleted
- `📝 File Added` - When a new file is created
- `🔄 File Changed` - When a file is modified
- `🗑️ File Removed` - When a file is deleted

## Configuration

The watcher can be configured with the following options:

- `--path`: Directory to watch (default: current directory)
- `--ignore`: Comma-separated list of patterns to ignore

### Default Ignored Patterns

- `node_modules/**` - All node_modules directories
- Dotfiles (files starting with .)
- `dist/**` - Distribution directories

### Advanced Configuration

The watcher uses the following settings for optimal performance:

- `depth: 0` - Only watch immediate children of the target directory
- `usePolling: true` - More reliable file system monitoring
- `ignoreInitial: false` - Show existing files when starting
- `followSymlinks: false` - Don't follow symbolic links
- `atomic: true` - Treat file operations as atomic

## Examples

1. Watch Desktop for changes:
```bash
node index.js --path ~/Desktop
```

2. Watch project directory excluding test files:
```bash
node index.js --path ./project --ignore "**/*.test.js"
```

3. Watch with multiple ignore patterns:
```bash
node index.js --ignore "*.log,*.tmp,build/**"
```

## API Reference

### Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| --path | Directory to watch | Current directory |
| --ignore | Patterns to ignore | "" |
| --version | Show version | - |
| --help | Show help | - |

### Events

| Event | Description |
|-------|-------------|
| addDir | Directory created |
| unlinkDir | Directory removed |
| add | File created |
| change | File modified |
| unlink | File removed |

## Troubleshooting

### EMFILE Errors

If you encounter "too many open files" errors:

For macOS:
```bash
sudo launchctl limit maxfiles 65536 200000
```

For Linux, add to ~/.bashrc:
```bash
ulimit -n 65536
```

### Common Issues

1. No events firing:
   - Check if the path is correct
   - Verify permissions
   - Ensure ignore patterns aren't too broad

2. High CPU usage:
   - Reduce watch depth
   - Add more specific ignore patterns
   - Disable polling if not needed

## License

MIT License - See LICENSE file for details