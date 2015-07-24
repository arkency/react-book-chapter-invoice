class LineItem extends React.Component {
  number() {
    return (parseInt(this.props.index) + 1);
  }

  calculateTotal() {
    let { price, amount } = this.props;
    let p = NaN, a = NaN;

    p = parseFloat(price);
    a = parseFloat(amount);
    return ((isNaN(p) || isNaN(a)) ? '...' : p * a);
  }


  render() {
    let { index,
          price, priceChanged,
          amount, amountChanged } = this.props;

    return(
      <tr>
        <td width="1%">{this.number()}.</td>
        <td width="50%">
          <input name="title" className="form-control" />
        </td>
        <td width="15%">
          <input name="price" value={price}
                 className="form-control"
                 onChange={priceChanged.bind(null, index)} />
        </td>
        <td width="15%">
          <input name="amount" value={amount}
                 className="form-control"
                 onChange={amountChanged.bind(null, index)} />
        </td>
        <td width="15%">{this.calculateTotal()}</td>
        <td width="4%">...</td>
      </tr>
    );
  }
}

class InvoiceLineItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line_items: [
        { price: null, amount: null },
        { price: null, amount: null }
      ]
    };

    this.priceChanged = this.priceChanged.bind(this);
    this.amountChanged = this.amountChanged.bind(this);
  }

  priceChanged(index, event) {
    let { line_items } = this.state;
    line_items[index].price = event.target.value;
    this.setState({ line_items });
  }

  amountChanged(index, event) {
    let { line_items } = this.state;
    line_items[index].amount = event.target.value;
    this.setState({ line_items });
  }

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
        <LineItem index={0} price={this.state.line_items[0]['price']}
                  amount={this.state.line_items[0]['amount']}
                  priceChanged={this.priceChanged}
                  amountChanged={this.amountChanged} />
        <LineItem index={1} price={this.state.line_items[1]['price']}
                  amount={this.state.line_items[1]['amount']}
                  priceChanged={this.priceChanged}
                  amountChanged={this.amountChanged} />
      </table>
    );
  }
}

React.render(
  <InvoiceLineItems />,
  document.getElementById("invoice")
);
