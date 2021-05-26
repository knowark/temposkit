import 'components/button'
import 'components/modal'
import 'components/splitview'
import { Component } from 'base/component'
import './parts/checkout.form'
import './parts/checkout.summary'

const tag = 'tempos-checkout'
export class TemposCheckoutComponent extends Component {
  init(context = {}) {
    this.global = context.global || window
    this.global.addEventListener(
      'checkout', this.onCheckout.bind(this))

    const urlParams = new URLSearchParams(this.global.location.search)
    this.tenant = this.tenant || urlParams.get('tenant') || 'demo'

    return super.init(context)
  }

  reflectedProperties() {
    return ['tenant']
  }

  render() {
    this.content = `
    <ark-modal title="Checkout" width="90vw" height="90vh" block-scrim>
      <ark-splitview background="secondary">
        <ark-splitview-master>
          <tempos-checkout-form tenant="${this.tenant}">
          </tempos-checkout-form>
        </ark-splitview-master>
        <ark-splitview-detail>
          <tempos-checkout-summary>
          </tempos-checkout-summary>
        </ark-splitview-detail>
      </ark-splitview>
      <ark-button slot="action" color="light"
        close>Cerrar</ark-button>
    </ark-modal>
    `
    return super.render()
  }

  async onCheckout(event) {
    event.stopPropagation()
    this.select('ark-modal').open()
    await this.select('tempos-checkout-summary').update({})
  }

}

const styles = /* css */ ``

Component.define(tag, TemposCheckoutComponent, styles)
