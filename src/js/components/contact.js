// Imports:
import m from 'mithril'
import { content, layout } from '../templates'

// Classes:
class Contact {
  view() {
    return layout('contact', [
      m('p', 'Contact')
    ])
  }
}

// Exports:
export { Contact }
