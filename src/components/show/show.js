import { Component } from 'base/component'

const tag = 'tempos-show'
export class TemposShowComponent extends Component {
  init (context = {}) {
    this.binding = 'tempos-show-listen'
    this.url = 'https://api.tempos.shop/graphql'
    this.global = context.global || window 
    this.data = []
    return super.init(context)
  }

  render () {
    this.content = /* html */ `
    <div class="${tag}__search"></div>
    `
    return super.render()
  }

  async load () {
    const variables = { limit: 20 }
    const result = await this.global.fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query, variables
      })
    })

    return super.load()
  }
}

const query = `                                        
query GeProducts($input: FilterInput) {              
  getProducts(input: $input) {                       
    contacts {                                       
      id                                             
      name                                           
    }                                                
  }                                                  
}                                                    
`                                                      

Component.define(tag, TemposShowComponent)
