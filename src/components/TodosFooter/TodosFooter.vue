<template>
  <footer class="todos-footer">
    {{ stats.active }} more to do, {{ stats.done }} done
  </footer>
</template>

<script setup lang="ts">
import { useTodosStore } from '@/stores/todosStore';
import { storeToRefs } from 'pinia';

const { stats } = storeToRefs(useTodosStore());
</script>

<style scoped lang="scss">
  @import "@/components/TodosFooter/styles/todos-footer";
</style>
