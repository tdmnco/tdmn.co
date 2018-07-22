// Imports:
import m from 'mithril'
import { Paragraph } from './'

// Classes:
class Signature {
  view(vnode) {
    return [
      m(Paragraph, { content: 'All the best,' }),
        m(Paragraph, { class: 'signature', content: [
        m('span', { class: 'name' }, 'Kasper Tidemann'),
        m('span', { class: 'title' }, 'CEO, Tidemann&Co'),
        m('div')
      ]})
    ]
  }
}

// Exports:
export { Signature }
