// Imports:
import m from 'mithril'

// Classes:
class Link {
  view(vnode) {
    return m('a', { class: 'link ' + (vnode.attrs.class || ''), href: vnode.attrs.to, oncreate: m.route.link, onmousedown: vnode.attrs.onmousedown }, vnode.attrs.content)
  }
}

// Exports:
export { Link }
