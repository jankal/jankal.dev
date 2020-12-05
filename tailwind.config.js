module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'lg-white':
          '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code::before': {
              content: ''
            },
            'code::after': {
              content: ''
            },
            code: {
              fontWeight: '400',
              backgroundColor: theme('colors.gray.100'),
              padding: theme('padding.1'),
              borderWidth: 1,
              borderColor: theme('colors.gray.200'),
              borderRadius: theme('borderRadius.DEFAULT')
            }
          }
        },
        dark: {
          css: {
            code: {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.gray.800'),
              borderWidth: 0
            }
          }
        }
      })
    }
  },
  variants: {
    extend: {
      boxShadow: ['dark'],
      margin: ['last'],
      typography: ['dark']
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
