<template>
  <div class="options">
    <button @click="setCreateModeTrue" v-if="!onCreateMode" id="createPath">
      createPath
    </button>
    <div class="pathInputBox" v-if="onCreateMode">
      <input
        class="pathNameInput"
        type="text"
        v-model="pathName"
        placeholder="Enter Path Name"
      />
      <button v-if="onCreateMode" @click="createPolyline">Create</button>
      <button v-if="onCreateMode" @click="cancel">Cancel</button>
      <span
        >note:Give path name and mark the path on the map first before clicking
        on create path</span
      >
    </div>

    <div class="listOfPaths" v-cloak>
      <ol>
        <li
          v-for="path in paths"
          :key="path.name"
          class="path"
          @click="setPath(path)"
        >
          {{ path.path_name }}
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import { GET_PATH, INSERT_PATH } from "@/graphql";
import { mapState } from "vuex";
export default {
  apollo: {
    paths: {
      query: GET_PATH,
    },
  },

  data() {
    return {
      pathName: "",
    };
  },
  methods: {
    setPath(path) {
      this.$store.commit("setLocations", path.path.latLng);
      this.$store.commit("setPathLoc", path.path.latLng[1]);
      this.$store.commit("setMarkerVisibility", true);
      this.$store.commit("setZoom", 16);
    },
    setCreateModeTrue() {
      this.$store.commit("setCreateMode", true);
      this.$store.commit("setLocations", []);
      this.$store.commit("setMarkerVisibility", false);
    },
    async createPolyline() {
      try {
        //Code
        this.$store.commit("setMarkerVisibility", false);
        if (this.locations.length > 1) {
          await this.$apollo.mutate({
            mutation: INSERT_PATH,
            variables: {
              name: this.pathName,
              path: { latLng: this.locations },
            },
          });
          //Reset Inputs
          this.pathName = "";
          this.$store.commit("setCreateMode", false);
          this.$store.commit("setLocations", []);
          this.$apollo.queries.paths.refetch();
        } else {
          alert("Please enter a valid path");
        }
      } catch (err) {
        console.log(err);
      }
    },
    cancel() {
      this.pathName = "";
      this.$store.commit("setCreateMode", false);
      this.$store.commit("setLocations", []);
      this.$store.commit("setMarkerVisibility", false);
    },
  },
  beforeMount() {
    this.$apollo.queries.paths.refetch();
  },
  computed: {
    ...mapState(["locations", "onCreateMode"]),
  },
};
</script>
<style lang="scss">
[v-cloak] {
  display: none;
}
.options {
  width: 15vw;
  height: inherit;
  overflow-y: auto;

  #createPath {
    margin-inline-start: 2rem;
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
  .pathInputBox {
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(2, 1fr);
    margin-block: 1rem 2rem;
    place-items: center;
    .pathNameInput {
      grid-column: 1 / span 2;
      height: 2rem;
      border: hidden;
      border-block-end: 1px solid black;
      border-inline-start: 1px solid black;
      padding: 0.5rem;
    }
    span {
      font-size: smaller;
      grid-column: 1 / span 2;
    }
    button {
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
  .path {
    list-style-position: inside;
    transition: 0.2s;
    margin-block: 0.5rem;
    padding: 1rem;
    cursor: pointer;
    &:hover {
      background-color: #c2c0c0;
    }
    &::marker {
      color: hotpink;
    }
  }
}
</style>
