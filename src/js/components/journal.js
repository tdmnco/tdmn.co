// Imports:
import m from 'mithril'
import { Line, Paragraph, PostSummary, Title } from './'
import { posts } from '../helpers'
import { Post } from '../models'
import { content, layout } from '../templates'

// Classes:
class Journal {
  view() {
    return layout('journal', [
      m(Title, { content: 'Journal.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(PostSummary, { post: new Post(posts[0]) }),
        m(PostSummary, { class: 'last-post', post: new Post(posts[1]) })
      ])
    ])
  }
}

// Exports:
export { Journal }
