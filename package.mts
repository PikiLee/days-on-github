import fs from 'fs'
import path from 'path'
import AdmZip from 'adm-zip'
import pc from 'picocolors'

// constants
const directoryPath = path.dirname(import.meta.url).replace('file://', '')
const targetFilename = 'days-on-github.zip'

const targetPath = path.join(directoryPath, targetFilename)

console.log(pc.black(`Operating Directory: ${directoryPath}`))

// creating archives
const zip = new AdmZip()

const filenames = ['compose.yaml', 'compose.prod.yaml', '.env', 'user_conf.d']

// add local file
filenames.forEach(filename => {
  const filePath = path.join(directoryPath, filename)
  const isDirectory = fs.lstatSync(filePath).isDirectory()
  console.log(
    pc.blue(`Adding ${isDirectory ? 'directory' : 'file'}: ${filename}`)
  )
  if (isDirectory) {
    zip.addLocalFolder(filePath, filename)
  } else {
    zip.addLocalFile(filePath)
  }
})

// or write everything to disk
console.log(pc.green(`Writing to: ${targetPath}`))
zip.writeZip(targetPath)
