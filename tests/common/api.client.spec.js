import { ApiClient } from 'common'
import { mockFetch } from '../__mocks__/fetchMock.js'

describe('ApiClient', () => {
  const url = 'http://api.tempos.local/graphql'
  const consoleSpy = jest.spyOn(
    console, 'error').mockImplementation(() => {})

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('can be instantiated', () => {
    const client = new ApiClient({ global: {}, url })
    expect(client).toBeTruthy()
  })

  it('fetches data from the graphql data', async () => {
    const products = [
      { id: '001', name: 'Orange Juice' },
      { id: '002', name: 'Chocolate Cake' },
      { id: '003', name: 'Special Brownie' }
    ] 

    const fetch = jest.fn(mockFetch({
      data: {
        showProducts: { products }
      } 
    }))

    const query = `
      query ShowProducts($input: ShowInput) {
        showProducts(input: $input) {
          products {
            id
            name
          }
        }
      }
    `
    const variables = { limit: 10 }
    const client = new ApiClient({ global: { fetch }, url })

    await client.fetch(query, variables)

    expect(client).toBeTruthy()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch.mock.calls[0][0]).toEqual(url)
    expect(fetch.mock.calls[0][1].headers).toEqual({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }) 
    const body = JSON.parse(fetch.mock.calls[0][1].body)
    expect(body.query.replace(/\s/g, '')).toEqual(
      query.replace(/\s/g, '')) 
    expect(body.variables).toEqual(variables)
  })

  it('logs connection errors to the console', async () => {
    const consoleSpy = jest.spyOn(
      console, 'error').mockImplementation(() => {})
    const fetch = jest.fn(mockFetch({}, false))

    const query = `
      query ShowProducts($input: ShowInput) {
        showProducts(input: $input) {
          products {
            id
            name
          }
        }
      }
    `
    const variables = { limit: 10 }
    const client = new ApiClient({ global: { fetch }, url })

    await client.fetch(query, variables)

    expect(client).toBeTruthy()
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(
      `Failed to connect to Tempos API: ${url}`)
  })

  it('logs graphql errors to the console', async () => {
    const fetch = jest.fn(mockFetch({
      data: {},
      errors: [
        { message: 'Cannot query field showProducts on type Query.' },
        { message: 'API FATAL ERROR.' }
      ]
    }))

    const query = `
      query ShowProducts($input: ShowInput) {
        showProducts(input: $input) {
          products {
            id
            name
          }
        }
      }
    `
    const variables = { limit: 10 }
    const client = new ApiClient({ global: { fetch }, url })

    await client.fetch(query, variables)

    expect(client).toBeTruthy()
    expect(consoleSpy).toHaveBeenCalledTimes(2)
    expect(consoleSpy).toHaveBeenCalledWith(
      { message: 'Cannot query field showProducts on type Query.' })
    expect(consoleSpy).toHaveBeenCalledWith(
      { message: 'API FATAL ERROR.' })
  })
})
