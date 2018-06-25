// Imports:
import m from 'mithril'
import { Contact, Home, Investments, Journal, Software } from './components'

// Prefix:
m.route.prefix('')

// Routes:
m.route(document.body, '/', {
  '/': Home,
  '/contact': Contact,
  '/investments': Investments,
  '/journal': Journal,
  '/software': Software
})
