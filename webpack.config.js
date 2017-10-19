'use strict';
var webpack = require('webpack');
process.traceDeprecation = true;
var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './js/app.js',
  },
  output: {
    path: __dirname + '../../lms/wp-content/themes/twentyseventeen-child/', // `dist` is the destination
    filename: 'app.min.js',
    publicPath: "../../lms/wp-content/themes/twentyseventeen-child/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/, //Check for all js files
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015', 'stage-0'],
		  			plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
					},
        }]
      },
      {
        test: /\.(sass|scss|css)$/, //Check for sass or scss file names
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      { 
        test: /\.json$/, 
        loader: "json-loader"  //JSON loader
      }
    ]
  },
  
  //To run development server
  devServer: {
    contentBase: __dirname + '/prod',
  },
  devtool: "eval-source-map" // Default development sourcemap
};

// Check if build is running in production mode, then change the sourcemap type
if (process.env.NODE_ENV === "production") {
  config.devtool = "source-map";
	plugins: [
 	   new webpack.optimize.DedupePlugin(),
 	   new webpack.optimize.OccurrenceOrderPlugin(),
 	   new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
  // Can do more here
  // JSUglify plugin
  // Offline plugin
  // Bundle styles seperatly using plugins etc,
}
module.exports = config;