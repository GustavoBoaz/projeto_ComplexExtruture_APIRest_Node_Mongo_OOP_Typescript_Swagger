class IdInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'IdInvalidError';
    this.stack = '422';
  }
}

export default IdInvalidError;