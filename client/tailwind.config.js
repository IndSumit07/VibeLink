export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
      '0%': { opacity: 0, transform: 'translateY(20px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' },
    },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
         fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        float1: 'floatSlow 8s ease-in-out infinite',
        float2: 'floatSlow 10s ease-in-out infinite',
        float3: 'floatSlow 12s ease-in-out infinite',
        float4: 'floatSlow 9s ease-in-out infinite',
        float5: 'floatSlow 11s ease-in-out infinite',
        floatIcon: 'float 3s ease-in-out infinite',
        fadeUp: "fadeUp 0.8s ease-out forwards",

    fadeIn: 'fadeIn 0.6s ease-out',
      },
      colors: {
      gold: {
        light: "#fff9e6",
        DEFAULT: "#f5deb3",
        dark: "#a2783a",
      }
    }
    },
  },
  plugins: [],
};
