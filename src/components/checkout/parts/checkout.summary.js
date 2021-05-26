import 'components/button'
import 'components/input'
import { Component } from 'base/component'
import { ContactManager } from '../managers/contact.manager'

const tag = 'tempos-checkout-summary'
export class TemposCheckoutSummaryComponent extends Component {
  init(context = {}) {
    this.global = context.global || window
    this.storage = this.global.localStorage
    const items = this.storage.getItem('items') || '{}'
    this.items = JSON.parse(items)
    return super.init()
  }

  render() {
    this.content = `
    <h1>Items</h1>
    <hr>
    <div data-content>
      ${Object.values(this.items)
        .map((item) => this.renderItem(item))
        .join('')}
    </div>
    `
    return super.render()
  }
  renderItem(item) {
    return `
    <div class="${tag}__product">
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <span>Quantity: ${item.quantity}</span>
    </div>
    `
  }
}

const styles = /* css */ ``

Component.define(tag, TemposCheckoutSummaryComponent, styles)
