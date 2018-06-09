// Imports:
import m from 'mithril'
import { Line, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class Services {
  view() {
    return layout('services', [
      m(Title, { content: 'Our art and craft is yours.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'Services.' })
      ])
    ])
  }
}

// Exports:
export { Services }
