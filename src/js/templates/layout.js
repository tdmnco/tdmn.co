// Imports:
import m from 'mithril'
import { Footer, Menu, Overlay } from '../components'

// Variables:
let overlayShow = false

// Functions:
function toggleOverlay() {
  overlayShow = !overlayShow

  document.body.style.overflow = overlayShow ? 'hidden' : ''

  console.log('toggled overlay!', overlayShow)
}

// Exports:
export function layout(className, contents) {
  return [
    overlayShow ? m(Overlay, { overlayShow, toggleOverlay }) : null,
    m('div', { class: 'layout ' + (className || '') }, [
      m(Menu, { toggleOverlay }),
      contents,
      m(Footer)
    ])
  ]
}
