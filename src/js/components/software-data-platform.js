// Imports:
import m from 'mithril'
import { Line, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class SoftwareDataPlatform {
  view() {
    return layout('software-data-platform', [
      m(Title, { content: 'The Data Platform.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'Information about the Data Platform.' })
      ])
    ])
  }
}

// Exports:
export { SoftwareDataPlatform }
