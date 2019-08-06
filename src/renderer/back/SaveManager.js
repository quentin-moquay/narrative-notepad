
export default class SaveManager {
  constructor () {
    if (!SaveManager.instance) {
      this.fs = require('fs')
      SaveManager.instance = this
      this.options = JSON.parse(this.fs.readFileSync('options.json', 'utf8'))
    }
    return SaveManager.instance
  }
  saveModel (fileName, model, exclude = [], callback = () => {}) {
    let toSave = {}
    for (let key in model) {
      if (!exclude.includes(key)) {
        toSave[key] = model[key]
      }
    }
    this.saveData(fileName, toSave, callback)
  }
  loadModel (fileName, model, callback = () => {}) {
    this.loadData(fileName, (objData) => {
      for (let key in objData) {
        model[key] = objData[key]
      }
      callback(objData)
    })
  }
  saveCollection (fileName, collection, callback = () => {}) {
    this.saveData(fileName, collection, callback)
  }
  loadCollection (fileName, collection, callback = () => {}) {
    this.loadData(fileName, (objData) => {
      collection.length = 0
      objData.forEach(it => collection.push(it))
      callback(objData)
    })
  }
  saveData (fileName, toSave, callback = () => {}) {
    console.log(`${this.options.workingDir}${fileName}`)
    this.fs.writeFile(`${this.options.workingDir}${fileName}`, JSON.stringify(toSave), 'utf8', () => {
      callback()
    })
  }
  loadData (fileName, callback = () => {}) {
    const errorProcessing = (err, data) => {
      if (err) {
        console.log(err)
      } else {
        let json = JSON.parse(data)
        callback(json)
      }
    }
    this.fs.readFile(`${this.options.workingDir}${fileName}`, 'utf8', errorProcessing)
  }
}

const instance = new SaveManager()
Object.freeze(instance)
