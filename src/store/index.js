import { createStore } from "vuex";
import router from "@/router";

export default createStore({
  state: {
    token: "",
    visible: false,
    currUser: "",
    onCreateMode: false,
    pathLocation: [],
    locations: [],
    isPathMarkerVisible: false,
    mapZoom: 12,
  },
  getters: {
    storeToken(state) {
      return state.token;
    },
  },
  mutations: {
    updateToken(state, val) {
      state.token = val;
      localStorage.setItem("loginToken", state.token);
    },
    setZoom(state, zoomLevel) {
      state.mapZoom = zoomLevel;
    },
    updateVisible(state, val) {
      state.visible = val;
    },
    setCreateMode(state, val) {
      state.onCreateMode = val;
    },
    setLocations(state, val) {
      state.locations = val;
    },
    setPathLoc(state, val) {
      state.pathLocation = val;
    },
    setMarkerVisibility(state, value) {
      state.isPathMarkerVisible = value;
    },
  },
  actions: {
    login(context) {
      router.push("/map");
      context.commit("updateVisible", true);
    },
    logout(context) {
      context.commit("updateToken", "");
      router.push("/");
      context.commit("updateVisible", false);
    },
    loadToken(context) {
      const newToken = localStorage.getItem("loginToken");
      newToken && context.commit("updateVisible", true);
      newToken && context.commit("updateToken", newToken);
    },
  },
  modules: {},
});
