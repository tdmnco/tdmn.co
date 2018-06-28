// Imports:
import m from 'mithril'
import { Line, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class SoftwareStorageEngine {
  view() {
    return layout('software-storage-engine', [
      m(Title, { content: 'The Storage Engine.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'Information about the Storage Engine.' })
      ])
    ])
  }
}

// Exports:
export { SoftwareStorageEngine }
