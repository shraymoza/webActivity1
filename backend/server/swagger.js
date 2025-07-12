// backend/server/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi    from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title:       'WebActivity1 API',
            version:     '1.0.0',
            description: 'REST endpoints for the WebActivity1 project',
        },
        servers: [
            { url: 'http://localhost:5000',           description: 'Local dev' },
            { url: 'https://webactivity1.onrender.com', description: 'Production' },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type:         'http',
                    scheme:       'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    // All files containing OpenAPI annotations:
    apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default function swaggerDocs(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Helpful console log
    console.log(`📖 Swagger docs available at /api-docs`);
}
