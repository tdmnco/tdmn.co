// Imports:
import m from 'mithril'
import { Investment, Line, Paragraph, Title } from './'
import { content, layout } from '../templates'

// Classes:
class Investments {
  view() {
    return layout('investments', [
      m(Title, { content: 'We invest in people.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'We invest in people, not ideas. We bet on the ability to make things happen and we match with anyone who cares deeply for what they do.' }),
        m(Paragraph, { content: 'We currently have investments in the following companies:' }),
        m('div', { class: 'investments' }, [
          m(Investment, {
            class: 'alefarm-brewing',
            description: 'Alefarm Brewing has a description here that has some words in it, that contains information about the company. Write something excellent here about the company.',
            title: 'Alefarm Brewing IVS'
          }),
          m(Investment, {
            class: 'live-company',
            description: 'Live Company A/S has a description here that has some words in it, that contains information about the company. Write something excellent here about the company.',
            title: 'Live Company A/S'
          }),
          m(Investment, {
            class: 'helium',
            description: 'HELIUM ApS has a description here that has some words in it, that contains information about the company. Write something excellent here about the company.',
            title: 'HELIUM ApS'
          }),
        ])
      ])
    ])
  }
}

// Exports:
export { Investments }
