const products = require('./product');
const stores = require('./stores');
const login = require('./login');
const logout = require('./logout');
const register = require('./register');
const payments = require('./payments');

module.exports = {
  login,
  logout,
  register,
  products,
  stores,
  payments
}