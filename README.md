# Docker Image ID Extractor

** Docker Image ID Extractor** is a React-based web application designed to parse Docker image details from plain text input, allowing users to select specific image IDs and generate a command to remove those images using Docker.

## Features
- Parse Docker image details from text input.
- Display parsed data in a table format.
- Select specific image IDs for deletion.
- Generate and copy the Docker remove command.
- Automatic reset of the form after copying the command.

## Prerequisites
- Node.js and npm installed on your machine.

## Installation

Clone the repository:

```sh
git clone https://github.com/imaltaf/docker-imageID-extractor.git
cd image-id-extractor
```

```sh
npm install
```
## Start the application:

```sh
npm start
```
## Usage
Paste Input
Paste the Docker image details into the provided textarea.

## Select Image IDs
Check the boxes next to the image IDs you want to delete.

## Convert and Copy Command
Click the "Convert" button to generate the Docker command.

## Click the "Copy to Clipboard" button to copy the command to the clipboard.

## Automatic Reset
The form will reset automatically 10 seconds after copying the command.