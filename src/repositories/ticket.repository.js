import { ticketsDao } from '../daos/ticket.dao.mongoose.js'

class TicketRepository{
  constructor(dao) {
    this.dao = dao
  }
  async createTicket(ticket) {
    return await this.dao.createTicket(ticket)
  }
  async getTicketById(id) {
    return await this.dao.getTicketById(id)
  }
  async getTicketsFromUser(email){
    return await this.dao.getTicketsFromUser(email)
  }
}


export const ticketRepository = new TicketRepository(ticketsDao)