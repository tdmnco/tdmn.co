// Imports:
import m from 'mithril'
import { layout } from '../templates'

// Classes:
class Services {
  view() {
    return layout('services', [
      m('p', 'Services')
    ])
  }
}

// Exports:
export { Services }
