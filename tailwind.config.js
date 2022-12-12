module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],

  theme: {
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '800px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1082px',
        // => @media (min-width: 1024px) { ... }
          
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1500px',
        // => @media (min-width: 1536px) { ... }
      },
  },
 
}