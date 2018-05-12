// Imports:
import m from '../../node_modules/mithril/mithril'
import { Contact, Home, Investments, Journal, Services } from './components'

// Prefix:
m.route.prefix('')

// Routes:
m.route(document.body, '/', {
  '/': Home,
  '/contact': Contact,
  '/investments': Investments,
  '/journal': Journal,
  '/services': Services
})
