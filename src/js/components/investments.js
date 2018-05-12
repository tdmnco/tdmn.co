// Imports:
import m from '../../../node_modules/mithril/mithril'
import { layout } from '../templates'

// Classes:
class Investments {
  view() {
    return layout('investments', [
      m('p', 'Investments')
    ])
  }
}

// Exports:
export { Investments }
