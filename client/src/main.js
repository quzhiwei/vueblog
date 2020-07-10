import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Button,message,Pagination} from "ant-design-vue";
Vue.component(Button.name, Button,message,message.name,Pagination)
Vue.use(Pagination)
Vue.prototype.$message = message;
Vue.use(message)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
