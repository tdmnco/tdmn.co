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
        m(Paragraph, { content: 'We currently have investments in the following companies, funds and trusts:' }),
        m('div', { class: 'investments' }, [
          m(Investment, {
            class: 'akademisk-boldklub',
            description: 'Akademisk Boldklub - or just AB - is a historical football club dating back to 1889 that is rich in traditions and trophies. Many famous players have worn the green jersey with pride - and many will follow still.',
            title: 'Akademisk Boldklub A/S',
            url: 'http://ab-fodbold.dk/'
          }),
          m(Investment, {
            class: 'alefarm-brewing',
            description: 'Alefarm Brewing is a Copenhagen-based craft brewery with a focus on modern hoppy offerings and a wide array of unique, flavorful mixed fermentation farmhouse ales.',
            title: 'Alefarm Brewing IVS',
            url: 'https://alefarm.dk/'
          }),
          m(Investment, {
            class: 'chr-hansen',
            description: 'Chr. Hansen is a global bioscience company that develops natural solutions for the food, nutritional, pharmaceutical and agricultural industries.',
            title: 'Chr. Hansen A/S',
            url: 'https://chr-hansen.com/'
          }),
          m(Investment, {
            class: 'helium',
            description: 'HELIUM is a creative and experimental cocktail bar located in one of the most decadent streets of Copenhagen. Served at the bar is marvellous combinations featuring different kinds of spirits, bitters, syrups, juices and cordials.',
            title: 'HELIUM ApS',
            url: 'http://heliumcph.dk'
          }),
          m(Investment, {
            class: 'live-company',
            description: 'Live Company is the one-stop shop for professional audio and visual solutions for events, concerts, festivals, conferences and more. With expert staff ready to assist, everything from planning to the running of an event is a breeze.',
            title: 'Live Company A/S',
            url: 'https://livecompany.dk/'
          }),
          m(Investment, {
            class: 'nordea-invest',
            description: 'Nordea Invest is a unit trust that invests in a broad range of stocks, shares and bonds both in Denmark and abroad. Following an active investment strategy, the trust is good for placing surplus company liquidity.',
            title: 'Nordea Invest',
            url: 'https://nordeainvest.dk/'
          }),
          m(Investment, {
            class: 'sparinvest',
            description: 'Sparinvest provides professional asset management services throughout the world through its fund range and bespoke products and services. Sparinvest is known internationally as a specialist in value investment – both for equities and bonds.',
            title: 'Sparinvest',
            url: 'https://sparinvest.dk/'
          })
        ])
      ])
    ])
  }
}

// Exports:
export { Investments }
