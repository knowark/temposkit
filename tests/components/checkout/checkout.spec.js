import 'src/components/checkout'

describe('Checkout', () => {
  let container = null
  let component = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
    container.innerHTML = `<tempos-checkout></tempos-checkout>`
    component = container.querySelector('tempos-checkout')
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

  it('shows on checkout events', async () => {
    const event = new CustomEvent('checkout', {detail: {}})
    
    const modal = component.select('ark-modal')
    
    expect(modal.hasAttribute('show')).toBeFalsy()
    
    await component.onCheckout(event)
    
    expect(modal.hasAttribute('show')).toBeTruthy()
  })
  
  it('Hides and shows the forms',async () => {
    const openEvent = new CustomEvent('checkout', {detail: {}})
    await component.onCheckout(openEvent)
    const summaryForm = component.select('tempos-checkout-summary')
    const contactForm = component.select('tempos-checkout-contact')

    const navigationEvent = new CustomEvent('next-form', {
      detail: {
        actual: 'tempos-checkout-summary',
        form: 'tempos-checkout-contact'
      }
    })

    component.onActionForm(navigationEvent)

    expect(summaryForm.style.display).toStrictEqual('none')
    expect(contactForm.style.display).toStrictEqual('initial')
    
  })
})
