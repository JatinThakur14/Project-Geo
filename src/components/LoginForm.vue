<template>
  <div class="card">
    <div class="header">
      <h1
        @click="
          () => {
            inLoginForm = true;
            error = false;
            username = ``;
            password = ``;
          }
        "
      >
        LOGIN
      </h1>
      <h1
        @click="
          () => {
            inLoginForm = false;
            error = false;
            username = ``;
            password = ``;
          }
        "
      >
        SIGNUP
      </h1>
    </div>
    <h3 v-if="error" style="color: red">{{ errorText }}</h3>
    <form autocomplete="off" v-if="inLoginForm">
      <input
        id="userNameInput"
        type="text"
        class="inputField"
        name="username"
        placeholder="username"
        v-model="username"
      />
      <label for="email" class="inputLabel" id="emailLabel">username</label>
      <input
        type="password"
        name="password"
        id="passwordInput"
        class="inputField"
        placeholder="Password"
        v-model="password"
      />
      <label for="password" class="inputLabel" id="passwordLabel"
        >password
      </label>
      <button @click.prevent="doLogin">Login</button>
    </form>
    <form autocomplete="off" v-if="!inLoginForm">
      <input
        id="userNameInput"
        type="text"
        class="inputField"
        name="username"
        placeholder="username"
        v-model="username"
      />
      <label for="email" class="inputLabel" id="emailLabel">username</label>
      <input
        type="password"
        name="password"
        id="passwordInput"
        class="inputField"
        placeholder="Password"
        v-model="password"
        minlength="8"
        oninvalid="()=>{validated=true;}"
        maxlength="25"
        @input="validate"
      />
      <label for="password" class="inputLabel" id="passwordLabel"
        >password
      </label>
      <button @click.prevent="doSignup">Signup</button>
    </form>
  </div>
</template>

<script>
import { LOGIN_USER, SIGN_UP } from "@/graphql";
export default {
  data() {
    return {
      username: "",
      password: "",
      inLoginForm: true,
      error: false,
      errorText: "",
      validated: false,
    };
  },
  methods: {
    callError(errMsg) {
      this.error = true;

      this.errorText = errMsg;
      setTimeout(() => {
        this.error = false;
      }, 2000);
    },
    validate() {
      const regex = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      );
      let found = regex.test(this.password);
      if (!found) {
        this.errorText =
          "Password must contain Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character";
        this.error = true;
        this.validated = false;
      } else {
        this.error = false;
        this.validated = true;
      }
    },
    async doLogin() {
      if (!this.username) {
        return this.callError("username is empty");
      }
      if (!this.password) {
        return this.callError("password is empty");
      }
      this.$store.commit("updateToken", this.username);
      let data = await this.$apollo.query({
        query: LOGIN_USER,
        fetchPolicy: "network-only",
      });
      try {
        if (data.data.users[0].password === this.password) {
          this.$store.dispatch("login");
          this.username = "";
          this.password = "";
        } else {
          this.callError("username or password are wrong");
          this.$store.commit("updateToken", "");
        }
      } catch (err) {
        this.callError("username or password are wrong");
        this.$store.commit("updateToken", "");
      }
    },
    doSignup() {
      if (this.validated && this.username) {
        try {
          this.$apollo.mutate({
            mutation: SIGN_UP,
            variables: {
              username: this.username,
              password: this.password,
            },
          });
          this.$store.commit("updateToken", this.username);
          this.$store.dispatch("login");
        } catch (err) {
          this.callError("username is already taken");
        }
      } else {
        this.callError("please fill the username and password properly");
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap");
.card {
  font-family: "Montserrat", sans-serif;
  background-color: #023047;
  margin: 10% 20%;
  padding: 10rem 10rem;
  box-shadow: 15px 15px 1rem #023047a8;
  .header {
    display: flex;
    justify-content: space-between;
    h1 {
      margin-top: -5rem;
    }
  }
  form {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;
    height: 100%;
    input::invalid {
      border-color: red;
      &::after {
        content: "Wrong input";
      }
    }
    .inputField {
      height: 2rem;
      margin-block-end: 2rem;
      text-align: left;
      width: 100%;
      border: 0;
      border-bottom: 2px solid #ccc;
      padding: 7px 0;
      outline: 0;
      font-size: 1.3rem;
      color: #fff;
      background: transparent;
      transition: border-color 0.2s;
      grid-column: 1/3;
      &::placeholder {
        color: transparent;
      }
      &:placeholder-shown ~ .inputLabel {
        font-size: 1.3rem;
        cursor: text;
        top: 30px;
      }
      &:placeholder-shown ~ #passwordLabel {
        font-size: 1.3rem;
        cursor: text;
        top: 120px;
      }
      &:focus {
        padding-bottom: 6px;
        font-weight: 700;
        border-width: 3px;
        border-image: linear-gradient(
          43deg,
          #ffcc70 0%,
          #c850c0 46%,
          #4158d8 100%
        );
        border-image-slice: 5;
      }
    }
    #userNameInput:focus ~ #emailLabel {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #ffcc70;
      font-weight: 700;
    }
    #passwordInput:focus ~ #passwordLabel {
      position: absolute;
      top: 100px;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #ffcc70;
      font-weight: 700;
    }
    &:required,
    &:invalid {
      box-shadow: none;
    }
  }
  .inputLabel {
    position: absolute;
    display: block;
    font-size: 1px;
    transition: 0.2s;
    color: rgb(255, 255, 255);
  }
  button {
    color: #fff;
    background: transparent;
    height: 3rem;
    width: 100%;
    grid-column: 1/3;
    margin-top: 1rem;
  }
  #passwordInput {
    margin-block-start: 0.8rem;
  }
}
</style>
