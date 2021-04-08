const main = document.createElement('main')
document.body.appendChild(main)
main.innerHTML = `

<template id="product-template">
  <div>
    <h1>Product</h1>
    <span>\${product.name}</span>
  </div>
</template>

<tempos-show template="#product-template"></tempos-show>

`
