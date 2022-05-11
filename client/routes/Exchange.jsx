const React = require('react');

class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         incomingRequests: [],
         outgoingRequests: [],
         userBooks: [],
         allBooks: []
        };
    }

    componentDidMount() {
        this.getAllUserBooks()
        this.getAllUsers()
        this.getAllBooks()
    }

      // INCOMING BOOK REQUEST
    // TO GET REQUESTED BOOK FROM OTHER USERS AND THEIR INFO
    // From database get all books belonging to the logged in user (user_id)
    // Render only the books that belong to user if there is a requester id present under user_books
    // Using the requester id, render the user that requested the specifc book
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
        });
    }
    
    // OUTGOING BOOK REQUEST
    // TO GET ALL BOOKS LOGGED IN USER REQUESTED
    // Based on logged in user ID, search users_books table if logged in user ID is present under requester section

    getAllUsers () {
        fetch('/api/getUserRequests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
        this.setState({ requestedUsers: data });
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
        this.setState({allBoks: data})
        })
    }


    // OUTGOING BOOK REQUEST
    // TO GET ALL BOOKS LOGGED IN USER REQUESTED
    // Based on logged in user ID, search users_books table if logged in user ID is present under requester section


    // Map out both requested user and books data to render as request cards 

    render () {
        console.log(this.props)
       return (
              <h1>ldaasdfasdfl</h1>
       )
    }
}


export default Exchange;