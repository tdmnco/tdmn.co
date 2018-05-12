// Imports:
import m from '../../../node_modules/mithril/mithril'
import { Paragraph } from './'

// Classes:
class PostSummary {
  view(vnode) {
    return m('div', { class: 'post-summary' }, [
      m('h2', { class: 'title' }, vnode.attrs.title),
      m(Paragraph, { content: vnode.attrs.content }),
      m(Paragraph, { content: 'By Kasper Tidemann, April 5th 2018' })
    ])
  }
}

// Exports:
export { PostSummary }
