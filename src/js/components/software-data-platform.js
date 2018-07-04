// Imports:
import m from 'mithril'
import { Line, Link, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class SoftwareDataPlatform {
  view() {
    return layout('software-data-platform', [
      m(Title, { content: 'Data is everywhere.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'The Tidemann&Co Data Platform is our flagship solution for managing data. It builds upon database technologies that enable distributed, fault-tolerant operations that keep data safe and make scaling a breeze.' }),
        m(Paragraph, { content: 'The Data Platform is based on years of working with data in scenarios spanning small setups to enterprise-level installations. We are planning to open-source the Data Platform soon.' }),
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
export { SoftwareDataPlatform }
