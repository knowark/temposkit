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
      'product-selected',
      this.onProductSelected.bind(this)
    )
    return super.init(context)
  }

  render() {
    this.content = /* html */ `
      <img class="${tag}__image" height="32" src="${temposCartImage}">
      <span class="${tag}__counter">${this.count}</span>
    `
    return super.render()
  }

  onProductSelected(event) {
    event.stopPropagation()
    this.count += 1
    this.render()
  }
}

const styles = /* css */ `
.${tag}{
  display:flex;
  align-items:center;
}
.${tag}__image{
  transform: scale(1.3);
}
.${tag}__counter {
  position: relative;
  bottom: 9px;
  left: 5px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: bold;
  background: red;
  color: rgb(255, 255, 255);
  padding: 0.1px 10px;
  margin-left: -10px;

}
`

Component.define(tag, TemposCartComponent, styles)
