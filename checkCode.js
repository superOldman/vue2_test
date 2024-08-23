const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { promisify } = require('util')

console.log(fs.readFile);
const readFileAsync = promisify(fs.readFile)
const globAsync = promisify(glob)



// 数组
const arrayToCheck = [1000, 123131, 54646]

// 扫描前端项目目录
const projectDir = './src' // 替换为你的项目路径

async function scanFiles() {
  try {
    // 获取所有非 .css 文件 '**/*.png'
    //             ignored: p => /\.png$/.test(p.name),
    // childrenIgnored: p => {
    //     console.log(1,p);
    //     return p.isNamed('docs')
    // },
    const files = await globAsync(`${projectDir}/**/*`, { nodir: true, ignore: ['./**/*.png', './**/*.min.js', './**/*.scss'] })
    console.log(files)
    // 读取文件内容并检查数组中的每一项是否使用
    const unusedItems = new Set(arrayToCheck)

    // 创建Promise数组，用于并行处理文件读取和内容检查
    const checkPromises = files.map(async file => {
      const content = await readFileAsync(file, 'utf8')
      arrayToCheck.forEach(item => {
        const itemPattern = new RegExp(`\\b${item}\\b`, 'g')
        // console.log('itemPattern',itemPattern)

        const matches = content.matchAll(itemPattern)
        // console.log(matches)
        // const matches = String.prototype.matchAll.call(content,itemPattern)

        for (const match of matches) {
          const start = Math.max(match.index - 15, 0)
          const end = Math.min(match.index + item.toString().length + 15, content.length)
          const context = content.slice(start, end)

          console.log(`Matched ${item} in file ${file}: ...${context}...`)

          unusedItems.delete(item)
        }
      })
    })

    // 等待所有文件处理完成
    await Promise.all(checkPromises)

    console.log('Unused items:', Array.from(unusedItems))
  } catch (err) {
    console.error('Error:', err)
  }
}

scanFiles()
// module.exports = {
//     a : 1
// }
