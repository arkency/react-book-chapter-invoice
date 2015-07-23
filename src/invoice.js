class LineItem extends React.Component {
  render() {
    return(<div>Line Item {this.props.number}</div>);
  }
}

class InvoiceLineItems extends React.Component {
  render() {
    return(
      <div>
        <LineItem number="1" />
        <LineItem number="2" />
      </div>
    );
  }
}

React.render(
  <InvoiceLineItems />,
  document.getElementById("invoice")
);
