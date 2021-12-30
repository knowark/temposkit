import 'components/button'
import 'components/input'
import { Component } from 'base/component'
import temposProductImage from 'common/assets/product_placeholder_2.svg'
import { ContactManager } from '../managers/contact.manager'

const tag = 'tempos-checkout-summary'
export class TemposCheckoutSummaryComponent extends Component {
  init(context = {}) {
    this.global = context.global || window
    this.storage = this.global.localStorage
    const items = this.storage.getItem('items') || '{}'

    this.items = Object.values(JSON.parse(items))
    return super.init()
  }

  render() {
    const renderedItems = `${this.items.map
      (item => this.renderItem(item))}`.replaceAll(',', '')

    const total = this.items.map(item => item.price * item.quantity)
    .reduce((accumulator, number)=>{
      return accumulator + number;
    }, 0)

    this.content = /*html*/ `
    <h1>Items</h1>
    <div data-content>
      <div class="${tag}__products-list">
        ${renderedItems}
      </div>
      <div class="${tag}__total">
        <h3>TOTAL: ${total}</h3>
      </div>
    </div>
    <div class="form-actions">
    <ark-button listen on-click="onCancel">cancel</ark-button>
    <ark-button
      data-next
      icon-position="right"
      background="success" 
      listen on-click="onNextAction">
        <ark-icon slot="icon" name="fas fa-angle-right"></ark-icon>
        Next
    </ark-button>
    </div>
    `

    return super.render()
  }

  onNextAction() {
    this.emit('next-form', { 
      actual:'tempos-checkout-summary', 
      form: 'tempos-checkout-contact'
    } )
  }

  onCancel() {
    this.emit('next-form', {
      close:true
    })
  }

  renderItem(item) {
    // <div class="${tag}__product--image"
    //   style="background-image: url('${this.items.images[0]}')">
    // </div>
    return /*html*/`
    <div class="${tag}__product">
      <div>
        <h4>${item.name}</h4>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <span>${item.price} $</span>
    </div>
    `
  }
}

const styles = /* css */ `
.${tag} {
  display: grid;
  padding: 1rem;
}
${tag} [data-content] {
  display: grid;
  gap: 0.5rem;
  background: #DBDBDB;
}
.${tag}__products-list{
  display: grid;
  gap: 0.5rem;
  padding: 1rem;
  overflow: hidden auto;
  height: 250px;
}
.${tag}__product {
  display: grid;
  grid-auto-flow: column;
  background: white;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px #0000001A;
  place-items: center;
}
.${tag}__product--image{
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.${tag}__total {
  display: grid;
  grid-auto-flow: column;
  place-items: center end;
  padding: 0 2.5rem;
}
`

Component.define(tag, TemposCheckoutSummaryComponent, styles)
