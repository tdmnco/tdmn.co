// Imports:
import m from 'mithril'
import { Footer, Menu, Overlay } from '../components'

// Variables:
let overlayShown = false

// Functions:
function showOverlay() {
  overlayShown = !overlayShown
}

// Exports:
export function layout(className, contents) {
  return [
    m(Overlay, { overlayShown, showOverlay }),
    m('div', { class: 'layout ' + (className || '') }, [
      m(Menu, { showOverlay }),
      contents,
      m(Footer)
    ])
  ]
}
