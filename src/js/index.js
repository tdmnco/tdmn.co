// Imports:
import m from '../../node_modules/mithril/mithril'
import { Contact, Home, Journal } from './components'

// Prefix:
m.route.prefix('')

// Routes:
m.route(document.body, '/', {
  '/': Home,
  '/contact': Contact,
  '/journal': Journal
})
