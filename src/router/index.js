import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title:'Home'
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta:{
      title:'Blogs  '
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//to.meta.title => 위에 선언한 meta안에 title 즉 Home,Blogs를 가르킴
//Home으로 라우트하면 Home|FireBlog가 되고 Blogs로 라우팅을 하면 Blogs|FireBlog가됨
router.beforeEach((to ,from ,next) => {
  document.title = `${to.meta.title} | FireBlog`;
  next();
});

export default router;
