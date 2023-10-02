<template>
  <div class="todos-list">
    <ul
      v-if="filteredTodos.length"
      class="todos-list__items"
    >
      <AppTodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
      />
    </ul>
    <span v-else>
      {{ emptyMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';
import { useTodosStore } from '@/stores/todosStore';
import { Filters } from '@/constants/Filters';
import { storeToRefs } from 'pinia';
import AppTodoItem from '@/components/TodosList/TodosListItem.vue';

const {
  filteredTodos,
  activeFilter,
} = storeToRefs(useTodosStore());

const emptyMessage = computed((): string => {
  switch (unref(activeFilter)) {
    case (Filters.DONE):
      return 'No completed any tasks';
    case (Filters.ACTIVE):
      return 'No active tasks';
    case Filters.ALL:
    default:
      return 'There are no tasks';
  }
});
</script>

<style scoped lang="scss">
  @import "@/components/TodosList/styles/todos-list";
</style>
