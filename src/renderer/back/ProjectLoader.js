import tar from 'tar-fs'
import fs from 'fs'
import path from 'path'
import Options from './Options'

export default class ProjectLoader {
  constructor () {
    if (!ProjectLoader.instance) {
      ProjectLoader.instance = this
      this.current = false
    }
    return ProjectLoader.instance
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
    return this.filePath + '/.' + this.fileName
  }
  load (project) {
    if (this.current) {
      this.save()
    }
    this.current = project
    this.filePath = path.dirname(project)
    this.fileName = path.basename(project)

    return new Promise((resolve, reject) => {
      fs.createReadStream(project)
      .pipe(tar.extract(this.getTempDir(), {
        finish: evt => resolve(evt)
      }))
    })
  }
  save () {
    return new Promise((resolve, reject) => {
      tar.pack(this.getTempDir()).pipe(fs.createWriteStream(this.filePath + '/' + this.fileName).on('close', function (evt) {
        resolve(evt)
      }))
    })
  }
}

const instance = new ProjectLoader()
