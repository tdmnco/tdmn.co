// Imports:
import m from 'mithril'
import { Line, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class Contact {
  view() {
    return layout('contact', [
      m(Title, { content: 'Get in touch.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'Contact info.' })
      ])
    ])
  }
}

// Exports:
export { Contact }
