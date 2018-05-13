// Imports:
import m from 'mithril'
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
