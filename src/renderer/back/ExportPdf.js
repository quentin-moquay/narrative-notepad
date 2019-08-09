import SaveManager from '@/back/SaveManager'
import Options from '@/back/Options'
import _ from 'lodash'
import Bluebird from 'bluebird'

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
    let contentsTableData = '<div style="page-break-after:always;"><table><tbody>'
    let data = '<style>' +
      'body {\n' +
      '    font-family: \'Ubuntu\', sans-serif;\n' +
      '    font-size: 12px;' +
      '    text-align: justify;' +
      '}' +
      '</style>'
    data += '<div style="page-break-after:always;"><h1>My Book</h1></div>'
    _.sortBy(content, 'order').forEach((chapter, idx) => {
      contentsTableData += '<tr>'
      contentsTableData += `<td>${idx + 1}.${chapter.story.description}</td>`
      contentsTableData += '</tr>'

      data += '<div style="page-break-after:always;">'
      data += `<h2>${idx + 1}</h2>`
      data += chapter.text
      data += '</div>'
    })
    contentsTableData += '</tbody></table></div>'
    data += contentsTableData

    const options = {
      border: '2.5cm'
    }
    this.pdf.create(data, options).toFile(`${this.options.workingDir}output.pdf`, function (err, res) {
      if (err) return console.log(err)
      console.log(res)
    })
  }
}

const instance = new ExportPdf()
Object.freeze(instance)
