// Imports:
import m from 'mithril'
import { Line, Link, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class SoftwareContentEditor {
  view() {
    return layout('software-content-editor', [
      m(Title, { content: 'Empower yourself.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'The Tidemann&Co Content Editor puts you in control of the data stored in the Tidemann&Co stack. Upload, edit and publish any content to relevant channels in order to reach the right people.' }),
        m(Paragraph, { content: 'The Content Editor is based on years of working with content in a wide range of areas. We are planning to open-source the Content Editor soon.' }),
        m(Paragraph, { content: [
          'For demonstration, pricing and support, please ',
          m(Link, { content: 'contact us', to: '/contact' }),
          ' for more information - we\'re happy to hear from you.'
        ] })
      ])
    ])
  }
}

// Exports:
export { SoftwareContentEditor }
