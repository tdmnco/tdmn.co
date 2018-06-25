// Imports:
import m from 'mithril'
import { Line, Link, Paragraph, SoftwareProduct, Title } from './'
import { content, layout } from '../templates'

// Classes:
class Software {
  view() {
    return layout('software', [
      m(Title, { content: 'Our craft is yours.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(Paragraph, { content: 'Our craft is software. We live and breathe the art and science of computers, because it enables us to do so many amazing things. Software breaks barriers and builds bridges in business, society and life in general.' }),
        m(Paragraph, { content: 'We work with companies in a wide range of sectors, ranging from banking to food production. Our clients include local shops and high-profile enterprises that need quality software solutions to get the job done.' }),
        m(Paragraph, { content: [
          'For consulting needs, please ',
          m(Link, { content: 'contact us', to: '/contact' }),
          ' for more information - we\'re happy to hear from you. For our range of software products, read more below:'
        ] }),
        m('div', { class: 'products' }, [
          m(SoftwareProduct, {
            class: 'data-platform',
            description: 'The Tidemann&Co Data Platform is a distributed, fault-tolerant platform for managing data. It supports both schemaless and schema-based data and makes scaling a breeze.',
            title: 'Data Platform',
            to: '/software/data-platform'
          }),
          m(SoftwareProduct, {
            class: 'storage-engine',
            description: 'The Tidemann&Co Storage Engine is a distributed, fault-tolerant platform for storing files. Something more here, something more, something more and then some.',
            title: 'Storage Engine',
            to: '/software/storage-engine'
          }),
          m(SoftwareProduct, {
            class: 'content-editor',
            description: 'The Tidemann&Co Content Editor something, something, something more. Something, something, something more. And some more. And then some more.',
            title: 'Storage Engine',
            to: '/software/content-editor'
          })
        ])
      ])
    ])
  }
}

// Exports:
export { Software }
