import 'src/components/checkout/parts/checkout.contact.js'

describe('CheckoutContact', () => {
  let container = null
  let component = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
    container.innerHTML = `<tempos-checkout-contact></tempos-checkout-contact>`
    component = container.querySelector('tempos-checkout-contact')
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
        return { id: '001',
                 tenant: 'knowark', 
                 ensureContact: {...input}}
      },
    }

    component.tenant = 'knowark'

    component.contactManager = mockContactManager

    const event = new MouseEvent('click')

    await component.onEnsureContactClicked(event)
    expect(input).toEqual(null)

    const controls = component.select('form').elements
    
    controls.email.value = 'jdoe@example.com'
    controls.firstName.value = "Jane"
    controls.firstSurname.value = "Doe"
    controls.phone.value = "355455"
    
    component.contact = {
        email: 'jdoe@example.com',
        firstName: 'Jane',
        firstSurname: 'Doe',
        phone: '355455'
    }

    await component.onEnsureContactClicked(event)

    expect(input).toEqual({
      tenant: 'knowark',
      contact: {
        email: 'jdoe@example.com',
        firstName: 'Jane',
        firstSurname: 'Doe',
        phone: '355455'
      },
    })
  })

  it('navigates to the previous form', () => {
    let detail = null
    component.addEventListener('next-form', (event) => detail = event.detail)
    const event = new MouseEvent('click')
    component.onBackForm(event)

    expect(detail).toStrictEqual({ 
        actual: 'tempos-checkout-contact', 
        form: 'tempos-checkout-summary'
      })
  })
})
