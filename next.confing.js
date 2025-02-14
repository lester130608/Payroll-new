// filepath: /Users/damarysclement/payroll/payroll-new/next.config.js

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};