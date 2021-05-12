import 'components/button'
import 'components/card'
import 'components/icon'
import 'components/spinner'
import temposProductImage from 'common/assets/product_placeholder_2.svg'
import { Component } from 'base/component'
import { ApiClient, config } from 'common'

const tag = 'tempos-show'
export class TemposShowComponent extends Component {
  init (context = {}) {
    this.binding = 'tempos-show-listen'
    this.global = context.global || window
    this.client = context.client || new ApiClient({ url: config.apiUrl })

    const urlParams = new URLSearchParams(this.global.location.search)
    this.tenant = (
      this.tenant || urlParams.get('tenant') || 'demo')
    this.limit = this.limit || urlParams.get('limit') || 12
    this.offset = this.offset || urlParams.get('offset') || 0

    this.data = {}
    return super.init(context)
  }

  reflectedProperties() {
    return ['tenant', 'limit', 'offset']
  }

  render () {
    if (this.data.showProducts) {
      const products = this.data.showProducts.products
      this.content = /* html */ `
      <div class="${tag}__search"></div>
      <div class="${tag}__content" data-content>
        ${products.map(this.renderProduct).join('')}
      </div>
      `
    } else {
      this.content = /* html */ `
      <ark-spinner></ark-spinner>
      `
    }
    return super.render()
  }

  renderProduct (product) {
    const [firstImage] = product.images
    const coverImage = firstImage && firstImage.url || temposProductImage
    return `
    <ark-card title="${product.name}" subtitle="Descripción...">
      <img class="tempos-show__product-picture" src="${coverImage}"
        alt="product picture" slot="media" width="100" height="200">
      <div class="tempos-show__product-id">${product.id}</div>
      <div class="tempos-show__product-price">\$ ${product.price}</div>
      <ark-button background="success" color="dark" slot="actions"
        tempos-show-listen on-click="onProductAddClick" fab
        data-product-id="${product.id}">
        <ark-icon type="mat" name="add_shopping_cart" slot="icon"></ark-icon>
      </ark-button>
    </ark-card>
    `
  }

  async load () {
    const variables = { 
      tenant: this.tenant, 
      input: { limit: parseInt(this.limit), offset: parseInt(this.offset) }
    }

    this.data = await this.client.fetch(query, variables)

    this.render()

    return super.load()
  }

  onProductAddClick(event) {
    event.stopPropagation()
    const addButton = event.target.closest('ark-button')
    const product = this.data.showProducts.products.find(
      item => item.id == addButton.dataset.productId)
    this.emit('product-selected', product)
  }
}

const query = `                                        
query ShowProducts($tenant: String!, $input: FilterInput) {              
  showProducts(tenant: $tenant, input: $input) {                       
    products {                                       
      id                                             
      name                                           
      price
      images {
        name
        url
        sequence
      }
    }                                                
  }                                                  
}                                                    
`                                                      

const styles = `
.tempos-show__content {
  display: grid;
  padding: 0.5rem;
  align-items: center;
  grid-gap: 1rem;
  grid-template-columns: repeat(
  auto-fit, minmax(min(100%, 200px), 1fr));
}
.tempos-show__product-picture {
  padding: 1rem;
}
.tempos-show__product-price {
  color: var(--danger);
}
`

Component.define(tag, TemposShowComponent, styles)
