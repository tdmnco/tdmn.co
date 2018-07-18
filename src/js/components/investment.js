// Imports:
import m from 'mithril'
import { Link, Paragraph } from './'

// Classes:
class Investment {
  view(vnode) {
    return m('div', { class: 'investment ' + (vnode.attrs.class || '') }, [
      m('div', { class: 'icon' }),
      m('div', { class: 'description' }, [
        m('h2', m(Link, { content: vnode.attrs.title, external: true, to: vnode.attrs.url })),
        m(Paragraph, { content: vnode.attrs.description })
      ])
    ])
  }
}

// Exports:
export { Investment }
