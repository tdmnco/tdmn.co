// Imports:
import m from '../../../node_modules/mithril/mithril'
import { Line, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class Home {
  view() {
    return layout('home', [
      m(Title, { content: 'Quality is built on love.' }),
      m(Line),
      content([
        m(Paragraph, { content: 'Tidemann&Co is a Copenhagen-based corporation with activities in software and investments. We believe that quality is built on proper planning, efficient execution and a genuine love for what you do.' }),
        m(Paragraph, { content: 'Our craft is software. We live and breathe the art and science of computers, because it enables us to do so many amazing things. Software breaks barriers and builds bridges in business, society and life in general.' }),
        m(Paragraph, { content: 'We invest in people. Ideas are short-lived if not for the people behind them making all the difference. We match with people who care deeply for what they do.' }),
        m(Paragraph, { content: 'All the best,' }),
        m(Paragraph, { content: [
          'Kasper Tidemann',
          m('span', { class: 'title' }, 'CEO, Tidemann&Co')
        ]})
      ])
    ])
  }
}

// Exports:
export { Home }
