class LineItem extends React.Component {
  render() {
    return(
      <tr>
        <td width="1%">{this.props.number}.</td>
        <td width="50%"><input name="title" className="form-control"/></td>
        <td width="15%"><input name="pricePerUnit" className="form-control" /></td>
        <td width="15%"><input name="amount" className="form-control" /></td>
        <td width="15%">...</td>
        <td width="4%">...</td>
      </tr>
    );
  }
}

class InvoiceLineItems extends React.Component {
  render() {
    return(
      <table className="table table-bordered table-hover">
        <tr>
          <th>Nr</th>
          <th>Title</th>
          <th>Price per unit</th>
          <th>Amount</th>
          <th>Total price</th>
          <th>Action</th>
        </tr>
        <LineItem number="1" />
        <LineItem number="2" />
        <LineItem number="3" />
      </table>
    );
  }
}

React.render(
  <InvoiceLineItems />,
  document.getElementById("invoice")
);
