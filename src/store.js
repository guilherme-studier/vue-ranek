import { createStore } from "vuex";
import { api } from "@/services.js";

export default createStore({
  state() {
    return {
      login: false,
      usuario: {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
      },
      usuario_produtos: null
    };
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshift(payload);
    }
  },
  actions: {
    async getUsuarioProdutos(context) {
      const response = await api.get(`/produto?usuario_id=${context.state.usuario.id}`);
      context.commit("UPDATE_USUARIO_PRODUTOS", response.data);
    },
    async getUsuario(context) {
      const response = await api.get(`/usuario`);
      context.commit("UPDATE_USUARIO", response.data);
      context.commit("UPDATE_LOGIN", true);
    },
    async criarUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", { id: payload.email });
      await api.post("/usuario", payload);
    },
    async logarUsuario(context, payload) {
      const response = await api.login({
        username: payload.email,
        password: payload.senha
      });
      window.localStorage.token = `Bearer ${response.data.token}`;
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
      });
      window.localStorage.removeItem("token");
      context.commit("UPDATE_LOGIN", false);
    }
  },
  strict: true
});
