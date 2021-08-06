import 'src/components/show'
import { mockFetch } from '../../__mocks__/fetchMock.js'

describe('Show', () => {
  let container = null
  let component = null

  global.fetch = jest.fn(mockFetch({data: {
    showProducts: { products: [] }
  }}))

  beforeEach(() => {
    global.fetch.mockClear()
    container = document.createElement('div')
    document.body.append(container)
    container.innerHTML = `<tempos-show></tempos-show>`
    component = container.querySelector('tempos-show')
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

  it('renders products after being fetched', async () => {
    const products = [
      { id: '001', name: 'Orange Juice', images: [] },
      { id: '002', name: 'Chocolate Cake', images: [] },
      { id: '003', name: 'Special Brownie', images: [
        { url: 'https://api.tempos.shop/rest/media/photo.jpg' }] }
    ] 

    const mockShowInformer = {
      showProducts: async (showProductsInput) => products
    }

    component.showInformer = mockShowInformer

    await component.update()

    const content = component.select('[data-content]')

    expect(content.children.length).toEqual(products.length)
  })

  it('emits a product-selected event when a product is added', async () => {
    const products = [
      { id: '001', name: 'Orange Juice', images: [] },
      { id: '002', name: 'Chocolate Cake', images: [] },
      { id: '003', name: 'Special Brownie', images: [
        {url: 'https://api.tempos.shop/rest/media/photo.jpg' }] }
    ] 

    const mockShowInformer = {
      showProducts: async (showProductsInput) => products
    }

    component.showInformer = mockShowInformer

    await component.update()

    let eventName = null
    let eventDetail = null

    component.emit = (name, detail) => {
      eventName = name
      eventDetail = detail
    }

    const productId = '002'
    const productButton = component.select(
      `ark-button[data-product-id="${productId}"]`)

    productButton.click()

    expect(eventName).toEqual('product-selected')
    expect(eventDetail).toBe(products[1])
  })
})
