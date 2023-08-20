import { ticketRepository } from "../repositories/ticket.repository.js"

class TicketService{
  constructor(repository) {
    this.repository = repository
  }
  async createTicket(products, email, cartID) {
    try{
      let amount = 0
      for(let productData of products){
        amount += productData.product.price * productData.quantity
      }
      return await this.repository.createTicket({
        code: cartID,
        puncharse_datetime: new Date(),
        amount: amount,
        purchaser: email
      })
    }
    catch(error){
      throw error
    }
  }
}

export const ticketService = new TicketService(ticketRepository)