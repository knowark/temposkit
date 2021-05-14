import 'components/button'
import 'components/card'
import 'components/icon'
import 'components/spinner'
import temposCartImage from 'common/assets/shopping_cart.svg'
import { Component } from 'base/component'
import { config } from 'common'

const tag = 'tempos-cart'
export class TemposCartComponent extends Component {
  init(context = {}) {
    this.global = context.global || window
    this.count = 0

    this.global.addEventListener(
      'product-selected', this.onProductSelected.bind(this))
    return super.init(context)
  }

  render() {
    this.content = `
    <div class="${tag}__indicator">
      <img height="32" src="${temposCartImage}">
      <span class="${tag}__counter">${this.count}</span>
    </div>
    `
    return super.render()
  }

  onProductSelected(event) {
    event.stopPropagation()
    this.count += 1
    this.render()
  }
}

const styles = `
.${tag}__counter {
  border-radius: 9px;

  font-size: 1rem;
  background: green;
  color: #fff;
  padding: 0 5px;
  vertical-align: top;
  margin-left: -10px; 

}
`

Component.define(tag, TemposCartComponent, styles)
