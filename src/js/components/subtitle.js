// Imports:
import m from 'mithril'

// Classes:
class Subtitle {
  view(vnode) {
    return m('h3', { class: 'subtitle' }, vnode.attrs.content)
  }
}

// Exports:
export { Subtitle }
