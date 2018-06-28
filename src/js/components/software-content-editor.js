// Imports:
import m from 'mithril'
import { Line, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class SoftwareContentEditor {
  view() {
    return layout('software-content-editor', [
      m(Title, { content: 'The Content Editor.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'Information about the Content Editor.' })
      ])
    ])
  }
}

// Exports:
export { SoftwareContentEditor }
