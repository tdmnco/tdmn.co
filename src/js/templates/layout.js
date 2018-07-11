// Imports:
import m from 'mithril'
import { breakpoints } from '../helpers'
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
    let className = 'layout-show'

    if (m.route.get() === '/' && breakpoints.isMobile()) {
      className = 'layout-mobile-show-home'
    }

    vnode.dom.classList.add(className)

    setTimeout(() => {
      vnode.dom.classList.remove(className)
    }, 500)
  }

  firstRun = false
}

function toggleOverlay(options) {
  overlayShow = !overlayShow

  let $html = document.getElementsByTagName('html')[0]

  if (overlayShow) {
    overlayRoute = window.location.href

    $html.style.height = '100%'
    $html.style.overflow = 'hidden'

    document.body.style.height = '100%'
    document.body.style.overflow = 'hidden'

    setTimeout(() => {
      $html.style.backgroundColor = '#f7941d'
    }, 500)
  } else {
    $html.style.backgroundColor = ''

    setTimeout(() => {
      overlayRoute = null

      $html.style.height = ''
      $html.style.overflow = ''

      document.body.style.height = ''
      document.body.style.overflow = ''
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
      m(Footer, { toggleOverlay })
    ])
  ]
}
