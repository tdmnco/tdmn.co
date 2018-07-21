// Imports:
import { Model } from 'tdmnco-model-js'

// Classes:
class JournalEntry extends Model {
  constructor(data) {
    super(data, {
      endpoint: '',
      modelName: 'JournalEntry'
    })
  }
}

// Prototyping:
JournalEntry.prototype.modelName = 'JournalEntry'

// Exports:
export { JournalEntry }
