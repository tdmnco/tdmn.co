// Imports:
import m from '../../../node_modules/mithril/mithril'
import { Footer, Menu } from '../components'

// Functions:
export function layout(className, contents) {
  return m('div', { class: 'layout ' + (className || '') }, [
    m(Menu),
    contents,
    m(Footer)
  ])
}
