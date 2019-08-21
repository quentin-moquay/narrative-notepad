import Options from '@/back/Options'

export default class SaveManager {
  constructor () {
    if (!SaveManager.instance) {
      this.fs = require('fs')
      SaveManager.instance = this
      this.options = Options.instance.config
    }
    return SaveManager.instance
  }

  saveModel (fileName, model, exclude = []) {
    const toSave = {}
    for (const key in model) {
      if (!exclude.includes(key)) {
        toSave[key] = model[key]
      }
    }
    return this.saveData(fileName, JSON.stringify(toSave))
  }

  loadModel (fileName, model) {
    return new Promise((resolve, reject) => {
      this.loadData(fileName)
        .then(data => {
          const objData = JSON.parse(data)
          for (const key in objData) {
            model[key] = objData[key]
          }
          resolve(objData)
        })
        .catch(err => reject(err))
    })
  }

  saveCollection (fileName, collection) {
    return this.saveData(fileName, JSON.stringify(collection))
  }

  loadCollection (fileName, collection = []) {
    return new Promise((resolve, reject) => {
      this.loadData(fileName)
        .then(data => {
          const objData = JSON.parse(data)
          collection.length = 0
          objData.forEach(it => collection.push(it))
          resolve(objData)
        })
        .catch(err => reject(err))
    })
  }

  saveData (fileName, toSave) {
    return this.fs.writeFileAsync(`${this.options.workingDir}${fileName}`, toSave, 'utf8')
  }

  loadData (fileName) {
    return this.fs.readFileAsync(`${this.options.workingDir}${fileName}`, 'utf8')
  }
}

const instance = new SaveManager()
Object.freeze(instance)
