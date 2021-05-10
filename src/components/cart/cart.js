import 'components/button'
import 'components/card'
import 'components/icon'
import 'components/spinner'
import temposCartImage from 'common/assets/shopping_cart.svg'
import { Component } from 'base/component'
import { config } from 'common'

const tag = 'tempos-cart'
export class TemposCartComponent extends Component {
  render() {
    this.content = `
      <img height="30" src="${ temposCartImage }" alt="">
    `
  }
}

const styles = `
`

Component.define(tag, TemposCartComponent, styles)
