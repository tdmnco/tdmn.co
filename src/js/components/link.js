// Imports:
import m from 'mithril'

// Functions:
function scrollTop() {
  window.scrollTo(0, 0)
}

// Classes:
class Link {
  view(vnode) {
    return m('a', { class: 'link ' + (vnode.attrs.class || ''), href: vnode.attrs.to, oncreate: m.route.link, onmousedown: vnode.attrs.onmousedown, onmouseup: scrollTop }, vnode.attrs.content)
  }
}

// Exports:
export { Link }
