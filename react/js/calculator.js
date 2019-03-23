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
      display: 0,
      a: null,
      b: null,
      operation: null
    }
  }

  performOperation(a, b, operation) {

    switch(operation) {
      case "+": 
        return a + b;
      default:
        alert("Unrecognized Operation: '" + operation + "' has not been implemented")
        return 0;
    }
  }      

  resetCalculator = () => {
    this.setState({
      display: 0,
      a: null,
      b: null,
      operation: null
    });
  }

  updateCalculator = (value, type) => {
    const {
      display,
      a,
      b,
      operation
    } = this.state;

    if (type == "number") {
      this.setState({display: value});
      //if a has not been set, set a. else set b
      if (a == null) {
        this.setState({a: value});
      } else {
        this.setState({b: value});
      }
    }

    if (type == "operation") {
      if (a != null) {
        //if b is also available, update the display
        if (b != null) {
          this.setState({
            display: this.performOperation(a, b, operation),
            a: this.performOperation(a, b, operation)
          });
        }
        this.setState({operation: value});
      } else {
        this.resetCalculator();
      }
    }

  }

  render() {
    return (
      <div className="calculator">
        <div className="display">
          <p>{this.state.display}</p>
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
