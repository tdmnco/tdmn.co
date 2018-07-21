// Imports:
import m from 'mithril'
import { date } from '../helpers'
import { Link, Paragraph } from './'

// Classes:
class JournalEntrySummary {
  view(vnode) {
    return m('div', { class: 'journal-entry-summary ' + (vnode.attrs.class || '') }, [
      m('h2', { class: 'title' }, [
        m(Link, { content: vnode.attrs.journalEntry.title, to: '/journal/' + vnode.attrs.journalEntry.slug })
      ]),
      m(Paragraph, { content: vnode.attrs.journalEntry.excerpt }),
      m(Paragraph, { class: 'author', content: [
        'By ',
        m(Link, { content: vnode.attrs.journalEntry.author.firstname + ' ' + vnode.attrs.journalEntry.author.lastname, external: true, to: 'mailto:' + vnode.attrs.journalEntry.author.email }),
        ', ',
        date(vnode.attrs.journalEntry.created)
      ]})
    ])
  }
}

// Exports:
export { JournalEntrySummary }
