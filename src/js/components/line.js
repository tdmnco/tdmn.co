// Imports:
import m from 'mithril'

// Classes:
class Line {
  view(vnode) {
    return m('div', { class: 'line ' + (vnode.attrs.class || '') })
  }
}

// Exports:
export { Line }
