// Imports:
import m from 'mithril'
import { Line, Link, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class SoftwareConsulting {
  view() {
    return layout('software-consulting', [
      m(Title, { content: 'Get the job done.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'Are you looking for the best software developers available? Then we should talk.' }),
        m(Paragraph, { content: 'We provide companies and organizations with expert-level, creative and inspiring consultants with the ability to get the job done in time - and on budget.' }),
        m(Paragraph, { content: 'We are digital natives at heart. We dream in code and believe for software to be a thing of beauty if done right. We are wildly passionate about the projects we work on - and we are entirely committed to the clients we work with.' }),
        m(Paragraph, { content: 'Our work is quality built on proper planning, efficient execution, and a genuine love for what we do.' }),
        m(Paragraph, { content: [
          'For consulting needs, please ',
          m(Link, { content: 'contact us', to: '/contact' }),
          ' for more information - we\'re happy to hear from you.'
        ] })
      ])
    ])
  }
}

// Exports:
export { SoftwareConsulting }
