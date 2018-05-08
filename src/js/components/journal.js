// Imports:
import m from '../../../node_modules/mithril/mithril'
import { layout } from '../templates'

// Classes:
class Journal {
  view() {
    return layout('journal', [
      m('p', 'Journal')
    ])
  }
}

// Exports:
export { Journal }
