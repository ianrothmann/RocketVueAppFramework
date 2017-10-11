'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    computed: {
        validationErrors: function validationErrors() {
            if (this.$el && this.$el.dataset && this.$el.dataset.vvScope) {
                var scope = this.$el.dataset.vvScope;
                return this.verrors.has(this.name, scope) ? [this.verrors.first(this.name, scope)] : [];
            } else {
                return this.verrors.has(this.name) ? [this.verrors.first(this.name)] : [];
            }
        },
        validationError: function validationError() {
            if (this.$el && this.$el.dataset && this.$el.dataset.vvScope) {
                var scope = this.$el.dataset.vvScope;
                return this.verrors.has(this.name, scope) ? this.verrors.first(this.name, scope) : '';
            } else {
                return this.verrors.has(this.name) ? this.verrors.first(this.name) : '';
            }
        }
    }
};