// Imports:
import m from 'mithril'
import { Footer, Menu, Overlay } from '../components'

// Variables:
let firstRun = true
let overlayRoute = null
let overlayShow = false

// Functions:
function shouldShowOverlay() {
  overlayShow = overlayShow && overlayRoute === window.location.href

  return overlayShow
}

function show(vnode) {
  if (!firstRun) {
    vnode.dom.classList.add('layout-show')

    setTimeout(() => {
      vnode.dom.classList.remove('layout-show')
    }, 500)
  }

  firstRun = false
}

function toggleOverlay(options) {
  overlayShow = !overlayShow

  if (overlayShow) {
    overlayRoute = window.location.href

    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'
  } else {
    setTimeout(() => {
      overlayRoute = null

      document.body.style.overflow = ''
      document.body.style.height = ''
    }, 500)
  }
}

// Exports:
export function layout(className, contents) {
  return [
    shouldShowOverlay() ? m(Overlay, { overlayShow, toggleOverlay }) : null,
    m('div', { class: 'layout ' + (className || ''), oncreate: show }, [
      m(Menu, { toggleOverlay }),
      m('div', { class: 'contents' }, contents),
      m(Footer)
    ])
  ]
}
