import mongoose from '../database/mongoose.js'

const ticketsSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    puncharse_datetime: { type: Date, required: true },
    amount: { type: String, required: true },
    purchaser: { type: String, required: true},
  },
  { versionKey: false }
)

class TicketsDaoMongoose {
  #ticketDb
  constructor() {
    this.#ticketDb = mongoose.model('tickets', ticketsSchema)
  }
  async createTicket(ticket) {
    return await this.#ticketDb.create(ticket)
  }
  async getTicketById(id) {
    return await this.#ticketDb.findById(id).lean()
  }
  async getTicketByCode(code) {
    return await this.#ticketDb.findOne({ code:code }).lean()
  }
  async getTicketsFromUser(email){
    return await this.#ticketDb.find({purchaser: email}).lean()
  }
}

export const ticketsDao = new TicketsDaoMongoose()