'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        primary: Boolean,
        secondary: Boolean,
        success: Boolean,
        info: Boolean,
        warning: Boolean,
        error: Boolean,
        color: String
    },
    mounted: function mounted() {},

    methods: {
        getContextClasses: function getContextClasses() {
            console.log(this);
            return { color: this.getColorProperty() };
        },
        getColorProperty: function getColorProperty() {

            if (this.color) {
                return this.color;
            } else if (this.primary) return 'primary';else if (this.secondary) return 'secondary';else if (this.success) return 'success';else if (this.info) return 'info';else if (this.warning) return 'warning';else if (this.error) return 'error';
        },
        removeContextProperties: function removeContextProperties(props) {

            var color = void 0;
            var ctx = ['primary', 'secondary', 'success', 'info', 'warning', 'error'];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = ctx[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var c = _step.value;

                    if (props[c]) color = c;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (color) props['color'] = color;

            delete props['primary'];
            delete props['secondary'];
            delete props['success'];
            delete props['info'];
            delete props['warning'];
            delete props['error'];
        }
    }
};