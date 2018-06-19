// Imports:
import m from 'mithril'
import { Link } from './'

// Functions:
function home() {
  m.route.set('/')
}

// Classes:
class Menu {
  view() {
    return m('div', { class: 'menu' }, [
      m('div', { class: 'logo', onclick: home }),
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
