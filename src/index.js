import "bootstrap/dist/css/bootstrap.css";

import React, { useState } from "react";
import ReactDOM from "react-dom";

function LineItem(props) {
  function calculateTotal() {
    let { price, amount } = props;
    let p = parseFloat(price);
    let a = parseFloat(amount);
    return isNaN(p) || isNaN(a) ? 0 : p * a;
  }

  function number() {
    return parseInt(props.index) + 1;
  }

  const {
    index,
    price,
    priceChanged,
    amount,
    amountChanged,
    deleteLineItem
  } = props;

  return (
    <tr>
      <td>
        {number()}.
      </td>
      <td>
        <input name="title" className="form-control" />
      </td>
      <td>
        <div className="input-group">
          <div className="input-group-addon">$</div>
          <input
            name="price"
            value={price}
            className="form-control"
            onChange={priceChanged.bind(null, index)}
          />
        </div>
      </td>
      <td>
        <input
          name="amount"
          value={amount}
          className="form-control"
          onChange={amountChanged.bind(null, index)}
        />
      </td>
      <td>
        <h4>
          ${calculateTotal()}
        </h4>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={deleteLineItem.bind(null, index)}
        >
          <span className="glyphicon glyphicon-trash" />
        </button>
      </td>
    </tr>
  );
}

function InvoiceLineItems(props) {
  const [lineItems, updateLineItems] = useState([{ price: "", amount: "" }])


  function changePrice(itemIndex, event) {
    const price = event.target.value;
    const updatedItems = lineItems.map((item, index) => {
      if (index !== itemIndex) { return item }
      return {...item, price}
    })
    updateLineItems(updatedItems);
  }

  function changeAmount(itemIndex, event) {
    const amount = event.target.value;
    const updatedItems = lineItems.map((item, index) => {
      if (index !== itemIndex) { return item }
      return {...item, amount}
    })
    updateLineItems(updatedItems);
  }

  function addLineItem(event) {
    const newItem = { price: "", amount: "" };
    const updatedItems = lineItems.concat(newItem);
    updateLineItems(updatedItems);
  }

  function deleteLineItem(index, event) {
    const updatedItems = lineItems.filter((_, i) => index !== i);
    updateLineItems(updatedItems);
  }

  function totalPrice(price, amount) {
    const p = parseFloat(price);
    const a = parseFloat(amount);
    return isNaN(p) || isNaN(a) ? 0 : p * a;
  }

  function calculateTotal() {
    return lineItems
      .map(i => totalPrice(i.price, i.amount))
      .reduce((pv, cv) => pv + cv, 0);
  }

  function tableHeader() {
    return (
      <thead>
        <tr>
          <th width="1%">Nr</th>
          <th width="55%">Name</th>
          <th width="20%">Price</th>
          <th width="10%">Amount</th>
          <th width="10%">Total</th>
          <th width="4%">Action</th>
        </tr>
      </thead>
    );
  }

  function tableFooter() {
    return (
      <tfoot>
        <tr>
          <td colSpan="4" />
          <th>
            <h4>
              ${calculateTotal()}
            </h4>
          </th>
          <td>
            <button className="btn btn-success" onClick={addLineItem}>
              <span className="glyphicon glyphicon-plus" />
            </button>
          </td>
        </tr>
      </tfoot>
    );
  }

  return (
    <table className="table table-bordered table-hover">
      {tableHeader()}
      <tbody>
        {lineItems.map((item, index) => (
          <LineItem
            key={`item-${index}`}
            index={index}
            price={item.price}
            amount={item.amount}
            priceChanged={changePrice}
            amountChanged={changeAmount}
            deleteLineItem={deleteLineItem}
          />
        ))}
      </tbody>
      {tableFooter()}
    </table>
  );
}

ReactDOM.render(<InvoiceLineItems />, document.getElementById("root"));
