const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();


const targetPath = './src/environments/environments.ts'

const envFileContent = `
export const environments = {
  mapbox_key: "${ process.env['MAPBOX_KEY'] }"
}`

//sí existe, se sobrescribe con {recursive: true}
mkdirSync('./src/environments', {recursive: true});

writeFileSync( targetPath, envFileContent );
