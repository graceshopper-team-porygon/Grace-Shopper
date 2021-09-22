import React from "react";

export class AddProduct extends React.Component {
  render() {
    // constructor() {
    //   super();
    //   this.state = {
    //     name: "",
    //     me: "",
    //     email: "",
    //     gpa: "",
    //   };
    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    // }

    return (
      <div>
        <form onSubmit={() => console.log("button clicked")}>
          <div>
            <label htmlFor="product_name">
              <small>Product Name</small>
            </label>
            <input name="name" type="text" />
          </div>
          <div>
            <label>
              <small>Price</small>
            </label>
            <input name="price" />
          </div>
          <div>
            <label>
              <small>Quantity</small>
            </label>
            <input name="quantity" />
          </div>
          <div>
            <label>
              <small>Description</small>
            </label>
            <textarea name="description" rows="4" cols="40" />
          </div>
          <div>
            <button type="submit">Add Product</button>
          </div>
        </form>
      </div>
    );
  }
}
