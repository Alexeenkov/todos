<template>
  <button
    @click="toggleSortOrder"
    type="button"
    class="todos-sort-btn"
    :class="todosSortBtnClasses"
  >
    <i
      v-if="isSortEarlyFirst"
      class="bi bi-sort-down-alt"
    />
    <i
      v-else
      class="bi bi-sort-up-alt"
    />
  </button>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodosStore } from '@/stores/todosStore';

const dataTodosStore = useTodosStore();
const { isSortEarlyFirst, editableTodo } = storeToRefs(dataTodosStore);
const { toggleSortOrder } = dataTodosStore;

const todosSortBtnClasses = computed(() => ({
  'todos-sort-btn--disabled': unref(editableTodo).isEditing,
}));
</script>

<style scoped lang="scss">
  @import "@/components/TodosSortBtn/styles/todos-sort-btn";
</style>
