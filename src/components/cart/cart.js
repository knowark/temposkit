import 'components/button'
import 'components/card'
import 'components/icon'
import 'components/input'
import 'components/spinner'
import 'components/sidebar'
import temposCartImage from 'common/assets/shopping_cart.svg'
import { Component } from 'base/component'
import { config } from 'common'

const tag = 'tempos-cart'
export class TemposCartComponent extends Component {
  init(context = {}) {
    this.global = context.global || window
    this.global.addEventListener(
      'product-selected',
      this.onProductSelected.bind(this))

    this.items = {}

    return super.init(context)
  }

  get count() {
    return Object.keys(this.items).length
  }

  render() {
    this.content = `
    <div class="${tag}__indicator" data-indicator
      listen on-click="onIndicatorClicked">
      <img class="${tag}__image" height="32" src="${temposCartImage}">
      <span class="${tag}__counter">${this.count}</span>
    </div>
    <ark-sidebar side="right">
      <div slot="header">Carrito</div>
      <div data-content>
        ${Object.values(this.items).map(
          item => this.renderItem(item)).join('')}
      </div>
      <div class="${tag}__footer" slot="footer">
        <ark-button background="success"
          listen on-click="onOrderClicked" data-order>
          Ordenar
        </ark-button>
      </div>
    </ark-sidebar>
    `
    return super.render()
  }

  renderItem(item) {
    return `
    <ark-card title=${item.name}>
      <ark-input type="number" min="1" listen
        on-alter="{{ items[${item.id}].quantity }}"
        value="${item.quantity}"></ark-input>
      <div>Price: ${item.price}</div>
    </ark-card>
    `
  }

  onProductSelected(event) {
    event.stopPropagation()
    const item = Object.assign({quantity: '0'},  event.detail)
    if (!this.items[item.id]) {
      this.items[item.id] = item
    }
    const quantity = parseInt(this.items[item.id].quantity) + 1
    this.items[item.id].quantity = `${quantity}`
    this.render()
  }

  onIndicatorClicked(event) {
    event.stopPropagation()
    this.select('ark-sidebar').open()
  }

  onOrderClicked(event) {
    event.stopPropagation()
    const order = {
      id: 'ABC123',
      items: Object.assign({}, this.items)
    }
    this.emit('order-created', order)
    this.items = {}

    this.render()

    this.global.alert('Tu orden es:\n' + JSON.stringify(order))
  }
}

const styles = /* css */ `
.${tag} {
  display: grid;
  align-items: center;
}
.${tag}__image {
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
.${tag}__footer {
  display: grid;
  align-items: center;
}
`

Component.define(tag, TemposCartComponent, styles)
