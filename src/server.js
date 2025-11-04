import Fastify from "fastify";
import dotenv from "dotenv";
import uploadRoutes from "./routes/upload.route.js";

dotenv.config();

const app = Fastify({ logger: true });

app.register(uploadRoutes);

app.listen({ port: 3000 }, (err, address) => {
    if (err) throw err;
    console.log(`🚀 Server running at ${address}`);
});
