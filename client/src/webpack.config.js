module.exports= {
  entry:"./src/main.js",
  // 在出口定义时，我们不能简单的定义 output:"./dist/bundle.js" 而是在使用一个对象来绑定路径和文件名
  output:{
    //路径名（需要是一个绝对路径，不能是一个相对路径）
    // resolve可以取2个路径并将他们合在一起
    path:path.resolve(__dirname,"dist"),
    filename:"bundle.js",
    // 在此处加入publicPath 至 dist folder 这样以后的url的文件,都会在前面拼接上这个文件名
    publicPath: "dist/"
  },
  module: {
    rules: [
      {
        //  /\.css是指对css文件进行use
        test: /\.css$/i,
        // css-loader只负责对css文件进行加载 并不负责进行渲染
        use: [ 'style-loader','css-loader'],
        // style-loader对css 文件进行解析 并渲染
      // 使用多个loader是时，顺序时从右到左的
      },
      {
        test: /\.less$/,
        loader: `style!css?${cssLoaderWithoutModule}!postcss!less?${lessLoader}`,
        include: [
          path.resolve(__dirname, 'node_modules'),
        ],
      },
    ],
  },
}