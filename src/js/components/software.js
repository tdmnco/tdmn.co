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
        m('div', { class: 'products' }, [
          m(SoftwareProduct, {
            class: 'consulting',
            description: 'We deliver world-class consulting services in all aspects of software development. Working with us equals quality that is built on proper planning, efficient execution, and a genuine love for what you do.',
            title: 'Consulting',
            to: '/software/consulting'
          }),
          m(SoftwareProduct, {
            class: 'data-platform',
            description: 'The Tidemann&Co Data Platform is our flagship solution for managing data. It builds upon database technologies that enable distributed, fault-tolerant operations that keep data safe and make scaling a breeze.',
            title: 'Data Platform',
            to: '/software/data-platform'
          }),
          m(SoftwareProduct, {
            class: 'storage-engine',
            description: 'The Tidemann&Co Storage Engine is an application for storing files. Optimized for storing large files across clusters of servers, it allows for simple access through interfaces familiar to any developer.',
            title: 'Storage Engine',
            to: '/software/storage-engine'
          }),
          m(SoftwareProduct, {
            class: 'content-editor',
            description: 'The Tidemann&Co Content Editor puts you in control of the data stored in the Tidemann&Co stack. Upload, edit and publish any content to relevant channels in order to reach the right people.',
            title: 'Content Editor',
            to: '/software/content-editor'
          })
        ])
      ])
    ])
  }
}

// Exports:
export { Software }
