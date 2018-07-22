// Imports:
import m from 'mithril'
import { Line, Link, Paragraph, Signature, Subtitle, Title } from './'
import { date } from '../helpers'
import { JournalEntry as JournalEntryModel } from '../models'
import { content, layout } from '../templates'

// Classes:
class JournalEntry {
  oninit(vnode) {
    vnode.attrs.journalEntry = JournalEntryModel.get('1') // m.route.param('slug')
  }

  view(vnode) {
    return layout('journal-entry', [
      m(Title, { content: vnode.attrs.journalEntry.title }),
      m(Subtitle, { content: [
        'By ',
        m(Link, { content: vnode.attrs.journalEntry.author.firstname + ' ' + vnode.attrs.journalEntry.author.lastname, external: true, to: 'mailto:' + vnode.attrs.journalEntry.author.email }),
        ', ',
        date(vnode.attrs.journalEntry.created)
      ] }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        vnode.attrs.journalEntry.content.split('\n\n').map((paragraph) => {
          return m(Paragraph, { content: paragraph })
        }),
        m(Signature)
      ])
    ])
  }
}

// Exports:
export { JournalEntry }
