// Imports:
import m from 'mithril'

// Functions:
function beforeRoute(vnode) {
  return () => {
    if (vnode.attrs.external) {

    } else {
      window.scrollTo(0, 0)
    }
  }
}

// Classes:
class Link {
  view(vnode) {
    return m('a', { class: 'link ' + (vnode.attrs.class || ''), href: vnode.attrs.to, oncreate: vnode.attrs.external ? null : m.route.link, onmousedown: vnode.attrs.onmousedown, onmouseup: beforeRoute(vnode) }, vnode.attrs.content)
  }
}

// Exports:
export { Link }
