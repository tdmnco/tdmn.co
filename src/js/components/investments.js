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
            description: 'Alefarm Brewing is a Copenhagen-based craft brewery with a focus on modern hoppy offerings and a wide array of unique, flavorful mixed fermentation farmhouse ales.',
            title: 'Alefarm Brewing IVS',
            url: 'https://alefarm.dk/'
          }),
          m(Investment, {
            class: 'live-company',
            description: 'Live Company is the one-stop shop for professional audio and visual solutions for events, concerts, festivals, conferences and more. With expert staff ready to assist, everything from planning to the running of an event is a breeze.',
            title: 'Live Company A/S',
            url: 'https://livecompany.dk/'
          }),
          m(Investment, {
            class: 'helium',
            description: 'HELIUM is a creative and experimental cocktail bar located in one of the most decadent streets of Copenhagen. Served at the bar is marvellous combinations featuring different kinds of spirits, bitters, syrups, juices and cordials.',
            title: 'HELIUM ApS',
            url: 'http://heliumcph.dk'
          }),
        ])
      ])
    ])
  }
}

// Exports:
export { Investments }
