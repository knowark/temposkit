import "components/accordion"
import "components/button"
import "components/input"
import { Component } from "base/component"
import { ContactManager } from "../managers/contact.manager"

const tag = "tempos-checkout-form"
export class TemposCheckoutFormComponent extends Component {
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
      <ark-accordion>
      <ark-accordion-tab header="Contact" active>
          <form class="${tag}__form" onsubmit="return false">
              <ark-input name="email" label="* Email" type="email" required
                listen on-alter="{{ contact.email }}"></ark-input>
              <ark-input name="name" label="* Name" required
                listen on-alter="{{ contact.name }}"></ark-input>
              <ark-input name="surname" label="Surname"
                listen on-alter="{{ contact.surname }}"></ark-input>
              <ark-input name="phone" label="Phone"
                listen on-alter="{{ contact.phone }}"></ark-input>
              <ark-button background="success" color="light"
                listen on-click="onEnsureContactClicked">Guardar
              </ark-button>
          </form>
      </ark-accordion-tab>

      <ark-accordion-tab header="Delivery">
      </ark-accordion-tab>

      <ark-accordion-tab header="Payment">
        </ark-accordion-tab>
      </ark-accordion>

      <ark-button background="success" color="light"
        type="submit" listen on-click="onSubmitClicked">Ordenar
      </ark-button>
    `
    return super.render()
  }

  async onEnsureContactClicked(event) {
    event.stopPropagation()
    if (!this.select("form").reportValidity()) return
    const input = Object.assign({ tenant: this.tenant, contact: this.contact })
    const contact = await this.contactManager.ensureContact(input)
  }

  // async onSubmitClicked(event) { }
}

const styles = /* css */ `
  .${tag}__form {
    display: grid;
    gap: 0.5rem;
  }
`

Component.define(tag, TemposCheckoutFormComponent, styles)
