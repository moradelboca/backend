import { Router } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { onlyAuth, onlyRole } from '../../middlewares/auth.js'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Ecommerce project API',
      description:
        'Documentation for the Ecommerce project API made for the Coderhouse Backend course',
    },
  },
  apis: ['../docs/**/*.yaml'],
}

const specs = swaggerJsdoc(options)
export const docsRouter = Router()

docsRouter.use('/', onlyAuth, onlyRole('admin'), swaggerUi.serve, swaggerUi.setup(specs))