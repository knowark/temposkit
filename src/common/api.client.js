export class ApiClient {
  constructor(context = {}) {
    this.global = context.global || window
    this.url = context.url || ''
  }

  async fetch(query, variables) {
    const response = await this.global.fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query, variables
      })
    })

    if (!response.ok) {
      console.error('Failed to connect to Tempos API')
      return {}
    }

    const result = await response.json()
    if (result.errors) {
      for (const error of result.errors) {
        console.error(error)
      }
      return {}
    }

    return result.data
  }

}
