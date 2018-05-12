// Imports:
import m from '../../../node_modules/mithril/mithril'
import { Paragraph } from './'

// Variables:
let year = new Date().getFullYear()

// Classes:
class Footer {
  view() {
    return m('div', { class: 'footer' }, [
      m('div', { class: 'links' }, [
        m('a', { href: '/', oncreate: m.route.link }, 'HOME'),
        m('a', { href: '/services', oncreate: m.route.link }, 'SERVICES'),
        m('a', 'MORE')
      ]),
      m(Paragraph, { class: 'copyright', content: [
        'Copyright © ' + year + ', Tidemann&Co – All rights reserved.'
      ]}),
      m('div', { class: 'ampersand' })
    ])
  }
}

// Exports:
export { Footer }
