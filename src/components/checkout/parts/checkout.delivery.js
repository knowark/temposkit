import "components/accordion"
import "components/button"
import "components/input"
import { Component } from "base/component"
// import { DeliveryManager } from "../managers/delivery.manager"

const tag = "tempos-checkout-delivery"
export class TemposCheckoutDeliveryComponent extends Component {
  init(context = {}) {
    // this.contactManager = context.contactManager || new ContactManager(context)
    this.delivery = {}
    return super.init()
  }

  render() {
    this.content = /*html */ `
      <form  data-form class="${tag}__form" onsubmit="return false">
          <ark-input name="country" label="* Country" required
            listen on-alter="{{ delivery.country }}"></ark-input>
          <ark-input name="city" label="* City" required
            listen on-alter="{{ delivery.city }}"></ark-input>
          <ark-input name="address" label="Address"
            listen on-alter="{{ delivery.address }}">  
          </ark-input>

          <ark-input 
            name="payment" 
            label="Payment" 
            value="💵 CASH ON DELIVERY" 
            disabled>
          </ark-input>
          
          <div class="form-actions">
            <ark-button background="success" color="light"
              listen on-click="onBackForm">Back
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
    const input = Object.assign({ delivery: this.delivery })
    this.emit('next-form', { 
      actual:'tempos-checkout-delivery', 
      form: 'tempos-checkout-delivery'
    } )
    
    //const contact = await this.contactManager.ensureContact(input)
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
  .${tag}__form {
    display: grid;
    gap: 0.5rem;
  }
`

Component.define(tag, TemposCheckoutDeliveryComponent, styles)
