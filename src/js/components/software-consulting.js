// Imports:
import m from 'mithril'
import { Line, Link, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class SoftwareConsulting {
  view() {
    return layout('software-consulting', [
      m(Title, { content: 'Get the job done.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'Our craft is software. We live and breathe the art and science of computers, because it enables us to do so many amazing things. Software breaks barriers and builds bridges in business, society and life in general.' }),
        m(Paragraph, { content: 'We work with companies in a wide range of sectors, ranging from banking to food production. Our clients include local shops and high-profile enterprises that need quality software solutions to get the job done.' }),
        m(Paragraph, { content: [
          'For consulting needs, please ',
          m(Link, { content: 'contact us', to: '/contact' }),
          ' for more information - we\'re happy to hear from you.'
        ] })
      ])
    ])
  }
}

// Exports:
export { SoftwareConsulting }
