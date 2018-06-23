// Imports:
import m from 'mithril'
import { Link } from './'

// Variables:
let toggleOverlay = null

// Functions:
function routeTo(link, vnode) {
  return (event) => {
    event.preventDefault()

    toggleOverlay({ showAnimations: true })

    m.route.set(link)
  }
}

// Classes:
class Overlay {
  oninit(vnode) {
    toggleOverlay = vnode.attrs.toggleOverlay
  }

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
        m(Link, { class: 'overlay-link-one', content: 'HOME', onmousedown: routeTo('/'), to: '/' }),
        m(Link, { class: 'overlay-link-two', content: 'SERVICES', onmousedown: routeTo('/services'), to: '/services' }),
        m(Link, { class: 'overlay-link-three', content: 'INVESTMENTS', onmousedown: routeTo('/investments'), to: '/investments' }),
        m(Link, { class: 'overlay-link-four', content: 'JOURNAL', onmousedown: routeTo('/journal'), to: '/journal' }),
        m(Link, { class: 'overlay-link-five', content: 'CONTACT', onmousedown: routeTo('/contact'), to: '/contact' })
      ])
    ])
  }
}

// Exports:
export { Overlay }
