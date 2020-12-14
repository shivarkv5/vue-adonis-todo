'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')
const ProjectController = require('../Controllers/Http/ProjectController')

class InvalidAccessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  async handle(error, { response }) {
    return response.status(403).json({
      error: "User not authorized to delete"
    })
  }
}

module.exports = InvalidAccessException
