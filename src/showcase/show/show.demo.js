const main = document.querySelector('main')
main.innerHTML = `

<template id="product-template">
  <div>
    <h1>Product</h1>
    <span>\${product.name}</span>
  </div>
</template>

<tempos-show template="#product-template"></tempos-show>

`
