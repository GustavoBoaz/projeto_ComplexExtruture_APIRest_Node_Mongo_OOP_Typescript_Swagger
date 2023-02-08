class BodyNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'BodyNotFound';
    this.stack = '400';
  }
}

export default BodyNotFound;