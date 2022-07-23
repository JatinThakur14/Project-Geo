<template>
  <div class="home">
    <map-option-component />
    <map-component />
  </div>
</template>
<script>
import MapComponent from "@/components/MapComponent.vue";
import MapOptionComponent from "@/components/MapOptionComponent.vue";
export default {
  components: {
    MapComponent,
    MapOptionComponent,
  },
};
</script>
<style lang="scss">
.home {
  display: grid;
  grid-template-columns: 15vw 85vw;
  height: 100vh;
  width: 100vw;
  padding-inline-end: 1rem;
}
</style>
