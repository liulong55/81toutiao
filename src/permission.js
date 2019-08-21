import router from './router'
// 全局导航,前置守卫
router.beforeEach(function (to, from, next) {
  // 如果以home起始,就认为进行需要检查token的区域
  if (to.path.startsWith('/home')) {
    // 获取前端的token
    let result = window.localStorage.getItem('user-onfo')
    if (result) {
      let userINF = JSON.parse(result) // 将储存的字符串转为对象
      if (userINF && userINF.token) {
        // 满足有token,放行
        next()
      } else {
        next('/login') // 跳转到login
      }
    } else {
      next('/login') // 跳转到login
    }
  } else {
    next() // 如果访问的不是/home开头的直接放行
  }
})
export default router // 导出router 然后再入口那跟换一下router的引入文件
