module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        'black-opacity': 'rgba(0, 0, 0, 0.75)'
      }),
      borderWidth: {
        '1': '1px'
      },
      spacing: {
        '200px': '200px',
      }
    },
  },
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
    },
  },
  plugins: [],
}
