require("dotenv").config();




const express = require("express");
//including body parser
var bodyParser= require("body-parser");
//initialising mongoose
const mongoose = require("mongoose");

//database
const database = require("./database/dataset");

//Models
const BookModel =require("./database/book");
const AuthorModel =require("./database/author");
const PublicationModel =require("./database/publication");



//express initialise
const booky =express();


//body parser initialisation.

booky.use(bodyParser.urlencoded({extended : true}));
booky.use(bodyParser.json());

//connecting moongose to mongo // DB

 mongoose.connect(process.env.MONGO_URL,

{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {console.log("connect done");});


/*
  Route :          /
  Description :   Get all the books;
  Access;         public
  Parameter:      none;
  Methods :       Get
*/
booky.get("/", async (req,res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});


/*
  Route:           /is
  Description :   Get specific book based on isbn;
  Access;         public
  Parameter:      isbn;
  Methods :       Get
*/

booky.get("/is/:isbn",async (req,res) => {
  const getSpecificBook = await BookModel.findOne({ISBN : req.params.isbn});



/*const getSpecificBook = database.books.filter((book) =>
    book.ISBN === req.params.isbn);*/

  if(!getSpecificBook){
    return res.json({error: `No book found for the ISBN ${req.params.isbn}`});
  }
  return res.json({book:getSpecificBook});
});

/*
  Route:           /c
  Description :   Get specific book based on category;
  Access;         publi
  Parameter:      category;
  Methods :       Get
*/
booky.get("/c/:category",async (req,res) => {

  const getSpecificBook = await BookModel.findOne({category : req.params.category});


  if(!getSpecificBook){
    return res.json({error: `No book found for the ISBN ${req.params.category}`});
  }
  return res.json({book:getSpecificBook});


/*
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category))

    if(getSpecificBook.length===0){
      return res.json({error: `No book found for the category ${req.params.category}`});
    }
    return res.json({book:getSpecificBook});
*/
});


/*
  Route:           /lang
  Description :   Get specific book based on language;
  Access;         public
  Parameter:      category;
  Methods :       Get
*/
booky.get("/lang/:language",async (req,res) => {

const getSpecificBook = await BookModel.findOne({language : req.params.language});

if(!getSpecificBook){
  return res.json({error: `No book found for the language ${req.params.language}`});
}
return res.json({book:getSpecificBook});




/*  const getSpecificBook = database.books.filter((books) =>
    books.language === req.params.language);

    if(getSpecificBook.length===0){
      return res.json({error: `No book found for the language---> ${req.params.language}`});
    }
    return res.json({book:getSpecificBook});*/

});

/*
  Route:           /author
  Description :   Get all authors;T
  Access;         public
  Parameter:      category;
  Methods :       Get
*/
booky.get("/author",async (req,res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

/*
  Route:           /auth
  Description :   Get specific author based on id;
  Access;         public
  Parameter:      category;
  Methods :       Get
*/
booky.get("/auth/:id",async (req,res) => {
  const getSpecificAuthor = await AuthorModel.findOne({id: req.params.id});

  if(!getSpecificAuthor){
    return res.json({error: `No Author found for the id ${req.params.id}`});
  }
  return res.json({book:getSpecificAuthor});


});

/*
  Route:           /author/book
  Description :   Get specific author based on book;
  Access;         public
  Parameter:      isbn;
  Methods :       Get
*/
booky.get("/author/book/:isbn", async (req,res) => {
  const getSpecificAuthor = await AuthorModel.findOne({books: req.params.isbn});

  if(!getSpecificAuthor){
    return res.json({error: `No Author found for the isbn ${req.params.isbn}`});
  }
  return res.json({book:getSpecificAuthor});



  /*
  const getSpecificBook = database.author.filter((author) =>
    author.books.includes(req.params.isbn))

    if(getSpecificBook.length===0){
      return res.json({error: `No author found for the book ${req.params.isbn}`});
    }
    return res.json({authors:getSpecificBook});*/

});



/*
Route            /publications
Description      Get all publications
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/publications", async (req,res) => {
  const getAllPublication = await PublicationModel.find();
  return res.json(getAllPublication);
});

/*
Route            /pub-id
Description      Get all publications based on id
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/pub-id/:id",(req,res) => {
  const specificPublication = database.publication.filter((publication) =>
    publication.id == req.params.id);
  if(specificPublication.length===0){
    return res.json({error: `No publication found for the id ${req.params.id}`});
  }
  return res.json({publication:specificPublication});


});


/*
Route            /pub-id/book
Description      Get all publications on book
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/pub-id/book/:isbn",(req,res) => {
  const specificPublication = database.publication.filter((publication) =>
    publication.books.includes(req.params.isbn));
  if(specificPublication.length===0){
    return res.json({error: `No publication found for the isbn ${req.params.isbn}`});
  }
  return res.json({publication:specificPublication});


});


//post request

/*
Route            /book/new
Description      add new book
Access           PUBLIC
Parameter        NONE
Methods          post
*/

booky.post("/book/new",async (req,res) => {
  const {newBook} = req.body;
  const addNewBook =BookModel.create(newBook);

  return res.json({upadatedBook :addNewBook});

/*  const newBook = req.body;
  database.books.push(newBook);
  return res.json({upadatedBook :database.books});*/

});


/*
Route            /author/new
Description      add new author
Access           PUBLIC
Parameter        NONE
Methods          post
*/

booky.post("/author/new", async(req,res) => {
  const {newAuthor} = req.body;
  const addNewAuthor =AuthorModel.create(newAuthor);



/*  const newAuth = req.body;
  database.author.push(newAuth);*/
  return res.json({upadatedAuthor :addNewAuthor ,
  message: "Author updated SuccessfullyQ!"});
});


/*
Route            /publication/new
Description      add new publication
Access           PUBLIC
Parameter        NONE
Methods          post
*/

booky.post("/publication/new",(req,res) => {

  const {newPub} = req.body;
  const addNewPub =PublicationModel.create(newPub);

  return res.json({upadatedPub :addNewPub ,
  message: "publication updated SuccessfullyQ!"});


  /*

  const newPub = req.body;
  database.author.push(newPub);
  return res.json({upadatedAuthor :database.publication});*/
});

/*----------------put-----------*/
/*
Route            /publication/update/book
Description      update or add new book
Access           PUBLIC
Parameter        NONE
Methods          post
*/

/*booky.put("/publication/update/book/:isbn",(req,res) => {

  //update the publication database(pushing the publication in apaticular pubId that is particular publication)
  database.publication.forEach((pub) => {
    if(pub.id === req.body.pubId ){
      return pub.books.push(req.params.isbn);
    }

  });
//updat the book database(changing thepublication id of a book)
database.books.forEach((books) => {
if(books.ISBN===req.params.isbn){
  books.publications = req.body.pubId;
  return;
}
});
return res.json(
  {
  books: database.books,
  publication : database.publication,
  message: "Sucessfully updated the publication"

}

);

});*/







/*
Route            /book/update
Description       update a book
Access           PUBLIC
Parameter        NONE
Methods          put
*/

booky.put("/book/update/:isbn" ,async (req,res) => {
  const upadatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn //searching book with this isbn
    },
    {
       title :req.body.bookTitle // the updatio of the title
    },
    {
      new: true// settimg this field to true will show the chnges in the front end of MOngo and postman
    }
  );
  return res.json({
    books: updatedBook
  });
});



/*
Route            /book/author/update/:isbn
Description       update a book
Access           PUBLIC
Parameter        NONE
Methods          put
*/

booky.put(" /book/author/update/:isbn" ,async (req,res) => {
  //update book database
  const upadatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn //searching book with this isbn
    },
    {
      $addToSet: {
        author: req.body.newAuthor
      }

    },
    {
      new: true// settimg this field to true will show the chnges in the front end of MOngo and postman
    }
  );
  //update the author BookDatabase

  const upadatedAuthor = await AuthorModel,findOneAndUpdate(
    {
      id : req.body.newAuthor
    },
    {
      $addToset: {
        books: req.params.isbn
      }
    },
    {
      new:true
    }
  )
  return res.json({
    books: updatedBook,
    author: updatedAuthor
  });
});



/************DELETE*****************/



/*
Route            /book/delete
Description      delete a book
Access           PUBLIC
Parameter        NONE
Methods          delete
*/

booky.delete("/book/delete/:isbn", async(req,res) => {

const upadatedBookDatabase = await BookModel.findOneAndDelete(
  {
    ISBN: req.params.isbn
  }
);
return res.json({
  books: upadatedBookDatabase
})





/*  // whichever book doesnot match with the isbn just send it to an updated book database array
  //rest will be filtered out
  const upadatedBookDatabase = database.books.filter(

      (book) => book.ISBN !== req.params.isbn

)
database.books= upadatedBookDatabase;

return res.json({
  books: database.books
});*/
});
/*



Route            /books/delete/author
Description      delete an author fom a book and a book from auhtor
Access           PUBLIC
Parameter        isbn,author id
Methods          delete
*/

booky.delete("/books/delete/author/:isbn/:authorId", (req, res) =>{
  //update the book BookDatabase

  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn){
      const newAuthList= book.author.filter(
        (eachAuthor) => eachAuthor!== parseInt(req.params.authorId)
      );
      book.author =newAuthList;
      return;

    }

  });



  //update the author database
  database.author.forEach((eachAuthor) => {
    if(eachAuthor.id===parseInt(req.params.authorId)){
      const newBookList = eachAuthor.books.filter(
        (book) => book !== req.params.isbn
      );
      eachAuthor.books=newBookList;
      return;
    }

  });
  return res.json({
    book: database.books,
  author : database.author,
    message : "Author as deleted"

  });

});


booky.listen(3000,()=> {
  console.log("server is up and running");
});
