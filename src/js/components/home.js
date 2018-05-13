// Imports:
import m from 'mithril'
import { Line, Paragraph, PostSummary, Title } from './'
import { Post } from '../models'
import { content, layout } from '../templates'

// Constants:
const post = new Post({
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  id: '1',
  title: 'Proudly presenting Alefarm Brewing 2.0'
})

post.save()

// Classes:
class Home {
  view() {
    return layout('home', [
      m(Title, { content: 'Quality is built on love.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'Tidemann&Co is a Copenhagen-based corporation with activities in software and investments. We believe that quality is built on proper planning, efficient execution and a genuine love for what you do.' }),
        m(Paragraph, { content: 'Our craft is software. We live and breathe the art and science of computers, because it enables us to do so many amazing things. Software breaks barriers and builds bridges in business, society and life in general.' }),
        m(Paragraph, { content: 'We invest in people, not ideas. We bet on the ability to make things happen and we match with anyone who cares deeply for what they do.' }),
        m(Paragraph, { content: 'All the best,' }),
        m(Paragraph, { content: [
          m('span', { class: 'name' }, 'Kasper Tidemann'),
          m('span', { class: 'title' }, 'CEO, Tidemann&Co'),
          m('div', { class: 'signature' })
        ]})
      ]),
      m(Line),
      content([
        m(PostSummary, { post })
      ])
    ])
  }
}

// Exports:
export { Home }
