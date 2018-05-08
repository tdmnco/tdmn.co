// Imports:
import m from '../../../node_modules/mithril/mithril'
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
