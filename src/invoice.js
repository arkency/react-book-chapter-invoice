class LineItem extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.number}.</td>
        <td><input name="title" /></td>
        <td><input name="pricePerUnit" /></td>
        <td><input name="amount" /></td>
        <td>...</td>
      </tr>
    );
  }
}

class InvoiceLineItems extends React.Component {
  render() {
    return(
      <table>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Price per unit</th>
          <th>Amount</th>
          <th>Total price</th>
        </tr>
        <LineItem number="1" />
        <LineItem number="2" />
      </table>
    );
  }
}

React.render(
  <InvoiceLineItems />,
  document.getElementById("invoice")
);
