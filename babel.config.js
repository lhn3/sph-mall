module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //使用按需引入插件
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
