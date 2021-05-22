import 'components/button'
import 'components/modal'
import { Component } from 'base/component'

const tag = 'tempos-checkout'
export class TemposCheckoutComponent extends Component {
  init(context = {}) {
    this.global = context.global || window
    this.global.addEventListener(
      'checkout', this.onCheckout.bind(this))
    return super.init(context)
  }

  render() {
    this.content = `
    <ark-modal title="Checkout" width="90vw" height="90vh" block-scrim>
      <div>CHECKOUT</div>
      <ark-button slot="action" color="light"
        close>Cerrar</ark-button>
    </ark-modal>
    `
    return super.render()
  }

  onCheckout(event) {
    event.stopPropagation()
    this.select('ark-modal').open()
  }

}

const styles = /* css */ ``

Component.define(tag, TemposCheckoutComponent, styles)
