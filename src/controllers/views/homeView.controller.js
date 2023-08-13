export async function handleHomeView(req, res, next) {
  try{
    res.render('home', { title: 'Home' })
  }
  catch(error){
    next(error)
  }
}

export async function handleUnauthorizedView(req, res, next) {
  try{
    res.render('unauthorized', { title: 'Unauthorized' })
  }
  catch(error){
    next(error)
  }
}