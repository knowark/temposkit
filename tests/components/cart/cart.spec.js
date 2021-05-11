import 'src/components/cart'


describe('Cart', () => {
  let container = null
  let component = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
    container.innerHTML = `<tempos-cart></tempos-cart>`
    component = container.querySelector('tempos-cart')
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

  it('handles product selected events', () => {
    const event = new CustomEvent('product-selected', {detail: {}})
    
    expect(component.count).toEqual(0)

    component.onProductSelected(event)

    expect(component.count).toEqual(1)
  })

})
