import fastify, {FastifyRequest, FastifyInstance, FastifyReply} from "fastify";

class HelloHttpRepository{
  constructor(private baseUrl: string){
  }

  async hello(name: string):Promise<string> {
    return `Hello ${name}`;
  }
}

describe("server tests", ()=> {
let server: FastifyInstance;
beforeEach(async ()=> {
  server = fastify();
 });

 afterEach(async ()=> {
  await server.close();
 });

it.only("happy path hello", async () => {
  let capturedName = '';

  server.post('/hello',  (req: FastifyRequest<{Body:{name:string}}>, resp: FastifyReply) => {
    capturedName = req.body.name;
    resp.status(200).send('toto');
  })

  await server.listen(61000, 'localhost');
  const repository = new HelloHttpRepository('http://localhost:61000');
  //créer la requete et l'envoyer
  const givenName = 'Rémy';
  const response = await repository.hello(givenName);
  expect(capturedName).toEqual(givenName);
  expect(response).toEqual('Hello Rémy');
})




})
