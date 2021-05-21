import { Identifier } from 'common'

describe('Identifier', () => {
  it('can be instantiated', () => {
    const identifier = new Identifier()
    expect(identifier).toBeTruthy()
  })

  it('generates uuid', () => {
    const global = { crypto: {
      getRandomValues: (value) => value }}
    const identifier = new Identifier({global})

    const uuid = identifier.uuid()
    expect(uuid).toBeTruthy()
  })
})
