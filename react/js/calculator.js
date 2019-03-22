class Button extends React.Component {
  render() {
    const {
      value,
      type,
      updateCalculator
    } = this.props;
    
    function doSomething(event) {
      updateCalculator(type == "number" ? parseInt(value) : value, type)
    }


    return (
      <button
        type="button"
        className={`button ${type}`}
        onClick={doSomething}>
        { value }
      </button>
    );
  }
}

/* 
ADD REACT CODE HERE 
*/
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      operation: null
    }
  }

  performOperation(a, b, operation) {
    console.log(operation)
    console.log(a)
    console.log(b)

    switch(operation) {
      case "+":
        return a + b;
      default:
        alert("Unrecognized Operation: '" + operation + "' has not been implemented")
        return 0;
    }
  }      

  updateCalculator = (value, type) => {
    const {
      result,
      operation
    } = this.state;
    console.log(value)
    console.log(type)

    if (type == "number") {
      if(operation == null) {
        value = result * 10 + value
      } else {
        value = this.performOperation(result, value, operation);
      }
      this.setState({result: value});
      this.setState({operation: null});
    }

    if (type == "operation") {
      this.setState({operation: value});
    }

  }

  render() {
    return (
      <div className="calculator">
        <div className="display">
          <p>{this.state.result}</p>
        </div>
        <div className="button_pad">
          <Button value="7" updateCalculator={this.updateCalculator} type="number" />
          <Button value="8" updateCalculator={this.updateCalculator} type="number" />
          <Button value="9" updateCalculator={this.updateCalculator} type="number" />
          <Button value="+" updateCalculator={this.updateCalculator} type="operation" />
          <Button value="4" updateCalculator={this.updateCalculator} type="number" />
          <Button value="5" updateCalculator={this.updateCalculator} type="number" />
          <Button value="6" updateCalculator={this.updateCalculator} type="number" />
          <Button value="-" updateCalculator={this.updateCalculator} type="operation" />
          <Button value="1" updateCalculator={this.updateCalculator} type="number" />
          <Button value="2" updateCalculator={this.updateCalculator} type="number" />
          <Button value="3" updateCalculator={this.updateCalculator} type="number" />
          <Button value="*" updateCalculator={this.updateCalculator} type="operation" />
          <Button value="0" updateCalculator={this.updateCalculator} type="number" />
          <Button value="=" updateCalculator={this.updateCalculator} type="operation" />
          <Button value="C" updateCalculator={this.updateCalculator} type="operation" />
          <Button value="/" updateCalculator={this.updateCalculator} type="operation" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById("calculator")
);
