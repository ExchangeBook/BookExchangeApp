const React = require('react');


class ExchangeRow extends React.Component {


    render() {
        return (
            <tr>
                <td>{this.props.title}</td>
                <td>{this.props.author}</td>
                <td>{this.props.isbn}</td>
                <td>{this.props.condition}</td>
                <td><center><button type="button" class="req-button" onClick={this.deleteMyOldBook}>delete</button></center></td>
            </tr>
        )
    }
}

export default ExchangeRow;
