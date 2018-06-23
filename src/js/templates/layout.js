// Imports:
import m from 'mithril'
import { Footer, Menu, Overlay } from '../components'

// Variables:
let overlayShow = false
let showAnimations = false

// Functions:
function show(vnode) {
  if (showAnimations) {
    vnode.dom.classList.add('layout-show')

    setTimeout(() => {
      vnode.dom.classList.remove('layout-show')

      showAnimations = false
    }, 500)
  }
}

function toggleOverlay(options) {
  if (options && options.showAnimations) {
    showAnimations = true
  }

  overlayShow = !overlayShow

  if (overlayShow) {
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'
  } else {
    setTimeout(() => {
      document.body.style.overflow = ''
      document.body.style.height = ''
    }, 500)
  }
}

// Exports:
export function layout(className, contents) {
  return [
    overlayShow ? m(Overlay, { overlayShow, showAnimations, toggleOverlay }) : null,
    m('div', { class: 'layout ' + (className || ''), oncreate: show }, [
      m(Menu, { toggleOverlay }),
      contents,
      m(Footer)
    ])
  ]
}
