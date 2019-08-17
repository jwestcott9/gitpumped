import React, { Component } from "react";
// import { MDBSelect } from "mdbreact";

class SelectPage extends Component {
  state = {
    options: [
      {
        text: "Option 1",
        value: "1"
      },
      {
        text: "Option 2",
        value: "2"
      },
      {
        text: "Option 3",
        value: "3"
      },
      {
        text: "Option 4",
        value: "4"
      },
      {
        text: "Option 5",
        value: "5"
      }
    ]
  };

  /* <Label for = "foodAllergies">Any Food Allergies?</Label>
              <Input type="radio" value = "Milk" onChange={props.handleInputChange} name="goals" />{' '}
              Milk
              <Input type="radio" value = "Eggs" onChange={props.handleInputChange} name="goals" />{' '}
              Eggs
              <Input type="radio" value = "Tree Nuts" onChange={props.handleInputChange} name="goals" />{' '}
              Tree Nuts
              <Input type="radio" value = "Peanuts" onChange={props.handleInputChange} name="goals" />{' '}
              Peanuts
              <Input type="radio" value = "Shellfish" onChange={props.handleInputChange} name="goals" />{' '}
              Shellfish
              <Input type="radio" value = "Wheat" onChange={props.handleInputChange} name="goals" />{' '}
              Wheat
              <Input type="radio" value = "Soy" onChange={props.handleInputChange} name="goals" />{' '}
              Soy
              <Input type="radio" value = "Fish" onChange={props.handleInputChange} name="goals" />{' '}
              Fish
              <Input type="radio" value = "Raw Fruits and Vegetables" onChange={props.handleInputChange} name="goals" />{' '}
              Raw Fruits and Vegetables
              <Input type="radio" value = "SunflowerSeeds" onChange={props.handleInputChange} name="goals" />{' '}
              Sunflower Seeds */

  render() {
    return (
      <div>
        {/* <MDBSelect
          multiple
          options={this.state.options}
          selected="Choose your option"
          selectAll
        /> */}
      </div>
    );
  }
}

export default SelectPage;