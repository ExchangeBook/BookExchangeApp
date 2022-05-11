const react = require('react');

class AddMyBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: [],
      library: [],
    }
    this.addBook = this.addBook.bind(this);
    this.getBook = this.getBook.bind(this);
    this.onlyOne = this.onlyOne.bind(this);
  }
  // onlyOne function allow only one checkbox checked
  onlyOne(checkbox) {
    const checkboxes = document.getElementByName('checkbox')
    checkboxes.forEach(item => {
      if (item !== checkbox) item.checked = false
    })
  };


  // getBook function will get book info from server which fetch data from external API
  getBook(num) {
    e.preventDefault();
    fetch('/api/addOldBook', { // route for fetching book data from api
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ isbn: num})
    })
      .then(response => response.json())
      .then((data) => {  // data format from api
        window.location.href = window.location.href;
        return data;
      });
  }

  // addBook function using user input to update state by click ADD THE BOOK button
  addBook() {
    // create book object
    let book = {};
    // if isbn is true, send isbn to server and search in api
    if (document.getElementById('isbn').value) {
      book = this.getBook(document.getElementById('isbn').value);
    } else {
      book = {
        title: document.getElementById('title').value,
        auther: document.getElementById('author').value,
        genre: document.getElementById('genre').value,
      }
    }
    // if wishlist is true, add book to this.state.wishlist, send POST to wishlist endpoint
    if (document.getElementById('addToWishlist').checked) {
      fetch('endpoint for wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(book)
      })
        .then(response => response.json())
        .then(data => console.log(`${data} added to your wishlist`));
    }
    // if library is true, add book to this.state.library, send POST to library endpoint
    if (document.getElementById('addToLibrary').checked) {
      fetch('endpoint for library', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(book)
      })
        .then(response => response.json())
        .then(data => console.log(`${data} added to your library`));
    }
  }

  render() {
    return (
      <div className='search-box'>
        <form className='search-form'>
          <label>ISBN</label>
          <input type='text' id='isbn' name='isbn'/><br></br>
          <label>Title</label>
          <input type='text' id='title' name='title'/><br></br>
          <label>Author</label>
          <input type='text' id='author' name='author'/><br></br>
          <label>Genre</label>
          <input type='text' id='genre' name='genre'/><br></br>
          <label for='condition'>Condition (optional for wishlist)</label>
          {/* <select name='condition' id='condition'>
            <option value="Like New">Like New</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select><br></br> */}
          <input type='checkbox' id='addToWishlist' name='checkbox' value='wishlist' onclick={this.onlyOne(this)}/>
          <label for='addToWishlist'>I want to add this book to my wishlist</label><br></br>
          <input type='checkbox' id='addToLibrary' name='checkbox' value='library' onclick={this.onlyOne(this)}/>
          <label for='addToLibrary'>I want to add this book to my library</label><br></br>
          <input type='submit' value='ADD THE BOOK' onclick={this.addBook}/>
        </form>
      </div>
    )
  }
}

// fakeController.fakeGetUserLibrary = (req, res, next) => {
//   res.locals.fakeUserLibrary = 
//       [{title: 'Lord of the Rings', author: 'Tolkien', genre: 'fiction', isbn: '345-5432', img_URL: 'whole thing', book_id: 3243}, 
//       {title: 'James Bond: Live and Let Die', author: 'Ian Fleming', genre: 'fiction', isbn: '234-784', img_URL: 'img stuff', book_id: 5483}, 
//       {title: 'Guns, Germs, and Steel', author: 'Jared Diamond', genre: 'non-fiction', isbn: '345-5432', img_URL: 'anotha one', book_id: 4321}]
// // }

export default AddMyBook;