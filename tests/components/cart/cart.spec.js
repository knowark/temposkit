import 'src/components/cart'

describe('Cart', () => {
  let container = null
  let component = null

  beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
    container.innerHTML = `<tempos-cart></tempos-cart>`
    component = container.querySelector('tempos-cart')
    const global ={ 
      addEventListener: () => {},
      localStorage: {
        setItem: () => null,
        getItem: () => null
      }
    }
    component.init({global})
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

  it('sets item quantities on input alterations', () => {
    component.items = {
      '001': {id: '001', name: 'Ball', quantity: '3', price: 29},
      '002': {id: '002', name: 'Shirt', quantity: '1', price: 9}
    }
    component.render()
    const firstItemInput = component.select(
      '[data-product-id="001"] ark-input') 

    const event = new CustomEvent('altered', {detail: 7})
    Object.defineProperty(event, 'target',
      {writable: false, value: firstItemInput});

    component.onItemAltered(event)

    expect(component.items['001'].quantity).toEqual(7)
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

  it('emits an order-created event on order button click', () => {
    const items = {
      '001': {id: '001', name: 'Ball', quantity: '3', price: 29},
      '002': {id: '002', name: 'Shirt', quantity: '1', price: 9}
    }

    component.items = Object.assign({}, items)
    component.global = { alert: (message) => message }

    const orderButton = component.select('[data-order]')

    let eventName = null
    let eventDetail = null

    component.emit = (name, detail) => {
      eventName = name
      eventDetail = detail
    }

    const event = new MouseEvent('click')
    component.onOrderClicked(event)

    expect(component.items).toEqual({})
    expect(eventName).toEqual('order-created')
    expect(eventDetail.id).toBeTruthy()
    expect(eventDetail.items).toEqual(items)
  })

  it('deletes its selected items', () => {
    component.items = {
      '001': {id: '001', name: 'Ball', quantity: '3', price: 29},
      '002': {id: '002', name: 'Shirt', quantity: '1', price: 9}
    }

    component.render()
    expect(component.select('[data-content]').children.length).toEqual(2)

    const firstItemDeleteButton = component.select(
      '[data-product-id="001"] ark-button') 
    const event = new MouseEvent('click')
    Object.defineProperty(event, 'target',
      {writable: false, value: firstItemDeleteButton});

    component.onDeleteClicked(event)

    expect(component.select('[data-content]').children.length).toEqual(1)
    expect(Object.keys(component.items)).toEqual(['002'])
  })
})
