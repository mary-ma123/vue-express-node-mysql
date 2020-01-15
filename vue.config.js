const webpack = require("webpack");
module.exports = {
	/* 部署应用包的基本URL */
	/* baseUrl 从 Vue CLI 3.3 起已弃用 ，请使用publicPath */
	//  baseUrl: process.env.NODE_ENV === "production" ? "./" : "./",
	publicPath: process.env.NODE_ENV === "production" ? "./" : "./",

	/* 生产环境构建文件的目录 defalut: dist */
	outputDir: "dist",

	/* 放置生成的静态文件目录（js css img） */
	assetsDir: "static",

	/* 指定生成的index.html 输出路径 相对 default: index.html */
	indexPath: "index.html",

	/* 指定生成文件名中包含hash default: true */
	filenameHashing: true,

	/* 多页模式下 */
	/* pages: {

	  index: {

	    // page 的入口

	    entry: "src/index/main.js",

	    // 模板来源

	    template: "public/index.html",

	    // 在 dist/index.html 的输出

	    filename: "index.html",

	    // 当使用 title 选项时，

	    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>

	    // title: "Index Page",

	    // 在这个页面中包含的块，默认情况下会包含

	    // 提取出来的通用 chunk 和 vendor chunk。

	    chunks: ["chunk-vendors", "chunk-common", "index"]

	  },

	  // 当使用只有入口的字符串格式时，

	  // 模板会被推导为 `public/subpage.html`

	  // 并且如果找不到的话，就回退到 `public/index.html`。

	  // 输出文件名会被推导为 `subpage.html`。

	  // subpage: "src/subpage/main.js"

	} */

	/* 是否保存时 lint 代码 */
	lintOnSave: process.env.NODE_ENV === "production",

	/* 是否使用编译器 default: false */
	runtimeCompiler: false,
	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'components': '@/components',
				'views': '@/views',
			}
		}
	},
	/* 默认babel-loader会忽略node_modules中的文件，你想显示的话在这个选项中列出来 */
	// transpileDependencies: [],
	/* 生产环境的source map */
	productionSourceMap: true,
	// crossorigin: "",
	integrity: false,
	// css相关配置
	css: {
		modules: false, //Default: false, 设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
		sourceMap: false //Default: false, 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
		// extract: false, //Default: 生产环境下是 true，开发环境下是 false.是否将组件中的 CSS 提取至一个独立的 CSS 文件中
		// loaderOptions: {} //Default: {}, 向 CSS 相关的 loader 传递选项
	},
	devServer: {
		port: 8090,
		host: "localhost",
		https: false,
		// 自动启动浏览器
		open: false,
		//以上的ip和端口是我们本机的;下面为需要跨域的
		proxy: {
			"/api": {
				//代理路径 例如 https://baidu.com
				target: "http://localhost:3036/api/",
				// 将主机标头的原点更改为目标URL
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					"^/api": ""
				}
			}
		}
	}

};

//module.exports = {
//	/* 部署应用包的基本URL */
//	/* baseUrl 从 Vue CLI 3.3 起已弃用 ，请使用publicPath */
//	//  baseUrl: process.env.NODE_ENV === "production" ? "./" : "./",
//	publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
//	//publicPath: "./", //1.默认为 "/":部署在一个域名的根路径上  ; 2. "./":所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径
//	outputDir: "dist", //默认为 "dist",指打包后的资源放置的路径，放在dist文件夹下
//	assetsDir: "static", //默认为:'' ,放置打包后生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
//	indexPath: "index.html", //Default: 'index.html' ,指定生成的 index.html 的输出路径 (相对于 outputDir)
//	filenameHashing: true, //Default: true ,生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
//	// pages:undefined,//在 multi-page 模式下构建应用
//	lintOnSave: true, //Type: boolean|'error';Default: true; true:将 lint 错误输出为编译警告;'error':错误输出会导致编译失败
//	runtimeCompiler: false, //Default: false, 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右
//	// transpileDependencies:[],//Default: [], 默认情况下 babel-loader 会忽略所有 node_modules 中的文件
//	productionSourceMap: false, //Default: true, 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
//	// crossorigin: undefined, //Default: undefined, 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
//	// integrity: false, //Default: false,在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity
//	// configureWebpack:{},//Type: Object | Function ;修改最终的配置，可以模拟服务器接口：https://blog.csdn.net/bamboozjy/article/details/90692454
//	// chainWebpack:function(){},//允许对内部的 webpack 配置进行更细粒度的修改。
//	css: {
//		modules: false, //Default: false, 设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
//		sourceMap: false //Default: false, 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
//		// extract: false, //Default: 生产环境下是 true，开发环境下是 false.是否将组件中的 CSS 提取至一个独立的 CSS 文件中
//		// loaderOptions: {} //Default: {}, 向 CSS 相关的 loader 传递选项
//	},
//	devServer: {
//		open: true,
//		host: 'localhost',
//		port: 8088,
//		https: false,
//		//以上的ip和端口是我们本机的;下面为需要跨域的
//		proxy: { //配置跨域
//			'/api': {
//				target: 'http://api.xxx.com/api/', //这里后台的地址模拟的;应该填写你们真实的后台接口
//				ws: true,
//				changOrigin: true, //允许跨域
//				pathRewrite: {
//					'^/api': '' //请求的时候使用这个api就可以，/api表示http://api.xxx.com/api/
//				}
//			}
//
//		}
//	},
//	// 第三方插件的选项
//	pluginOptions: {}
//};