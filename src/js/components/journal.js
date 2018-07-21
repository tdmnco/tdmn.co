// Imports:
import m from 'mithril'
import { JournalEntrySummary, Line, Paragraph, Title } from './'
import { journalEntries } from '../helpers'
import { JournalEntry } from '../models'
import { content, layout } from '../templates'

// Variables:
const journalEntry1 = new JournalEntry(journalEntries[0])

// Classes:
class Journal {
  view() {
    return layout('journal', [
      m(Title, { content: 'Journal.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        m(JournalEntrySummary, { journalEntry: journalEntry1 })
      ])
    ])
  }
}

// Exports:
export { Journal }
