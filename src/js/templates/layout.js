// Imports:
import m from 'mithril'
import { breakpoints } from '../helpers'
import { Footer, Menu, Overlay } from '../components'

// Variables:
let $html = null
let firstRun = true
let logoActivated = false
let overlayRoute = null
let overlayShow = false
let overlayToggled = false
let overlayToggling = false

// Functions:
function activateLogo() {
  logoActivated = true
}

function shouldShowOverlay() {
  overlayShow = overlayShow && overlayRoute === window.location.href

  return overlayShow
}

function show(vnode) {
  if (!firstRun) {
    console.log('overlayShow', overlayShow)

    let className = ''

    if (logoActivated && m.route.get() === '/' && breakpoints.isMobile()) {
      className = 'layout-mobile-show-home'

      logoActivated = false
    } else if (overlayToggled) {
      className = 'layout-show'
    }

    if (className) {
      vnode.dom.classList.add(className)

      setTimeout(() => {
        vnode.dom.classList.remove(className)
      }, 500)
    }
  }

  firstRun = false
}

function toggleOverlay(options) {
  if (!overlayToggling) {
    overlayShow = !overlayShow
    overlayToggling = true

    if (!$html) {
      $html = document.getElementsByTagName('html')[0]
    }

    if (overlayShow) {
      overlayRoute = window.location.href
      overlayToggled = true

      $html.style.height = '100%'
      $html.style.overflow = 'hidden'

      document.body.style.height = '100%'
      document.body.style.overflow = 'hidden'

      if (breakpoints.isMobile()) {
        setTimeout(() => {
          $html.style.backgroundColor = '#f7941d'

          overlayToggling = false
        }, 500)
      }
    } else {
      $html.style.backgroundColor = ''

      setTimeout(() => {
        overlayRoute = null
        overlayToggled = false
        overlayToggling = false

        $html.style.height = ''
        $html.style.overflow = ''

        document.body.style.height = ''
        document.body.style.overflow = ''
      }, 500)
    }
  }
}

// Exports:
export function layout(className, contents) {
  return [
    shouldShowOverlay() ? m(Overlay, { overlayShow, toggleOverlay }) : null,
    m('div', { class: 'layout ' + (className || ''), oncreate: show }, [
      m(Menu, { activateLogo, toggleOverlay }),
      m('div', { class: 'contents' }, contents),
      m(Footer, { toggleOverlay })
    ])
  ]
}
