const socket = io()

const productsContainer = document.getElementById("products")
const form = document.getElementById("productInput")

socket.on('productsList', products => {
  // Mapping all products in DOM's ul
  productsContainer.innerHTML =  products.reduce( (pList, p) =>{
    return( 
      pList + 
      `
      <li>
          <p>${p.title}: $${p.price}</p>
      </li>
      `
    )
  }, '')
})

form.addEventListener('submit', e => {
  e.preventDefault()
  const product = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    code: document.getElementById('code').value,
    price: document.getElementById('price').value,
    stock: document.getElementById('stock').value,
    category: document.getElementById('category').value,
    thumbnails: document.getElementById('thumbnails').value
  }
  socket.emit('addProduct', product)
})