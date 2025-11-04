import { upload } from '../services/s3.services.js';

export default async function uploadRoutes(fastify) {
    fastify.register(import('@fastify/multipart'));

    fastify.post('/upload', async (req, reply) => {
        const data = await req.file();
        if (!data) return reply.code(400).send({ error: "Arquivo não enviado" });

        const { key, url } = await upload(data);

        return reply.code(201).send({
            message: 'Upload realizado com sucesso',
            key,
            url
        });
    });
}
