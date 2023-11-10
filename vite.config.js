import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        success: resolve(__dirname, 'src/checkout/success.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
        productListPage: resolve(__dirname, 'src/product-list/index.html'),
        login: resolve(__dirname, 'src/login/index.html'),
        signup: resolve(__dirname, 'src/signup/index.html'),
        orders: resolve(__dirname, 'src/orders/index.html'),
        search: resolve(__dirname, 'src/search-results/index.html'),
      },
    },
  },
});
