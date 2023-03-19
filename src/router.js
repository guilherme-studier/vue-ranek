import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";

const Home = defineAsyncComponent(() => import("./views/Home.vue"));
const Produto = defineAsyncComponent(() => import("./views/Produto.vue"));
const Login = defineAsyncComponent(() => import("./views/Login.vue"));
const Usuario = defineAsyncComponent(() => import("./views/usuario/Usuario.vue"));
const UsuarioProdutos = defineAsyncComponent(() => import("./views/usuario/UsuarioProdutos.vue"));
const UsuarioVendas = defineAsyncComponent(() => import("./views/usuario/UsuarioVendas.vue"));
const UsuarioCompras = defineAsyncComponent(() => import("./views/usuario/UsuarioCompras.vue"));
const UsuarioEditar = defineAsyncComponent(() => import("./views/usuario/UsuarioEditar.vue"));
const PaginaNaoEncontrada = defineAsyncComponent(() => import("./views/PaginaNaoEncontrada.vue"));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: PaginaNaoEncontrada
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/produto/:id",
      name: "produto",
      component: Produto,
      props: true
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/usuario",
      component: Usuario,
      meta: {
        login: true
      },
      children: [
        {
          path: "",
          name: "usuario",
          component: UsuarioProdutos
        },
        {
          path: "compras",
          name: "compras",
          component: UsuarioCompras
        },
        {
          path: "vendas",
          name: "vendas",
          component: UsuarioVendas
        },
        {
          path: "editar",
          name: "usuario-editar",
          component: UsuarioEditar
        }
      ]
    }
  ],
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    if (!window.localStorage.token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
