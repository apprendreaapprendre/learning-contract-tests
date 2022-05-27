import {FastifyRequest} from "fastify";
import {LocalServer} from "./LocalServer";
import {HelloHttpRepository} from "../../HelloHttpRepository";

describe('Hello', () => {
    let server: LocalServer;
    let port: number;

    beforeEach(() => {
        port = LocalServer.randomPort();
        server = new LocalServer(port);
    });

    afterEach(async () => {
        await server.stop();
    });

    it('returns Hello with the given name when it succeeds', async function () {
        // GIVEN

        let capturedName = undefined;

        server.withPost('/hello',
            (req: FastifyRequest<{ Body: { name: string } }>, res) => {
                const name = req.body.name;
                capturedName = name;

                res.status(200).send(`Hello ${name}!`);
            });
        await server.start();

        const repository = new HelloHttpRepository(`http://localhost:${port}`);
        const name = 'John';

        // WHEN
        const response = await repository.hello(name);

        // THEN
        expect(capturedName).toEqual(name);
        expect(response).toEqual('Hello John!');
    });

    it('raises an exception when a request failed', async () => {
       // GIVEN
       server.withPost('/hello', (req: FastifyRequest<{Body:{name:string}}>, res) => {
         throw new Error('Error Simulation Test');
       } );

       await server.start();

       const repository = new HelloHttpRepository(`http://localhost:${port}`);

       // WHEN
         await expect(repository.hello('John')).rejects.toThrow(new Error('Try again later'));
    } )
})