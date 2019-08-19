export default class Options {
  constructor () {
    if (!Options.instance) {
      Options.instance = this
      this.fs = require('fs')
      this.config = JSON.parse(this.fs.readFileSync('options.json', 'utf8'))
    }
    return Options.instance
  }
  save () {
    this.fs.writeFileSync('options.json', JSON.format(this.config), 'utf8')
  }
}

const instance = new Options()
Object.freeze(instance)
