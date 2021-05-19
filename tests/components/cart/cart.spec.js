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

  it('opens the cart sidebar on indicator click', () => {
    const event = new CustomEvent('product-selected', {detail: {}})
    const indicator = component.select('[data-indicator]')

    indicator.click()

    const sidebar = component.select('ark-sidebar')
    expect(sidebar.hasAttribute('opened')).toBeTruthy()
  })

  it('includes selected product in its body', () => {
    let event = new CustomEvent('product-selected', {
      detail: {id: '001', name: 'Soccer Ball', price: 29}})
    
    component.onProductSelected(event)

    let items = component.select('[data-content]').children

    expect(items.length).toEqual(1)

    component.onProductSelected(event)

    expect(items.length).toEqual(1)

    event = new CustomEvent('product-selected', {
      detail: {id: '002', name: 'Samurai Sword', price: 45}})

    component.onProductSelected(event)

    items = component.select('[data-content]').children
    expect(items.length).toEqual(2)
  })
})
