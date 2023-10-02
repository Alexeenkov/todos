<template>
  <TodosHeader/>
  <RouterView/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodosHeader from '@/components/TodosHeader/TodosHeader.vue';

export default defineComponent({
  name: 'App',
  components: {
    TodosHeader,
  },
});
</script>

<style lang="scss">
  @import "@/scss/bundle";
</style>
