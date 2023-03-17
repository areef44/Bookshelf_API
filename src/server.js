/**
 * 48. import hapi
 */
const Hapi = require('@hapi/hapi');

/**
 * 49. import routes yang telah dibuat
 */
const routes = require('./routes');
 
const init = async () => {
  const server = Hapi.server({

    /**
     * 50. deklarasikan port menjadi 9000
     */
    port: 9000,
    host: 'localhost',
    routes: {
        /**
         * 51.set cors 
         */
        cors: {
          origin: ['*'],
        },
      },
    router: {
        stripTrailingSlash: true,
    },
  });
  
  /**
  * 52.deklarasikan routes 
  */
  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 
init();