import "components/accordion"
import "components/button"
import "components/input"
import { Component } from "base/component"
import { ContactManager } from "../managers/contact.manager"

const tag = "tempos-checkout-contact"
export class TemposCheckoutContactComponent extends Component {
  init(context = {}) {
    this.contactManager = context.contactManager || new ContactManager(context)
    this.tenant = this.tenant || "demo"
    this.contact = {}
    return super.init()
  }

  reflectedProperties() {
    return ["tenant"]
  }

  render() {
    this.content = /*html */ `
    <form novalidate data-form class="${tag}__form" onsubmit="return false">
          <h3>1. Contact</h3>
          <ark-input name="email" label="* Email" type="email" required
            listen on-alter="{{ contact.email }}"></ark-input>
          <ark-input name="firstName" label="* First Name" required
            listen on-alter="{{ contact.firstName }}"></ark-input>
          <ark-input name="firstSurname" label="First Surname"
            listen on-alter="{{ contact.firstSurname }}"></ark-input>
          <ark-input name="phone" label="Phone"
            listen on-alter="{{ contact.cellPhone }}"></ark-input>
          
          <div class="form-actions">
            <ark-button data-backwards color="dark"
              listen on-click="onBackForm">
              Back
              <ark-icon slot="icon" name="fas fa-angle-left"></ark-icon>
            </ark-button>
            <ark-button 
              data-next
              data-ensure-contact
              background="success" color="light"
              icon-position="right"
              listen on-click="onEnsureContactClicked">Next
                <ark-icon slot="icon" name="fas fa-angle-right"></ark-icon>
            </ark-button>
          </div>
      </form>
    `
    return super.render()
  }

  async onEnsureContactClicked(event) {
    event.stopPropagation()

    if (!this.select("form").reportValidity()) return
    const input = Object.assign({ tenant: this.tenant, contact: this.contact })
    const contact = await this.contactManager.ensureContact(input)
    this.emit('next-form', { 
      actual:'tempos-checkout-contact', 
      form: 'tempos-checkout-delivery',
      data: contact.ensureContact.contact 
    })

  }

  onBackForm(event) {
    event.stopPropagation()
    this.emit('next-form', { 
      actual:'tempos-checkout-contact', 
      form: 'tempos-checkout-summary'
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

Component.define(tag, TemposCheckoutContactComponent, styles)
