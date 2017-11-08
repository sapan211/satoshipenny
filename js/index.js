"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BitcoinPrice = function (_React$Component) {
  _inherits(BitcoinPrice, _React$Component);

  function BitcoinPrice(props) {
    _classCallCheck(this, BitcoinPrice);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      price: "0",
      loading: true

    };
    return _this;
  }

  BitcoinPrice.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    $.getJSON("https://api.coinbase.com/v2/prices/spot?currency=USD", function (data) {
      //console.log(data.data.amount);   
      _this2.setState({
        price: (100000000 / data.data.amount).toFixed(0),
        loading: false
      });
    });
  };

  BitcoinPrice.prototype.render = function render() {
    var _state = this.state;
    var loading = _state.loading;
    var price = _state.price;

    return loading === true ? React.createElement(
      "div",
      null,
      "one moment please..."
    ) : React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "price" },
        React.createElement(
          "span",
          null,
          "$0.01"
        ),
        React.createElement("i", { className: "glyphicon glyphicon-transfer icon" }),
        React.createElement(
          "span",
          null,
          price,
          " Satoshi"
        ),
        React.createElement("i", { className: "glyphicon glyphicon-xbt icon" })
      )
    );
  };

  return BitcoinPrice;
}(React.Component);

;

var PriceChart = function (_React$Component2) {
  _inherits(PriceChart, _React$Component2);

  function PriceChart(props) {
    _classCallCheck(this, PriceChart);

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this3.state = {
      data: [],
      loading: true
    };
    return _this3;
  }

  PriceChart.prototype.componentWillMount = function componentWillMount() {
    var _this4 = this;

    fetch("https://api.coinbase.com/v2/prices/historic?days=30").then(function (response) {
      return response.json();
    }).then(function (data) {
      return _this4.setState({ data: data.data.prices, loading: false });
    });
  };

  PriceChart.prototype.getTitle = function getTitle(e) {
    return "Price: " + e.price + "\nDate: " + e.time.substring(0, 9);
  };

  PriceChart.prototype.getMax = function getMax(data) {
    return data.reduce(function (max, val) {
      return Math.max(max, parseFloat(val.price));
    }, 0);
  };

  PriceChart.prototype.getMin = function getMin(data) {
    return data.reduce(function (min, val) {
      return Math.min(min, parseFloat(val.price));
    }, 0);
  };

  PriceChart.prototype.render = function render() {
    var _this5 = this;

    var _state2 = this.state;
    var loading = _state2.loading;
    var data = _state2.data;

    var max = this.getMax(data);
    var min = this.getMin(data);
    var offset = min + 200;
    return loading === true ? React.createElement(
      "div",
      null,
      "loading"
    ) : React.createElement(
      "div",
      {
        className: "chart"
      },
      data.reverse().map(function (e, idx) {
        return React.createElement("div", {
          className: "bar",
          title: _this5.getTitle(e),
          style: { height: parseFloat(e.price) / max * 100 + "%" } });
      })
    );
  };

  return PriceChart;
}(React.Component);

;

ReactDOM.render(React.createElement(
  "div",
  { className: "main" },
  React.createElement(BitcoinPrice, null),
  React.createElement(PriceChart, null)
), document.getElementById("app"));