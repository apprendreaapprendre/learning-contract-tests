import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export class LocalServer {
  private server: FastifyInstance;

  constructor(private port: number) {
    this.server = fastify();
  }

  withGet<T>(url: string, controller: (req: FastifyRequest<T>, res: FastifyReply) => void) {
    this.server.get(url, controller);
  }

  withPut<T>(url: string, controller: (req: FastifyRequest<T>, res: FastifyReply) => void) {
    this.server.put(url, controller);
  }

  withPost<T>(url: string, controller: (req: FastifyRequest<T>, res: FastifyReply) => void) {
    this.server.post(url, controller);
  }

  withDelete<T>(url: string, controller: (req: FastifyRequest<T>, res: FastifyReply) => void) {
    this.server.delete(url, controller);
  }

  withPatch<T>(url: string, controller: (req: FastifyRequest<T>, res: FastifyReply) => void) {
    this.server.patch(url, controller);
  }

  async start() {
    await this.server.listen(this.port, 'localhost');
  }

  async stop() {
    await this.server.close();
  }

  static randomPort(): number {
    return 10000 + Math.round(20000 * Math.random());
  }
}
