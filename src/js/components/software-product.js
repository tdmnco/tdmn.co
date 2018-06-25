// Imports:
import m from 'mithril'
import { Link, Paragraph } from './'

// Classes:
class SoftwareProduct {
  view(vnode) {
    return m('div', { class: 'software-product ' + (vnode.attrs.class || '') }, [
      m('div', { class: 'icon' }),
      m('div', { class: 'description' }, [
        m('h2', m(Link, { content: vnode.attrs.title, to: vnode.attrs.to })),
        m(Paragraph, { content: vnode.attrs.description })
      ])
    ])
  }
}

// Exports:
export { SoftwareProduct }
