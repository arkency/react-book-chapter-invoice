class LineItem extends React.Component {
  number() {
    return (parseInt(this.props.index) + 1);
  }

  calculateTotal() {
    let { price, amount } = this.props;
    let p = parseFloat(price);
    let a = parseFloat(amount);
    return ((isNaN(p) || isNaN(a)) ? 0 : p * a);
  }


  render() {
    let { index,
          price, priceChanged,
          amount, amountChanged } = this.props;

    return(
      <tr>
        <td>{this.number()}.</td>
        <td>
          <input name="title" className="form-control" />
        </td>
        <td>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input name="price" value={price}
                   className="form-control"
                   onChange={priceChanged.bind(null, index)} />
          </div>
        </td>
        <td>
          <input name="amount" value={amount}
                 className="form-control"
                 onChange={amountChanged.bind(null, index)} />
        </td>
        <td>${this.calculateTotal()}</td>
        <td>
          <button className="btn btn-danger">
            <span className="glyphicon glyphicon-trash"></span>
          </button>
        </td>
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

  totalPrice(price, amount) {
    let p = parseFloat(price);
    let a = parseFloat(amount);
    return ((isNaN(p) || isNaN(a)) ? 0 : p * a);
  }

  calculateTotal() {
    let { line_items } = this.state;
    return line_items.map(i => this.totalPrice(i.price, i.amount))
                     .reduce((pv, cv) => pv + cv, 0);
  }

  render() {
    return(
      <table className="table table-bordered table-hover">
        <tr>
          <th width="1%">Nr</th>
          <th width="50%">Name</th>
          <th width="20%">Price</th>
          <th width="10%">Amount</th>
          <th width="15%">Total</th>
          <th width="4%">Action</th>
        </tr>
        <LineItem index={0} price={this.state.line_items[0]['price']}
                  amount={this.state.line_items[0]['amount']}
                  priceChanged={this.priceChanged}
                  amountChanged={this.amountChanged} />
        <LineItem index={1} price={this.state.line_items[1]['price']}
                  amount={this.state.line_items[1]['amount']}
                  priceChanged={this.priceChanged}
                  amountChanged={this.amountChanged} />
        <tr>
          <td colSpan="4"></td>
          <th>${this.calculateTotal()}</th>
          <td>
            <button className="btn btn-success">
              <span className="glyphicon glyphicon-plus"></span>
            </button>
          </td>
        </tr>
      </table>
    );
  }
}

React.render(
  <InvoiceLineItems />,
  document.getElementById("invoice")
);
