import SaveManager from '@/back/SaveManager'
import Options from '@/back/Options'
import _ from 'lodash'
import Bluebird from 'bluebird'
import ejs from 'ejs'
import path from 'path'
import fs from 'fs'

export default class ExportPdf {
  constructor () {
    if (!ExportPdf.instance) {
      ExportPdf.instance = this
      this.pdf = require('html-pdf')
      this.options = Options.instance.config
    }
    return ExportPdf.instance
  }

  exportPdf () {
    Bluebird.join(
      SaveManager.instance.loadData('story_events.json'),
      SaveManager.instance.loadData('storyline.json'),
      (storiesEvents, storyline) => {
        ExportPdf.instance.constructPdf(JSON.parse(storiesEvents), JSON.parse(storyline))
      })
  }

  constructPdf (storiesEvents, storyline) {
    const promises = []
    const content = []
    storyline.forEach(id => {
      promises.push(SaveManager.instance.loadData(`chapter_${id}.html`))
    })
    Bluebird.each(promises, (text, index, length) => {
      const story = _.find(storiesEvents, {id: storyline[index]})
      content.push({
        order: index,
        story: story,
        text: text
      })
    }).then(_ => {
      ExportPdf.instance.generatePdf(content)
    })
  }

  generatePdf (content) {
    Bluebird.join(
      fs.readFileAsync(path.resolve('src/renderer/assets/book/pdf.css'), 'utf8'),
      fs.readFileAsync(path.resolve('src/renderer/assets/book/pdf.ejs'), 'utf8'),
      (css, template) => {
        const mapping = {
          css: css,
          title: 'My Book',
          chapters: _.sortBy(content, 'order')
        }
        let data = ejs.render(template, mapping, {})
        fs.writeFileAsync(`${this.options.workingDir}output.html`, data, 'utf8').then(_ => console.log('html wrote'))

        const options = {
          border: '2.5cm'
        }
        this.pdf.create(data, options).toFile(`${this.options.workingDir}output.pdf`, function (err, res) {
          if (err) return console.log(err)
          console.log(res)
        })
      }
    )
  }
}

const instance = new ExportPdf()
Object.freeze(instance)
