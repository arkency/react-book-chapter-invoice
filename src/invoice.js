class LineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { price: null, amount: null };

    this.priceChanged = this.priceChanged.bind(this);
    this.amountChanged = this.amountChanged.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  priceChanged(event) {
    this.setState({ price: event.target.value });
  }

  amountChanged(event) {
    this.setState({ amount: event.target.value });
  }

  calculateTotal() {
    let { price, amount } = this.state;
    let p = NaN;
    let a = NaN;
    p = parseFloat(price);
    a = parseFloat(amount);
    return ((isNaN(p) || isNaN(a)) ? '...' : p * a);
  }

  render() {
    return(
      <tr>
        <td width="1%">{this.props.number}.</td>
        <td width="50%">
          <input name="title" className="form-control" />
        </td>
        <td width="15%">
          <input name="price" className="form-control"
                 onChange={this.priceChanged} />
        </td>
        <td width="15%">
          <input name="amount" className="form-control"
                 onChange={this.amountChanged} />
        </td>
        <td width="15%">{this.calculateTotal()}</td>
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
          <th>Price</th>
          <th>Amount</th>
          <th>Total</th>
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
