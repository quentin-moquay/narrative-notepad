import tar from 'tar-fs'
import fs from 'fs'
import path from 'path'
import Options from './Options'
import _ from 'lodash'
import electron from 'electron'

export default class ProjectLoader {
  constructor () {
    if (!ProjectLoader.instance) {
      ProjectLoader.instance = this
      this.current = false
    }
    return ProjectLoader.instance
  }

  init (vue) {
    this.vue = vue
  }

  initProject (project) {
    if (this.current) {
      this.save()
    }

    this.current = project + '.tar'
    this.filePath = path.dirname(project)
    this.fileName = path.basename(project) + '.tar'

    fs.mkdirSync(this.getTempDir())
    Options.instance.init()
    Options.instance.save()

    return this.save()
  }
  getTempDir () {
    return this.filePath + '/~' + this.fileName
  }
  load (project) {
    return new Promise((resolve, reject) => {
      this.close().then(a => {
        this.current = project
        this.filePath = path.dirname(project)
        this.fileName = path.basename(project)

        fs.createReadStream(project)
        .pipe(tar.extract(this.getTempDir(), {
          finish: evt => resolve(evt)
        }))
      })
    })
  }
  save () {
    return new Promise((resolve, reject) => {
      if (this.current) {
        tar.pack(this.getTempDir()).pipe(fs.createWriteStream(this.filePath + '/' + this.fileName).on('close', function (evt) {
          resolve(evt)
        }))
      } else {
        resolve()
      }
    })
  }
  close () {
    return new Promise((resolve, reject) => {
      if (this.current) {
        this.save().then(a => {
          this.vue.setCurrentTab('choose-project')
          this.current = false
          resolve()
        })
      } else {
        resolve()
      }
    })
  }
  /**
   * Load a dialog (used by ChooseProject and Menu from index.js)
   */
  choose () {
    const dialog = electron.remote ? electron.remote.dialog : electron.dialog

    dialog.showOpenDialog({
      filters: [
        { name: 'Narrative Files', extensions: ['tar'] }
      ]})
    .then(project => {
      if (project === undefined || _.size(project.filePaths) === 0) {
        console.log('No file selected')
        return
      }

      this.load(project.filePaths[0]).then(callback => {
        Options.instance.load()
        this.vue.setCurrentTab(Options.instance.config.selected)
      })
    })
  }
}

const instance = new ProjectLoader()
