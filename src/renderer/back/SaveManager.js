import ProjectLoader from '@/back/ProjectLoader'
import fs from 'fs'

export default class SaveManager {
  constructor () {
    if (!SaveManager.instance) {
      SaveManager.instance = this
    }
    return SaveManager.instance
  }

  getPath (path) {
    return ProjectLoader.instance.getTempDir() + '/' + path
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
    return fs.writeFileAsync(this.getPath(fileName), toSave, 'utf8')
  }

  loadData (fileName) {
    return fs.readFileAsync(this.getPath(fileName), 'utf8')
  }
}

const instance = new SaveManager()
Object.freeze(instance)
