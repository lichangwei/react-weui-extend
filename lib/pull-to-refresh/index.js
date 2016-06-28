'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isTouchSupported = 'ontouchstart' in document.documentElement;

var utils = {
    events: {
        start: isTouchSupported ? 'touchstart' : 'mousedown',
        move: isTouchSupported ? 'touchmove' : 'mousemove',
        end: isTouchSupported ? 'touchend' : 'mouseup'
    },

    getTouchPositionY: function getTouchPositionY(e) {
        return e.pageY || e.clientY || (e.touches && e.touches[0] ? e.touches[0].pageY : 0);
    }
};

var _default = (_temp2 = _class = function (_React$Component) {
    (0, _inherits3.default)(_default, _React$Component);

    function _default() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, _default);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(_default)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
            status: '',
            startY: 0,
            diffY: 0,
            style: {}
        }, _this.onTouchStart = function (e) {
            //忽略右键点击事件，方便桌面浏览器调试
            if (e.button === 2) return;
            if (_this.props.disabled) return;
            if (_this.state.status === 'loading') return;
            _this.startY = utils.getTouchPositionY(e);
            _this.diffY = 0;

            document.addEventListener(utils.events.move, _this.onTouchMove);
            document.addEventListener(utils.events.end, _this.onTouchEnd);
        }, _this.onTouchMove = function (e) {
            if (_this.props.disabled) return;
            if (_this.state.status === 'loading') return;
            if (!_this.startY) return;
            _this.diffY = Math.abs(_this.startY - utils.getTouchPositionY(e));
            if (_this.diffY < 0) return;
            e.preventDefault();
            e.stopPropagation();
            //阻力
            _this.diffY = Math.pow(_this.diffY, 0.8);

            _this.setState({
                style: {
                    'WebkitTransform': 'translate3d(0, ' + _this.diffY + 'px, 0)',
                    'transform': 'translate3d(0, ' + _this.diffY + 'px, 0)',
                    'WebkitTransitionDuration': '0s',
                    'transitionDuration': '0s'
                },
                status: _this.diffY < _this.props.distance ? 'pull-down' : 'pull-up'
            });
        }, _this.onTouchEnd = function () {
            document.removeEventListener(utils.events.move, _this.onTouchMove);
            document.removeEventListener(utils.events.end, _this.onTouchEnd);
            if (_this.props.disabled) return;
            _this.startY = 0;
            if (_this.diffY <= 0 || _this.state.status === 'loading') return;
            var status = null;
            if (_this.diffY < _this.props.distance) {
                status = '';
            } else {
                status = 'loading';
                var callback = function callback() {
                    _this.setState({ status: '' });
                };
                _this.props.onRefresh(callback, callback);
            }
            _this.setState({
                style: {
                    'WebkitTransform': '',
                    'transform': '',
                    'WebkitTransitionDuration': '',
                    'transitionDuration': ''
                },
                status: status
            });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(_default, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.refs.container.addEventListener(utils.events.start, this.onTouchStart);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.refs.container.removeEventListener(utils.events.start, this.onTouchStart);
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.disabled) {
                return _react2.default.createElement(
                    'div',
                    null,
                    this.props.children
                );
            }
            return _react2.default.createElement(
                'div',
                { className: 'weui-pull-to-refresh ' + this.state.status, style: this.state.style, ref: 'container' },
                _react2.default.createElement(
                    'div',
                    { className: 'p2r-layer' },
                    _react2.default.createElement('div', { className: 'p2r-arrow' }),
                    _react2.default.createElement('div', { className: 'p2r-loading' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'p2r-down' },
                        this.props.textDown
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'p2r-up' },
                        this.props.textUp
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'p2r-refresh' },
                        this.props.textRefresh
                    )
                ),
                this.props.children
            );
        }
    }]);
    return _default;
}(_react2.default.Component), _class.propTypes = {
    onRefresh: _react.PropTypes.func.isRequired,
    distance: _react.PropTypes.number,
    disabled: _react.PropTypes.bool,
    textDown: _react.PropTypes.string,
    textUp: _react.PropTypes.string,
    textRefresh: _react.PropTypes.string
}, _class.defaultProps = {
    distance: 50,
    disabled: false,
    textDown: '下拉刷新',
    textUp: '释放刷新',
    textRefresh: '正在刷新...'
}, _temp2);

exports.default = _default;
;