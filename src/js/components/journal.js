// Imports:
import m from 'mithril'
import { Line, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class Journal {
  view() {
    return layout('journal', [
      m(Title, { content: 'Journal.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'Our thoughts on things.' })
      ])
    ])
  }
}

// Exports:
export { Journal }
