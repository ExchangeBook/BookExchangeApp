const React = require('react');
import MyBookRow from '../components/MyBookRow';

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myoldbooks:[],
    }
    this.getMyOldBooks();
    this.rerender = this.rerender.bind(this);
  }

  getMyOldBooks = () => {
    fetch('/api/getMyOldBookList', {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({myoldbooks:data});
    });
  }

  addOldBook = () => {
    fetch('/api/addOldBook', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({isbn: document.getElementById('addString').value})
    })
    .then(response => response.json())
    .then( () => {
      this.rerender();
    });
  }
  
  rerender = () => {
    this.getMyOldBooks();
    location.reload();
  }

  render(){
    let table;
    const rows = [];
    if (this.state.myoldbooks.length > 0){
      rows.push(            
        <tr>
          <th key={0}>Title</th>
          <th key={1}>Author</th>
          <th key={2}>ISBN</th>
          <th key={3}>Condition</th>
          <th key={4}></th>
        </tr>)
      for (let i = 0; i < this.state.myoldbooks.length; i++){
        rows.push(<MyBookRow 
          {...this.state.myoldbooks[i]}
          key = {i}
          rerender = {this.rerender}
        />)
      }
      table = <table className="result-table">{rows}</table>
    }
    return (
      <div className="search-box">
        <form className="search-form">
          <input type="text" placeholder="search book by title" name="title" id="addString" required />
          <input type="submit" value="Add" onClick={this.getMyOldBooks}/>
        </form>
        <div class="result-box">
          { table }
        </div>
      </div>
    )
  }
}

export default MyPage;








