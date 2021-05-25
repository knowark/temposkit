import 'components/button'
import 'components/input'
import { Component } from 'base/component'
import { ContactManager } from '../managers/contact.manager'

const tag = 'tempos-checkout-form'
export class TemposCheckoutFormComponent extends Component {
  init(context) {
    this.contactManager = this.contactManager || new ContactManager(context)
    this.tenant = this.tenant || 'demo'
    this.contact = {}
    return super.init()
  }

  reflectedProperties() {
    return ['tenant']
  }

  render() {
    this.content = `
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
        type="submit" listen on-click="onSubmitClicked">Ordenar
      </ark-button>
    </form>
    `
    return super.render()
  }

  async onSubmitClicked(event) {
    event.stopPropagation()
    if (!this.select('form').reportValidity()) return
    const contact = await this.contactManager.ensureContact(this.contact)
  }
}

const styles = /* css */ ``

Component.define(tag, TemposCheckoutFormComponent, styles)