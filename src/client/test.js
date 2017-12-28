import _ from 'lodash'
import printMe from './print.js'

function component() {
  var el = document.createElement('div')
  var btn = document.createElement('button')

  el.innerHTML = _.join(['Hello','webpack'], ' ')

  btn.innerHTML = 'Click me and check the console'
  btn.onclick = printMe

  el.appendChild(btn)

  return el
}

document.body.appendChild(component())
