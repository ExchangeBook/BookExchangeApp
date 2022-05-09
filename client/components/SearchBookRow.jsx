const React = require('react');

class SearchBookRow extends React.Component {
  render(){
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.author}</td>
        <td>{this.props.isbn}</td>
        <td>{this.props.condition}</td>
        <td>{this.props.username}</td>
        <td><center><button type="button" className="req-button">request</button></center></td>
      </tr>
    )
  }
}

export default SearchBookRow;