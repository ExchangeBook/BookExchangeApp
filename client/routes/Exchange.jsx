const React = require('react');
import ExchangeRow from '../components/ExchangeRow';

class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         incomingRequests: [],
         outgoingRequests: [],
         userBooks: [],
         allBooks: [],
         users: []
        };
    }

    componentDidMount() {
        this.getAllUserBooks()
        this.getAllUsers()
        this.getAllBooks()
    }
      // INCOMING BOOK REQUEST
    // TO GET REQUESTED BOOK FROM OTHER USERS AND THEIR INFO
    // From database get all books belonging to the logged in user (user_id) ex -> where users_books.user_id = 1
    // Render only the books that belong to user if there is a requester id present under user_books ex -> Where users_books.requester !== null
    // Using the requester id, render the user that requested the specifc book ex -> select users where requester = 2 also, select book where isbn = "that book"
    // Are we rendering different state depending on the user logged in. 

    getAllUserBooks ()  {
        fetch('/api/getMyBookRequests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            // body: JSON.stringify({user_id: props.user_id})
        })
        .then(response => response.json())
        .then(data => {
        this.setState({ userBooks: data });
        })
        .catch((err) => {
            console.log(`Error getAllUsersBooks ${err}`)
        })
    }
    
    // OUTGOING BOOK REQUEST
    // TO GET ALL BOOKS LOGGED IN USER REQUESTED
    // Based on logged in user ID, search users_books table if logged in user ID is present under requester section

    getAllUsers () {
        fetch('/api/getAllUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
        this.setState({ users: data });
        })
        .catch((err) => {
            console.log(`Error getAllUsers ${err}`)
        });
    // 
    }

    getAllBooks () {
        fetch('/api/getAllBooks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
        this.setState({allBooks: data})
        })
        .catch((err) => {
            console.log(`Error getAllBooks ${err}`)
        })
    }
    // OUTGOING BOOK REQUEST
    // TO GET ALL BOOKS LOGGED IN USER REQUESTED
    // Based on logged in user ID, search users_books table if logged in user ID is present under requester section


    // Map out both requested user and books data to render as request cards 
    // For Loop iteration through the data. 
      // For every iteration assign the row
      // Each property at the Ith index. 
    render () {
        const userTest = this.state.users[0]
        console.log(this.state.userBooks)
       // Incoming Request Table 
       return (
              <div className='exchange'>
                  <h3 className='incoming'>Incoming Requests</h3>
                  {this.state.users.length > 0 && (
                      <table class="table table-bordered">
                      <thead>
                          <tr>
                          <th scope="col">Book Requested</th>
                          <th scope="col">User</th>
                          <th scope="col">Email</th>
                          </tr>
                      </thead>
                      <tbody>
                          {this.state.userBooks.map((user) => {
                          return (<tr>
                              <th scope="row">1</th>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                          </tr>)
                          })}
                      </tbody>
                      </table>
                  )}
              </div>
       )
    }
}


export default Exchange;