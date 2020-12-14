'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ResourceNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  async handle(error, { response }) {
    return response.status(404).json({
      error: "Project Not Found"
    })
  }}

module.exports = ResourceNotFoundException
