import 'components/button'
import 'components/card'
import 'components/icon'
import 'components/input'
import 'components/spinner'
import 'components/sidebar'
import temposCartImage from 'common/assets/shopping_cart.svg'
import temposProductImage from 'common/assets/product_placeholder_2.svg'
import { Component } from 'base/component'
import { config } from 'common'

const tag = 'tempos-cart'
export class TemposCartComponent extends Component {
  init(context = {}) {
    this.global = context.global || window
    this.global.addEventListener(
      'product-selected',
      this.onProductSelected.bind(this)
    )
    this.storage = this.global.localStorage

    const items = this.storage.getItem('items') || '{}'
    this.items = JSON.parse(items)

    return super.init(context)
  }

  get count() {
    return Object.values(this.items).reduce(
      (accumulator, item) => accumulator + item.quantity, 0)
  }

  render() {
    this.content = `
    <div class="${tag}__indicator" data-indicator
      listen on-click="onIndicatorClicked">
      <img class="${tag}__image" height="32" src="${temposCartImage}">
      <span data-counter class="${tag}__counter">${this.count}</span>
    </div>
    <ark-sidebar side="right">
      <div slot="header">Carrito</div>
      <div data-content>
        ${Object.values(this.items)
          .map((item) => this.renderItem(item))
          .join('')}
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
    return /* html*/ `
      <div class="product-card" data-product-id="${item.id}">
        <div class="product-card__image"
          style="background-image: url(${temposProductImage})"></div>
        <div class="product-card__info">
        <h1 class="product-card__title">${item.name}</h1>
        <ark-input inline label="Quantity:" type="number"
          min="1" listen on-alter="onItemAltered"
          value="${item.quantity}"></ark-input>
        <div class="product-card__price">
          Price: <span>${item.price}$<span></div>
        </div>
         <ark-button background="danger" listen
       on-click="onDeleteClicked">×</ark-button>
      </div>
    `
  }

  onItemAltered(event) {
    event.stopPropagation()
    const productElement = event.target.closest('[data-product-id]')
    const productId = String(productElement.dataset.productId)
    this.items[productId].quantity = parseInt(event.detail)
    this.persist().select('[data-counter]').textContent = this.count
  }

  onProductSelected(event) {
    event.stopPropagation()
    const item = Object.assign({ quantity: 0 }, event.detail)
    if (!this.items[item.id]) {
      this.items[item.id] = item
    }
    const quantity = this.items[item.id].quantity + 1
    this.items[item.id].quantity = quantity
    this.persist().render()
  }

  onIndicatorClicked(event) {
    event.stopPropagation()
    this.select('ark-sidebar').open()
  }

  onOrderClicked(event) {
    event.stopPropagation()
    const order = {
      id: 'ABC123',
      items: Object.assign({}, this.items),
    }
    this.emit('order-created', order)
    this.items = {}
    this.persist().render()

    this.global.alert('Tu orden es:\n' + JSON.stringify(order))
  }

  onDeleteClicked(event) {
    event.stopPropagation()
    const productElement = event.target.closest('[data-product-id]')
    const productId = productElement.dataset.productId
    delete this.items[productId]
    this.persist().render().select('ark-sidebar').open()
  }

  persist() {
    this.storage.setItem('items', JSON.stringify(this.items))
    return this
  }
}

const styles = /* css */ `
.${tag} {
  cursor: pointer;
  user-select:none;
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
.ark-sidebar__menu {
  min-width:300px;
  width: 30%;
}
.ark-sidebar__body {
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  padding: 0;
}
.ark-sidebar__body [data-content] {
  width:100%;
  height:100%;
}
.product-card {
  display:flex;
  align-items: center;
  justify-content:space-between;
  gap:2rem;
  padding:0.1rem 0.5rem;
  border-top: 2px solid #d8d8d8;
  border-bottom: 2px solid #d8d8d8;
}
.product-card__image {
  width:70px;
  height:70px;
  background-repeat:no-repeat;
  background-size: contain;
  background-position:center;
  margin-left:1rem;
}
.product-card__title {
  font-size: 1.3rem;
}
.product-card__info .ark-input {
  margin: 0;
  padding: 0;
}
.product-card__info .ark-input input {
  padding: 0rem;
  box-shadow: none;
  width: 3rem;
  text-align: center;
}
.product-card__info .ark-input__text {
  font-weight:700;
  font-size: 0.9rem;
  color: #352e30;
}
.product-card__price {
  font-size: 0.9rem;
  font-weight: 700;
  margin-top:0.5rem;
  color: #352e30;
}
.product-card__price {
  font-weight: 400;
  margin-left:2.5rem;
}
.product-card .ark-button {
  align-self: baseline;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  font-size: 1.5rem;
}
.product-card .ark-button__body {
  position:relative;
  left:1px;
  bottom:1px;
}
`

Component.define(tag, TemposCartComponent, styles)
