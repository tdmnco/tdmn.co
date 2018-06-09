// Imports:
import m from 'mithril'
import { Line, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class Investments {
  view() {
    return layout('investments', [
      m(Title, { content: 'We invest in people.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'That is why we invest our money where people put their hearts and hard work at.' })
      ])
    ])
  }
}

// Exports:
export { Investments }
