const fs = require('fs');
const path = require('path')

interface JsonFile {
    [key: string]: any;
}

function loadJsonFilesFromDir(directoryPath: string): JsonFile[] {
    const jsonFiles: JsonFile[] = [];

    // Get list of files in the directory
    const files = fs.readdirSync(directoryPath);

    // Loop through each file
    for (const file of files) {
        const filePath = path.join(directoryPath, file);

        // Check if it's a file and ends with .json
        if (fs.statSync(filePath).isFile() && file.endsWith('.json')) {
            try {
                // Read and parse JSON file
                const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                jsonFiles.push(jsonData);
            } catch (error) {
                console.error(`Error parsing JSON file ${filePath}: ${error}`);
            }
        }
    }

    return jsonFiles;
}

// Usage
const directoryPath = './data';
const jsonFiles = loadJsonFilesFromDir(directoryPath);
console.log(jsonFiles.flat().length);
