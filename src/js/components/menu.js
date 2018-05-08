// Imports:
import m from '../../../node_modules/mithril/mithril'

// Classes:
class Menu {
  view() {
    return m('div', { class: 'menu' }, [
      m('div', { class: 'logo' }),
      m('div', { class: 'links' }, [
        m('a', { href: '/journal', oncreate: m.route.link }, 'JOURNAL'),
        m('a', { href: '/contact', oncreate: m.route.link }, 'CONTACT')
      ])
    ])
  }
}

// Exports:
export { Menu }
