// Imports:
import m from 'mithril'
import { date } from '../helpers'
import { Paragraph } from './'

// Variables:
let post = null

// Classes:
class PostSummary {
  oninit(vnode) {
    post = vnode.attrs.post
  }

  view(vnode) {
    return m('div', { class: 'post-summary ' + (vnode.attrs.class || '') }, [
      m('h2', { class: 'title' }, [
        m('a', { href: '/posts/' + post.slug }, post.title)
      ]),
      m(Paragraph, { content: post.content }),
      m(Paragraph, { class: 'author', content: [
        'By ',
        m('a', { href: '/people/' + post.author.id, oncreate: m.route.link }, post.author.firstname + ' ' + post.author.lastname),
        ', ',
        date(post.created)
      ]})
    ])
  }
}

// Exports:
export { PostSummary }
