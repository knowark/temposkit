import 'src/components/checkout/parts/checkout.form.js'

describe('CheckoutForm', () => {
  let container = null
  let component = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
    container.innerHTML = `<tempos-checkout-form></tempos-checkout-form>`
    component = container.querySelector('tempos-checkout-form')
  })

  afterEach(() => {
    container.remove()
    container = null
    component = null
  })

  it('can be instantiated', () => {
    expect(component).toBeTruthy()
    expect(component).toBe(component.init())
  })

  it('resolves the contact record on submit clicked', async () => {
    let contactInput = null
    const mockContactManager = {
      ensureContact: async (contactInputArgument) => {
        contactInput = contactInputArgument
        return Object.assign({id: '001'}, contactInputArgument)
      }
    }
    component.contactManager = mockContactManager

    const event = new MouseEvent('click')

    await component.onSubmitClicked(event)
    expect(contactInput).toEqual(null)

    const controls = component.select('form').elements
    controls.email.value = 'jdoe@example.com'
    controls.name.value = 'John Doe'
    component.contact = {
      email: 'jdoe@example.com',
      name: 'John Doe'
    }

    await component.onSubmitClicked(event)

    expect(contactInput).toEqual({
      email: 'jdoe@example.com',
      name: 'John Doe'
    })
  })
})
