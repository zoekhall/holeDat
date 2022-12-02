import path from 'path';

module.exports = {
     entry: './client/src/index.tsx',
     mode: 'development',
     module: {
          rules: [
               {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
               },
               {
                    test: /\.css?$/,
                    use: 'types/styled-components',
                    exclude: /node_modules/
               }
          ],
     },
     resolve: {
          extensions: ['.tsx', '.ts', '.js'],
     },
     output: {
          filename: 'bundle.js',
          path: path.resolve(__dirname, 'client', 'dist'),
     },
};
