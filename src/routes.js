
/**
 * 46. import function crud yang telah dibuat di halaman handler.js
 */
const { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler } = require("./handler");

/**
 * 46. deklarasikan method path dan handler yang telah dibuat sebelumnya
 */
const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (() => '<p>Test Connection</p>'),
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler,
    },
  ];
   
/**
 * 47. export routes telah dibuat untuk dipanggil di halaman server.js
 */
  module.exports = routes;