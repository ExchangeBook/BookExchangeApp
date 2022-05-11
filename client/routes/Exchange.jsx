const React = require('react');

class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestedUsers: [],
            books: []
        }
    }

    componentDidMount() {
        this.getAllBooks()
        this.getAllUsers()
    }
    getAllBooks ()  {
        fetch('/api/getMyBookRequests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
        this.setState({ books: data });
        });
    }

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

    // Map out both requested user and books data to render as request cards 

    render () {
       return (
        <div className="cards">
            <div class="container">
                <div class="row">
                    <div class="col">
                            <div class="card" style= {{"width": "15rem"}}>
                            <img class="image" src="https://upload.wikimedia.org/wikipedia/en/8/8e/The_Fellowship_of_the_Ring_cover.gif" alt="Card image cap"/>
                            <div class="card-body">
                                <h5 class="card-title">Fellowship of the Ring</h5>
                                <p class="card-text">A thrilling novel about good vs evil.</p>
                                <a href="#" class="btn btn-primary">Reserved Button?</a>
                            </div>
                            </div>
                    </div>
                    <div class="col">
                        <div class="card" style= {{"width": "15rem"}}>
                        <div class="card-body">
                            <h5 class="card-title">User 1</h5>
                            <p class="card-text">Name:</p>
                            <p>Address:</p>
                            <p>Rating: </p>
                            <a href="#" class="btn btn-primary">Reserved Button?</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       )
    }
}


export default Exchange;