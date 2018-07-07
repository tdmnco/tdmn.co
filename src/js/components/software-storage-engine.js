// Imports:
import m from 'mithril'
import { Line, Link, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class SoftwareStorageEngine {
  view() {
    return layout('software-storage-engine', [
      m(Title, { content: 'Storage made easy.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'The Tidemann&Co Storage Engine is an application for storing files. Optimized for handling large files across clusters of servers, it allows for simple access through interfaces familiar to any developer.' }),
        m(Paragraph, { content: 'The Storage Engine is based on years of working with files and replication for managing and safe-keeping data. We are planning to open-source the Storage Engine soon.' }),
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
export { SoftwareStorageEngine }
