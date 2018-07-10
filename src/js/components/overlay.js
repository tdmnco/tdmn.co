// Imports:
import m from 'mithril'
import { Link } from './'

// Functions:
function toggleOverlay(vnode) {
  return () => {
    vnode.attrs.toggleOverlay()
  }
}

// Classes:
class Overlay {
  onbeforeremove(vnode) {
    return new Promise((resolve) => {
      vnode.dom.classList.remove('overlay-show')
      vnode.dom.classList.add('overlay-hide')

      m.redraw()

      setTimeout(() => {
        resolve()
      }, 500)
    })
  }

  view(vnode) {
    return m('div', { class: 'overlay overlay-show' }, [
      m('div', { class: 'links' }, [
        m('div', { class: 'ampersand', onclick: vnode.attrs.toggleOverlay }),
        m(Link, { class: 'overlay-link-one', content: 'HOME', onmousedown: toggleOverlay(vnode), to: '/' }),
        m(Link, { class: 'overlay-link-two', content: 'SOFTWARE', onmousedown: toggleOverlay(vnode), to: '/software' }),
        m(Link, { class: 'overlay-link-three', content: 'INVESTMENTS', onmousedown: toggleOverlay(vnode), to: '/investments' }),
        m(Link, { class: 'overlay-link-four', content: 'JOURNAL', onmousedown: toggleOverlay(vnode), to: '/journal' }),
        m(Link, { class: 'overlay-link-five', content: 'CONTACT', onmousedown: toggleOverlay(vnode), to: '/contact' })
      ])
    ])
  }
}

// Exports:
export { Overlay }
