import 'src/components/checkout/parts/checkout.summary.js'

describe('CheckoutSummary', () => {
  let container = null
  let component = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
    container.innerHTML = (
      `<tempos-checkout-summary></tempos-checkout-summary>`)
    component = container.querySelector('tempos-checkout-summary')
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

  it('displays the items residing in localStorage', () => {
    const global = {
      localStorage: {
        getItem: (key) => JSON.stringify({
         '001': { id: '001', name: 'Pizza', price: 10, quantity: 2 },
         '002': { id: '002', name: 'Hamburguer', price: 5, quantity: 3 },
         '003': { id: '003', name: 'Hot Dog', price: 3, quantity: 5 }
        })
      }
    } 
    component.init({ global }).render()

    const content = component.select('[data-content]')

    expect(content.children.length).toEqual(3)
  })

  it('navigates to the next form', () => {
    let detail = null
    component.addEventListener('next-form', (event) => detail = event.detail)
    const event = new MouseEvent('click')
    component.onNextAction(event)

    expect(detail).toStrictEqual({ 
        actual: 'tempos-checkout-summary', 
        form: 'tempos-checkout-contact'
      })
  })

})
