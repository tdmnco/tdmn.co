// Imports:
import m from 'mithril'
import { Line, Paragraph, Signature, Title } from './'
import { content, layout } from '../templates'

// Classes:
class Home {
  view() {
    return layout('home', [
      m(Title, { content: 'Quality is built on love.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'Tidemann&Co is a Copenhagen-based corporation with activities in software and investments. We believe that quality is built on proper planning, efficient execution and a genuine love for what you do.' }),
        m(Paragraph, { content: 'Our craft is software. We live and breathe the art and science of computers, because it enables us to do so many amazing things. Software breaks barriers and builds bridges in business, society and life in general.' }),
        m(Paragraph, { content: 'We invest in people, not ideas. We bet on the ability to make things happen and we match with anyone who cares deeply for what they do.' }),
        m(Signature)
      ])
    ])
  }
}

// Exports:
export { Home }
