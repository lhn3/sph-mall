module.exports = {
//关闭eslint
  lintOnSave: false,

//  跨域代理
  devServer:{
    proxy:{
      '/api':{
        target:'http://39.98.123.211'
      }
    }
  }
}