<template>
  <div class="container">
    <nav>
      <h1 class="appName">Project Geo</h1>
      <div v-if="visible" class="userDetails">
        <span id="username">{{ username }}</span>
        <div class="userOptions">
          <button @click.prevent="doLogout" class="logout">Logout</button>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "MainComponents",
  data() {
    return {
      username: localStorage.getItem("loginToken") || "",
    };
  },
  updated() {
    this.username = localStorage.getItem("loginToken");
  },
  created() {
    this.$store.dispatch("loadToken");
  },
  methods: {
    doLogout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    ...mapState(["visible"]),
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@200&family=Montserrat:wght@200&display=swap");
* {
  font-family: "Inter", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
.container {
  width: 100%;
  height: 100%;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding-inline: 30px;
    text-align: right;
    position: sticky;
    top: 0;
    z-index: 999;

    .appName {
      text-transform: uppercase;
    }
    .userDetails {
      position: relative;
      z-index: 9999;
      #username {
        margin-inline: 1rem;
        font-size: 16px;
      }
      &:hover > .userOptions,
      &:focus > .userOptions {
        display: flex;
        justify-content: center;
      }
      .userOptions {
        position: absolute;
        border: 1px solid black;
        width: clamp(4rem, 7rem, 7rem);
        right: 10px;
        top: 1.2rem;
        background: white;
        display: none;
        .logout {
          cursor: pointer;
          height: clamp(1rem, 2rem, 3rem);
          width: clamp(3rem, 5rem, 8rem);
          background: linear-gradient(125deg, hotpink, rgb(42, 175, 216));
          background: -moz-linear-gradient(125deg, hotpink, rgb(42, 175, 216));
          background-clip: text;
          color: transparent;
          border-radius: 2rem;
          padding: 0.3rem;
          &:hover {
            box-shadow: 0px 0px 0.5rem #000;
          }
        }
      }
    }
  }
  .routerView {
    z-index: -1;
  }
}
</style>
