// Imports:
import m from '../../../node_modules/mithril/mithril'
import { breakpoints } from '../helpers'

// Functions:
function showMenu() {
  if (window.innerHeight <= breakpoints.mobile) {
    console.log('Show menu!')
  } else {
    m.route.set('/')
  }
}

// Classes:
class Menu {
  view() {
    return m('div', { class: 'menu' }, [
      m('div', { class: 'logo', onclick: showMenu }),
      m('div', { class: 'links' }, [
        m('a', { href: '/services', oncreate: m.route.link }, 'SERVICES'),
        m('a', { href: '/investments', oncreate: m.route.link }, 'INVESTMENTS'),
        m('a', { href: '/journal', oncreate: m.route.link }, 'JOURNAL'),
        m('a', { href: '/contact', oncreate: m.route.link }, 'CONTACT')
      ])
    ])
  }
}

// Exports:
export { Menu }
