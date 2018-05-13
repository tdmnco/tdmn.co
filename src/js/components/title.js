// Imports:
import m from 'mithril'

// Classes:
class Title {
  view(vnode) {
    return m('h1', { class: 'title' }, vnode.attrs.content)
  }
}

// Exports:
export { Title }
