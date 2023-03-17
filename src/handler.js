/**
 * 3.Install nano id kemudian import 
 */
const { nanoid } = require('nanoid');

/**
 * 4.import db yang telah dibuat di file books.js
 */
const books = require('./books')

/**
 * 5. Membuat function untuk menambahkan buku
 */
const addBookHandler = (request, h) => {

  /**
   * 6.inisialisasi field yang akan ditambahkan
   */
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    /**
     * 7.inisialisasi id yang yang digenerate menggunakan nano id
     */
    const id = nanoid(16);

    /**
     * 8.deklarasi ketika jumlah halaman sama dengan jumlah halaman dibaca artinya buku selesai dibaca
     */
    const finished = pageCount === readPage;

    /**
     * 9.mendapatkan tanggal dari function new Date().toISOString()
     */
    const insertedAt = new Date().toISOString();

    /**
     * 10.deklarasi updatedAt = insertedAt;
     */
    const updatedAt = insertedAt;


 /**
  * 11. Buat penampung untuk data buku
  */
 const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
 };

  /**
  * 12. Cek name apabila kosong lalu isi pesan status dan response yang akan diberikan
  */
 if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  /**
  * 13. Cek apabila jumlah halaman dibaca lebih besar dari jumlah halaman keseluruhan lalu isi pesan status dan response yang akan diberikan
  */
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
}

 /**
  * 14. Tambahkan data buku kedalam books.js
  */
books.push(newBook);

 /**
  * 15. buat variabel isSuccess untuk mengecek apakah data berhasil ditambahkan atau tidak 
  */
const isSuccess = books.filter((book) => book.id === id).length > 0;

 /**
  * 16. jika data berhasil ditambahkan maka berikan status,pesan dan id data yang berhasil ditambahkan 
  */
if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  /**
  * 17. jika data gagal ditambahkan maka berikan status,pesan dan response gagal 
  */
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;

};

/**
 * 18. Membuat function untuk mendapatkan semua data buku
 */
const getAllBooksHandler = (request, h) => {

 /**
 * 19. Inisialisasi reading finished dan name
 */
  const {
    reading, finished, name,
  } = request.query;

/**
 * 20. Cek Status reading apabila 1 tampikan data buku yang sudah dibaca
 */
  if (reading) {
    if (reading === '1') {
      return {
        status: 'success',
        data: {
          books: books.filter((book) => book.reading === true).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      };
    }

 /**
 * 21. Cek Status reading apabila 0 tampikan data buku yang belum dibaca
 */
    if (reading === '0') {
      return {
        status: 'success',
        data: {
          books: books.filter((book) => book.reading === false).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      };
    }
  }

/**
 * 22. Cek Status finished apabila 1 tampikan data buku yang sudah selesai dibaca
 */
  if (finished) {
    if (finished === '1') {
      return {
        status: 'success',
        data: {
          books: books.filter((book) => book.finished === true).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      };
    }

 /**
 * 23. Cek Status finished apabila 1 tampikan data buku yang belum selesai dibaca
 */
    if (finished === '0') {
      return {
        status: 'success',
        data: {
          books: books.filter((book) => book.finished === false).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      };
    }
  }

 /**
 * 24. Cek nama apabila sesuai dengan nama yang dicek tampilkan data buku sesuai nama
 */
  if (name) {
    const filter = books.filter((filter) => filter.name.toLowerCase().includes(name.toLowerCase()));
    const response = h.response({
      status: 'success',
      data: {
        books: filter.map((filter) => ({
          id: filter.id,
          name: filter.name,
          publisher: filter.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

/**
 * 25. Membuat function untuk mendapatkan data buku berdasarkan id
 */
const getBookByIdHandler = (request, h) => {

  /**
  * 26. inisialiasi id
  */
    const { id } = request.params;

     /**
      * 27. filter id hanya untuk array ke -0
      */
    const book = books.filter((filter) => filter.id === id)[0];

     /**
      * 28. cek buku jika ada maka munculkan detail data buku
      */
    if (book !== undefined) {
        return {
          status: 'success',
          data: {
            book,
          },
        };
      }

      /**
      * 29. jika buku tidak ada maka munculkan pesan gagal dan response code 404
      */
      const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      });
      response.code(404);
      return response;
  };

/**
 * 30. Membuat function untuk merubah data buku
 */
const editBookByIdHandler = (request, h) => {

  /**
   * 31. inisialisasi id data buku yang akan dirubah
   */
    const { id } = request.params;
   
  /**
   * 32. inisialisasi field data buku yang akan dirubah
   */
    const { 
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading, 
    } = request.payload;

    /**
     * 33.mendapatkan tanggal dari function new Date().toISOString()
     */
    const updatedAt = new Date().toISOString();

    /**
     * 34.mendapatkan id buku dari indek data buku berdasarkan id data buku
     */
    const idBuku = books.findIndex((book) => book.id === id);
   
    /**
     * 35.cek id buku tidak sama -1
     */
    if (idBuku !== -1) {
      books[idBuku] = {
        ...books[idBuku],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
      };
      
       /**
        * 36.cek jika nama tidak diisi lalu munculkan status dan pesan,lalu response code
        */
      if (!name) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
      }

        /**
        * 37.cek jika halaman dibaca lebih besar daripada jumlah halaman lalu munculkan status dan pesan,lalu response code
        */
      if (readPage > pageCount) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
      }

       /**
        * 38.jika berhasil melewati pengecekan maka munculkan status dan pesan,lalu response code
        */
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
      }

      /**
        * 39.jika id tidak ditemukan maka munculkan status dan pesan,lalu response code
        */
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      });
      response.code(404);
      return response;

    };

 /**
 * 40. Membuat function untuk menghapus data buku
 */
const deleteBookByIdHandler = (request, h) => {

  /**
   * 41. inisialisasi id data buku yang akan dihapus
   */     
  const { id } = request.params;

   /**
     * 42.mendapatkan id buku dari indek data buku berdasarkan id data buku
     */
  const idBuku = books.findIndex((book) => book.id === id);


   /**
     * 43.jika id buku tidak sama dengan -1 jalankan fungsi splice lalu munculkan status pesan dan responce code
     */
  if (idBuku !== -1) {
    books.splice(idBuku, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

   /**
     * 44.jika tidak berhasil melewati pengecekan maka munculkan status pesan dan response code
     */
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;

}

/**
 * 45.Export function crud yang sudah dibuat untuk nantinya dibuatkan routenya
 */
module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler,editBookByIdHandler, deleteBookByIdHandler };