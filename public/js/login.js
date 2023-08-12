const formLogin = document.querySelector('#formLogin')

async function loginUser(){
  if (formLogin instanceof HTMLFormElement) {
    formLogin.addEventListener('submit', async event => {
      event.preventDefault()

      const input_email = document.querySelector('#input_email')
      const input_password = document.querySelector('#input_password')

      if (
        input_email instanceof HTMLInputElement &&
        input_password instanceof HTMLInputElement
      ) {

        const datosUsuario = {
          email: input_email.value,
          password: input_password.value,
        }

        let res = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datosUsuario)
        })
        if (res.status === 201) {
          res = await res.json()
          localStorage.setItem('cartID', res.cart)
          window.location.href = '/'
        }
    }})
  }
}

loginUser()

document.getElementById('register').addEventListener('click', () => {
  window.location.href = '/auth/register'
})