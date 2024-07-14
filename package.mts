import fsp from 'fs/promises'
import path from 'path'
import fs from 'fs'
import AdmZip from 'adm-zip'
import pc from 'picocolors'
import Enquirer from 'enquirer'

// constants
const directoryPath = path.dirname(import.meta.url).replace('file://', '')
const targetFilename = 'package.zip'
const gitignoreFilename = '.gitignore'

const targetPath = path.join(directoryPath, targetFilename)
const gitignore = path.join(directoryPath, gitignoreFilename)

console.log(pc.black(`Operating Directory: ${directoryPath}`))

const environment = await Enquirer.prompt<{
  value: 'Debug' | 'Production'
}>({
  type: 'select',
  name: 'value',
  message: 'Select an environment',
  choices: ['Debug', 'Production']
})

// creating archives
const zip = new AdmZip()

// read gitignore and filter files
const gitignoreContent = await fsp.readFile(gitignore)
const ignores = gitignoreContent.toString().split('\n').filter(Boolean)

const filenames = await fsp.readdir(directoryPath)
const filteredFilenames = filenames.filter(
  filename => !ignores.includes(filename)
)
filteredFilenames.push('.env')

// add local file
filteredFilenames.forEach(filename => {
  const filePath = path.join(directoryPath, filename)
  const isDirectory = fs.lstatSync(filePath).isDirectory()
  console.log(
    pc.blue(`Adding ${isDirectory ? 'directory' : 'file'}: ${filename}`)
  )
  if (isDirectory) {
    zip.addLocalFolder(filePath, filename)
  } else if (filename === '.env' && environment.value === 'Debug') {
    console.log(pc.yellow('Debug environment detected: rewriting .env file'))
    const fileContent = fs
      .readFileSync(filePath, 'utf-8')
      .replace('STAGING=0', 'STAGING=1')
      .replace('DEBUG=0', 'DEBUG=1')
    console.log(pc.yellow('Rewritten content:'))
    consoleDivider()
    console.log(fileContent)
    consoleDivider()
    zip.addFile(filename, Buffer.alloc(fileContent.length, fileContent))
  } else {
    zip.addLocalFile(filePath)
  }
})

// or write everything to disk
console.log(pc.green(`Writing to: ${targetPath}`))
zip.writeZip(targetPath)

function consoleDivider() {
  console.log(pc.gray('-----------------------------'))
}
