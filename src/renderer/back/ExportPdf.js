import SaveManager from '@/back/SaveManager'
import Options from '@/back/Options'
import _ from 'lodash'

export default class ExportPdf {
  constructor () {
    if (!ExportPdf.instance) {
      ExportPdf.instance = this
      this.pdf = require('electron-phantom-html2pdf')
      this.options = Options.instance.config
    }
    return ExportPdf.instance
  }

  exportPdf () {
    SaveManager.instance.loadData('story_events.json')
    .then(storiesEvents => {
      SaveManager.instance.loadData('storyline.json')
      .then(storyline => {
        ExportPdf.instance.constructPdf(JSON.parse(storiesEvents), JSON.parse(storyline))
      })
    })
  }

  constructPdf (storiesEvents, storyline) {
    const content = []
    storyline.forEach((id, idx) => {
      SaveManager.instance.loadData(`chapter_${id}.html`)
      .then(text => {
        const story = _.find(storiesEvents, { id: id })
        content.push({
          order: idx,
          story: story,
          text: text
        })
        if (content.length === storyline.length) {
          ExportPdf.instance.generatePdf(content)
        }
      })
    })
  }

  generatePdf (content) {
    let contentsTableData = '<div style="page-break-after:always;"><table><tbody>'
    let data = '<div style="page-break-after:always;"><h1>My Book</h1></div>'
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
      html: data,
      css: 'body {\n' +
        '    font-family: \'Ubuntu\', sans-serif;\n' +
        '    font-size: 12px;' +
        '    text-align: justify;' +
        '}',
      deleteOnAction: true,
      paperSize: {
        format: 'A4',
        orientation: 'portrait',
        margin: '2.5cm'
      }
    }
    this.pdf.convert(options, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        result.toFile(`${this.options.workingDir}output.pdf`, () => {
          console.log('File wrote')
        })
      }
    })
  }
}

const instance = new ExportPdf()
Object.freeze(instance)
