const fs = require('fs')
const path = require('path')

// 用callback方式获取一个文件内容
// function getFileContent(filName, callback) {
//   const fullFileName = path.resolve(__dirname, 'files', filName)
//   fs.readFile(fullFileName, (err, data) => {
//     if(err) {
//       console.error(err)
//       return
//     }
//     callback(
//       JSON.parse(data.toString())
//     )
//   })
// }

// getFileContent('a.json', aData => {
//   console.log('a data', aData)
//   getFileContent(aData.next, bData => {
//     console.log('b data', bData)
//     getFileContent(bData.next, cData => {
//       console.log('c data', cData)
//     })
//   })
// })

// 用promise获取文件内容
function getFileContent(filName) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', filName)
    fs.readFile(fullFileName, (err, data) => {
      if(err) {
        reject(err)
        return
      }
      resolve(
        JSON.parse(data.toString())
      )
    })
  })
  return promise
}

// getFileContent('a.json').then(aData => {
//   console.log('a data', aData)
//   return getFileContent(aData.next)
// }).then(bData => {
//   console.log('b data', bData)
//   return getFileContent(bData.next)
// }).then(cData => {
//   console.log('c data', cData)
// })

// 用 async-await 获取文件内容
async function readFileData() {
  // 同步写法
  try {
    const aData = await getFileContent('a.json')
    console.log('a data', aData)
    const bData = await getFileContent(aData.next)
    console.log('b data', bData)
    const cData = await getFileContent(bData.next)
    console.log('c data', cData)
  } catch (err) {
    console.error(err)
  }
}

readFileData()

