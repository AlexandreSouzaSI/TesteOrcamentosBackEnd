import { UseCaseError } from '@src/core/errors/use-case-error'

export class DreAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Dre ${identifier} already exists`)
  }
}
