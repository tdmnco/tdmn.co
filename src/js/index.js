// Imports:
import m from 'mithril'
import { Contact, Home, Investments, Journal, Software, SoftwareContentEditor, SoftwareDataPlatform, SoftwareStorageEngine } from './components'

// Prefix:
m.route.prefix('')

// Routes:
m.route(document.body, '/', {
  '/': Home,
  '/contact': Contact,
  '/investments': Investments,
  '/journal': Journal,
  '/software': Software,
  '/software/content-editor': SoftwareContentEditor,
  '/software/data-platform': SoftwareDataPlatform,
  '/software/storage-engine': SoftwareStorageEngine
})
