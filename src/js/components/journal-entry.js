// Imports:
import m from 'mithril'
import { Paragraph } from './'

// Classes:
class JournalEntry {
  view(vnode) {
    console.log('HEJ!')
    
    return m('div', { class: 'journal-entry' }, [
      'HEJ!'
    ])
  }
}

// Exports:
export { JournalEntry }
