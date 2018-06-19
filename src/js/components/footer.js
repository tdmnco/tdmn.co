// Imports:
import m from 'mithril'
import { Line, Link, Paragraph } from './'

// Variables:
let year = new Date().getFullYear()

// Classes:
class Footer {
  view() {
    return m('div', { class: 'footer' }, [
      m('div', { class: 'links' }, [
        m(Link, { content: 'HOME', to: '/' }),
        m(Link, { content: 'SERVICES', to: '/services' }),
        m(Link, { content: 'INVESTMENTS', to: '/investments' }),
        m(Link, { content: 'JOURNAL', to: '/journal' }),
        m(Link, { content: 'CONTACT', to: '/contact' })
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
