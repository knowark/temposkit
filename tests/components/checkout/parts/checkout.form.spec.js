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

  it('resolves the contact record on ensureContact clicked', async () => {
    let input = null

    const mockContactManager = {
      ensureContact: async (inputArgument) => {
        input = inputArgument
        return Object.assign({id: '001'}, inputArgument)
      }
    }
    component.tenant = 'knowark'
    component.contactManager = mockContactManager

    const event = new MouseEvent('click')

    await component.onEnsureContactClicked(event)
    expect(input).toEqual(null)

    const controls = component.select('form').elements
    controls.email.value = 'jdoe@example.com'
    controls.name.value = 'John Doe'
    component.contact = {
      email: 'jdoe@example.com',
      name: 'John Doe'
    }

    await component.onEnsureContactClicked(event)

    expect(input).toEqual({
      tenant: 'knowark',
      email: 'jdoe@example.com',
      name: 'John Doe'
    })
  })
})
