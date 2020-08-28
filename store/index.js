import decode from 'jwt-decode' //Para decodifiar 

export const state = () => ({
  
  usuario: null,
  token: null,
  //upload: null
})

export const mutations = {
  
  setToken(state, token){
    state.token = token;
  },

  setUsuario(state, usuario){
    state.usuario = usuario;
  }
}

export const actions = {

  guardarToken({commit}, token){
    commit("setToken", token)
    commit("setUsuario", decode(token))
    localStorage.setItem("token", token)
  },

  autoLogin({commit}){
    const token = localStorage.getItem("token");
    if(token) {
      commit("setToken", token);
      commit("setUsuario", decode(token));
    }else{
      commit("setToken", '')
    }
  },
  
  cerrarSesion({commit}){
    commit("setToken", null);
    commit("setUsuario", null);
    localStorage.removeItem("token");
    this.$router.push('/');
  }
}