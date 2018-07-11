// Imports:
import m from 'mithril'
import { Line, Link, Paragraph } from './'

// Variables:
let year = new Date().getFullYear()

// Functions:
function toggleOverlay(vnode) {
  return () => {
    window.scrollTo(0, 0)

    vnode.attrs.toggleOverlay()
  }
}

// Classes:
class Footer {
  view(vnode) {
    return m('div', { class: 'footer' }, [
      m('div', { class: 'links' }, [
        m(Link, { content: 'JOURNAL', to: '/journal' }),
        m(Link, { content: 'CONTACT', to: '/contact' }),
        m(Link, { content: 'MORE', onmousedown: toggleOverlay(vnode) })
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
