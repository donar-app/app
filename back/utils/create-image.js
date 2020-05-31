'use strict'

const fs = require('fs');
const path = require('path');


module.exports = async (pathFile) => {
    let chunks = '';
    let imagen64 = await fs.createReadStream( path.resolve( __dirname, `../uploads/${ pathFile }`), 'base64' );

    imagen64.setEncoding('base64');

    for await (const chunk of imagen64) {
        chunks += chunk;
    }

    return chunks

}