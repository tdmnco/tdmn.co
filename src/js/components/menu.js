// Imports:
import m from 'mithril'
import { Link } from './'

// Functions:
function home() {
  m.route.set('/')
}

// Classes:
class Menu {
  view(vnode) {
    return m('div', { class: 'menu' }, [
      m('div', { class: 'logo', onclick: home }),
      m('div', { class: 'toggle', onclick: vnode.attrs.showOverlay }, [
        m('div', { class: 'toggle-line toggle-line-one' }),
        m('div', { class: 'toggle-line toggle-line-two' }),
        m('div', { class: 'toggle-line toggle-line-three' })
      ]),
      m('div', { class: 'links' }, [
        m(Link, { content: 'SERVICES', to: '/services' }),
        m(Link, { content: 'INVESTMENTS', to: '/investments' }),
        m(Link, { content: 'JOURNAL', to: '/journal' }),
        m(Link, { content: 'CONTACT', to: '/contact' })
      ])
    ])
  }
}

// Exports:
export { Menu }
