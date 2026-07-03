/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        hub: {
          950: '#060B16', // near-black slate backdrop
          900: '#0B1120', // primary dark surface
          800: '#111A2E', // card surface on dark
          700: '#1C2740', // border on dark
          600: '#2D3B59',
          500: '#C7D3E8',
          teal: {
            DEFAULT: '#0D9488',
            light: '#2DD4BF',
            dark: '#0F766E',
          },
          gold: '#D4A72C',
        },
        // Category color-coding system (the design signature)
        cat: {
          hardware: '#E4572E',   // Physical Infrastructure - burnt orange (heat/hardware)
          os: '#3B6E8F',         // Operating Systems - steel blue
          network: '#0D9488',    // Connectivity - teal (signal)
          software: '#7C5CBF',   // Software & Code - violet
          security: '#C23B4E',   // Security & Identity - alert red
          workload: '#D4A72C',   // Specialized Workloads - gold
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(6, 11, 22, 0.06), 0 1px 3px 0 rgba(6, 11, 22, 0.08)',
      },
    },
  },
  plugins: [],
};
