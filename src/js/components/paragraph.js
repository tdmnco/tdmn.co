// Imports:
import m from '../../../node_modules/mithril/mithril'

// Classes:
class Paragraph {
  view(vnode) {
    return m('p', { class: 'paragraph' }, vnode.attrs.content)
  }
}

// Exports:
export { Paragraph }
