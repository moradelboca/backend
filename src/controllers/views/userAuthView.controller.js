export async function handleRegisterView(req, res, next) {
  try {
    res.render('register', { title: 'Register' })
  } catch (error) {
    res.render('register', { title: 'Register - Failed' })
    error.viewError = true
    next(error)
  }
}

export async function handleLoginView(req, res, next) {
  try{
    res.render('login', { title: 'Login' })
  }
  catch(error){
    res.render('login', { title: 'Login - Failed' })
    next(error)
  }
}