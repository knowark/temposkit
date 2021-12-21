import 'components/button'
import 'components/modal'
import 'components/splitview'
import { Component } from 'base/component'
import './parts/checkout.contact'
import './parts/checkout.delivery'
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
    this.content = /* html */ `
    <ark-modal title="Checkout" width="60vw" height="fit-content" block-scrim>
          <tempos-checkout-summary listen on-next-form="onActionForm" show>
          </tempos-checkout-summary>

          <tempos-checkout-contact tenant="${this.tenant}" listen on-next-form="onActionForm">
          </tempos-checkout-contact>

          <tempos-checkout-delivery listen on-next-form="onActionForm">
          </tempos-checkout-delivery>
      <!--<ark-button slot="action" color="light"
        close>Cerrar</ark-button>-->
    </ark-modal>
    `
    this.select('.tempos-checkout-contact').style.display = 'none'
    this.select('.tempos-checkout-delivery').style.display = 'none'
    return super.render()
  }

  onActionForm(event){
    event.stopPropagation()
    this.handleSteps(event.detail)
  }

  handleSteps(detail) {
    const actualComponent = this.select(detail.actual)
    actualComponent.style.display = 'none'
    const formComponent = this.select(detail.form)
    formComponent.style.display = 'initial'
  }

  async onCheckout(event) {
    event.stopPropagation()
    this.select('ark-modal').open()
    await this.select('tempos-checkout-summary').update({})
  }

}

const styles = /* css */ `
 [data-form] {
   animation-name: slide;
   animation-duration: 0.3s;
 }
 @keyframes slide {
   from {
    opacity: 0;
   }
   to {
    opacity: 1;
   }
 }

`

Component.define(tag, TemposCheckoutComponent, styles)
