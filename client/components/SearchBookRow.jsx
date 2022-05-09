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
        <td><button type="button" class="req-button">request</button></td>
      </tr>
    )
  }
}

export default SearchBookRow;








