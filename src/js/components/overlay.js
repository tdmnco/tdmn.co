// Imports:
import m from 'mithril'
import { Link } from './'

// Functions:
function routeTo(link) {
  return (event) => {
    event.preventDefault()

    console.log('hej!', link)
  }
}

// Classes:
class Overlay {
  view(vnode) {
    return m('div', { class: 'overlay overlay-' + (vnode.attrs.overlayShown ? 'shown' : 'hidden') }, [
      m('div', { class: 'links' }, [
        m('div', { class: 'ampersand' }),
        m(Link, { content: 'HOME', onclick: routeTo('/'), to: '/' }),
        m(Link, { content: 'SERVICES', onclick: routeTo('/services'), to: '/services' }),
        m(Link, { content: 'INVESTMENTS', onclick: routeTo('/investments'), to: '/investments' }),
        m(Link, { content: 'JOURNAL', onclick: routeTo('/journal'), to: '/journal' }),
        m(Link, { content: 'CONTACT', onclick: routeTo('/contact'), to: '/contact' })
      ])
    ])
  }
}

// Exports:
export { Overlay }
