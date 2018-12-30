// Imports:
import m from 'mithril'
import { Link } from './'

// Functions:
function home(vnode) {
  return () => {
    vnode.attrs.activateLogo()

    m.route.set('/')
  }
}

// Classes:
class Menu {
  view(vnode) {
    return m('div', { class: 'menu' }, [
      m('div', { class: 'logo', onclick: home(vnode) }),
      m('div', { class: 'toggle', onclick: vnode.attrs.toggleOverlay }, [
        m('div', { class: 'toggle-line toggle-line-one' }),
        m('div', { class: 'toggle-line toggle-line-two' }),
        m('div', { class: 'toggle-line toggle-line-three' })
      ]),
      m('div', { class: 'links' }, [
        m(Link, { content: 'SOFTWARE', to: '/software' }),
        m(Link, { content: 'CONTACT', to: '/contact' })
      ])
    ])
  }
}

// Exports:
export { Menu }
