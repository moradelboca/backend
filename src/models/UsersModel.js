export class User {
  constructor(email, first_name, last_name, password, age, role) {
    
    arguments.forEach(arg => { if (!arg) throw new Error('All data is required.') })
    if (age > 120 || age < 0) throw new Error('Age must be between 0 and 120.')
    if (role != 'user' && role != 'admin') throw new Error('Role must be either user or admin.')
    if (email.indexOf('@') == -1) throw new Error('Email must contain @.')
    if (/[a-z]+/.test(first_name) == false) throw new Error('First name must contain only letters.')
    if (/[a-z]+/.test(last_name) == false) throw new Error('Last name must contain only letters.')
    if (password.length < 8) throw new Error('Password must be at least 8 characters long.')
    if (typeof age != 'number') throw new Error('Age must be a number.')

    this.email = email
    this.first_name = first_name
    this.last_name = last_name
    this.password = password
    this.age = age
    this.role = role
  }
}