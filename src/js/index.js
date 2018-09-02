// Imports:
import m from 'mithril'
import { Contact, Home, Journal, JournalEntry, Software, SoftwareConsulting, SoftwareContentEditor, SoftwareDataPlatform, SoftwareStorageEngine } from './components'

// Prefix:
m.route.prefix('')

// Routes:
m.route(document.body, '/', {
  '/': Home,
  '/contact': Contact,
  '/journal': Journal,
  '/journal/:slug': JournalEntry,
  '/software': Software,
  '/software/consulting': SoftwareConsulting,
  '/software/content-editor': SoftwareContentEditor,
  '/software/data-platform': SoftwareDataPlatform,
  '/software/storage-engine': SoftwareStorageEngine
})
