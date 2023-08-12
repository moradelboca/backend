const formRegister = document.querySelector('#formRegister')

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener('submit', async event => {
    event.preventDefault()

    const input_first_name = document.querySelector('#input_first_name')
    const input_last_name = document.querySelector('#input_last_name')
    const input_email = document.querySelector('#input_email')
    const input_age = document.querySelector('#input_age')
    const input_password = document.querySelector('#input_password')

    if (
      input_first_name instanceof HTMLInputElement &&
      input_last_name instanceof HTMLInputElement &&
      input_email instanceof HTMLInputElement &&
      input_age instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {

      const datosUsuario = {
        first_name: input_first_name.value,
        last_name: input_last_name.value,
        email: input_email.value,
        age: parseInt(input_age.value),
        password: input_password.value,
      }

      const { status } = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      })
      if (status === 200) {
        window.location.href = '/'
      }
    }
  })
}