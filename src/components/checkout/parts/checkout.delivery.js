import "components/accordion"
import "components/button"
import "components/input"
import { Component } from "base/component"
import { DeliveryManager } from "../managers/delivery.manager"

const tag = "tempos-checkout-delivery"
export class TemposCheckoutDeliveryComponent extends Component {
  init(context = {}) {
    this.deliveryManager = context.deliveryManager || new DeliveryManager(context)
    this.data = context.data || this.data || {}
    this.tenant = this.tenant || 'demo'
    this.address = {}
    return super.init()
  }

  render() {
    this.content = /*html */ `
      <form novalidate data-form class="${tag}__form" onsubmit="return false">
          <h3>2. Delivery</h3>
          <ark-input name="country" label="* Country" required
            listen on-alter="{{ address.country }}"></ark-input>
          <ark-input name="city" label="* City" required
            listen on-alter="{{ address.city }}"></ark-input>
          <ark-input name="address" label="Address"
            listen on-alter="{{ address.address }}">  
          </ark-input>

          <ark-input 
            name="payment" 
            label="Payment" 
            value="💵 CASH ON DELIVERY" 
            disabled>
          </ark-input>
          
          <div class="form-actions">
            <ark-button color="dark"
              listen on-click="onBackForm">
              Back
              <ark-icon slot="icon" name="fas fa-angle-left"></ark-icon>
              </ark-button>
              <ark-button background="success" color="light"
              listen on-click="onEnsureDeliveryClicked">Complete
            </ark-button>
          </div>
      </form>
    `
    return super.render()
  }
  
  async onEnsureDeliveryClicked(event) {
    event.stopPropagation()
    if (!this.select("form").reportValidity()) return
    
    const input = Object.assign({
      tenant: this.tenant, 
      address:  { 
        contactId: this.data.id, 
      ...this.address
      }
    })

    this.emit('next-form', { 
      actual:'tempos-checkout-delivery', 
      form: 'tempos-checkout-delivery',
      close: true
    } )
    
    const delivery = await this.deliveryManager.ensureAddress(input)
  }

  onBackForm(event) {
    event.stopPropagation()
    this.emit('next-form', { 
      actual:`${tag}`, 
      form: 'tempos-checkout-contact'
    } )
  }
  // async onSubmitClicked(event) { }
}

const styles = /* css */ `
  .${tag} {
    display: grid;
    padding: 1rem;
    gap: 0.5rem;
  }
`

Component.define(tag, TemposCheckoutDeliveryComponent, styles)
