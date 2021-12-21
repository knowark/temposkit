import 'src/components/checkout/parts/checkout.delivery.js'

describe('CheckoutContact', () => {
  let container = null
  let component = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
    container.innerHTML = `<tempos-checkout-delivery></tempos-checkout-delivery>`
    component = container.querySelector('tempos-checkout-delivery')
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

  it('resolves the delivery record on ensureDelivery clicked', async () => {
    // let input = null

    // const mockDeliveryManager = {
    //   ensureContact: async (inputArgument) => {
    //     input = inputArgument
    //     return Object.assign({ id: '001' }, inputArgument)
    //   },
    // }
    // component.deliveryManager = mockDeliveryManager
    
    const event = new MouseEvent('click')
    await component.onEnsureDeliveryClicked(event)
    
    const controls = component.select('form').elements
    
    controls.country.value = 'England'
    controls.city.value = "London"
    controls.address.value = "South Street 55"
    
    component.contact = {
      country: 'England',
      city: 'London',
      address: 'South Street 55',
    }

    await component.onEnsureDeliveryClicked(event)

    // expect(input).toEqual({
    //   tenant: 'knowark',
    //   delivery: {
    //     country: 'England',
    //     city: 'London',
    //     address: 'South Street 55'
    //   },
    // })
  })

    it('navigates to the previous form', () => {
      let detail = null
      component.addEventListener('next-form', (event) => detail = event.detail)
      const event = new MouseEvent('click')
      component.onBackForm(event)

      expect(detail).toStrictEqual({ 
          actual: 'tempos-checkout-delivery', 
          form: 'tempos-checkout-contact'
    })

  })
})
