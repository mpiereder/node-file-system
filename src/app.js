/* Importing Node File System*/
const fs = require('fs');
/* Importing utility functions */
const util = require('./assets/util.functions');

/* Path of desired directory */
const directory = './bacon-ipsum';
/* Object keys are the words to be counted. Values should be 0 */
const foods = {
    ribs: 0,
    chicken: 0,
    jerky: 0,
    tenderloin: 0,
    jalapeno: 0,
    lorem: 0
};

/* Used to keep track of the number of files in a dir. Should be set to 0 */
let fileCount = 0;

/**
 * Logs out the occurrence of an objects keys in a directory.
 * @param {string} dirPath: directory path relative to function evocation.
 * @param {object} wordsObj: keys will be iterated over and numerical values to be incremented.
 */
function dirWordCount (dirPath, wordsObj) {

    fs.readdir(dirPath, (error, files) => {
        if (error) { throw new Error(error); }

        for (let item of files) {
            let itemPath = `${dirPath}/${item}`;

            fs.stat(itemPath, (error, stat) => {
                if (error) { throw new Error(error); }

                if (stat.isFile()) {
                    let words = fs.readFileSync(itemPath, 'utf-8').split(' ');
                    let output = util.rmBraces(JSON.stringify(util.keysInArr(wordsObj, words), null, 4));
                    fileCount++;

                    console.log(`File ${fileCount}\n${item}:${output}`);

                    util.setKeysToZero(wordsObj);
                } else if (stat.isDirectory()) {
                    dirWordCount(itemPath, wordsObj);
                }
            });
        }
    });
}

dirWordCount(directory, foods);