import '../components'

async function main() {
  const client = {
    fetch: async (query, variable) => {
      return { showProducts: { products: [
        {id: '001', name: 'Ball', price: 20, images: []},
        {id: '002', name: 'Car', price: 50, images: []},
        {id: '003', name: 'Sword', price: 30, images: []},
      ]}}
    }
  }

  const temposShow = document.querySelector('tempos-show')
  await temposShow.update({client})
}

setTimeout(main, 1000)
