// Imports:
import m from 'mithril'
import { Line, Link, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class Contact {
  view() {
    return layout('contact', [
      m(Title, { content: 'Get in touch.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'At Tidemann&Co, we are here to help. We offer consulting, software development, startup advice and everything else to companies and people who are ready to embrace bold ideas and new ways of thinking.' }),
        m(Paragraph, { content: [
          'Let us know what\'s on your mind at ',
          m(Link, { content: 'hey@tdmn.co', external: true, to: 'mailto:hey@tdmn.co' }),
          ' and we will get right back to you.'
        ] })
      ])
    ])
  }
}

// Exports:
export { Contact }
