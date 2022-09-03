const options = {
    swaggerDefinition: {
      openapi: '3.0.3',
      info: {
        title: ' product REST API SERVER',
        version: '1.0.0',
        description: 'product API with express',
      },
      servers: [
        {
          url: 'http://uskawjdu.iptime.org:8082/',
        },
      ],
    },
    apis: ['./models/client.js', './routes/index.js', './models/Chat.js'],
  };

module.exports = options