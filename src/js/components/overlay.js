// Imports:
import m from 'mithril'
import { Link } from './'

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
        m(Link, { class: 'overlay-link-one', content: 'HOME', onmousedown: vnode.attrs.toggleOverlay, to: '/' }),
        m(Link, { class: 'overlay-link-two', content: 'SOFTWARE', onmousedown: vnode.attrs.toggleOverlay, to: '/software' }),
        m(Link, { class: 'overlay-link-three', content: 'INVESTMENTS', onmousedown: vnode.attrs.toggleOverlay, to: '/investments' }),
        m(Link, { class: 'overlay-link-four', content: 'JOURNAL', onmousedown: vnode.attrs.toggleOverlay, to: '/journal' }),
        m(Link, { class: 'overlay-link-five', content: 'CONTACT', onmousedown: vnode.attrs.toggleOverlay, to: '/contact' })
      ])
    ])
  }
}

// Exports:
export { Overlay }
