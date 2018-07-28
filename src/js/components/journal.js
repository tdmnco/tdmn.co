// Imports:
import m from 'mithril'
import { JournalEntrySummary, Line, Paragraph, Title } from './'
import { JournalEntry } from '../models'
import { content, layout } from '../templates'

// Variables:
const journalEntries = JournalEntry.get().sort((a, b) => {
  return a.created > b.created ? -1 : 1
})

// Classes:
class Journal {
  view() {
    return layout('journal', [
      m(Title, { content: 'Journal.' }),
      m(Line, { class: 'hidden-on-mobile' }),
      content([
        journalEntries.map((journalEntry) => {
          return m(JournalEntrySummary, { journalEntry: journalEntry })
        })
      ])
    ])
  }
}

// Exports:
export { Journal }
