import fs from 'fs'
import ProjectLoader from '@/back/ProjectLoader'

export default class Options {
  constructor () {
    if (!Options.instance) {
      Options.instance = this
    }
    return Options.instance
  }
  init () {
    this.config = {
      selected: 'brainstorm'
    }
  }
  load () {
    this.config = JSON.parse(fs.readFileSync(this.getPath('options.json'), 'utf8'))
  }
  getPath (path) {
    return ProjectLoader.instance.getTempDir() + '/' + path
  }
  save () {
    fs.writeFileSync(this.getPath('options.json'), JSON.stringify(this.config), 'utf8')
  }
}

const instance = new Options()
