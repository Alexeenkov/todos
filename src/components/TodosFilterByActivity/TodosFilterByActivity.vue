<template>
  <aside
    class="todos-filter-by-activity"
    :class="todosFilterByActivityClasses"
  >
    <button
      v-for="(filter, index) in filters"
      :key="`${filter}-${index}`"
      @click="setFilter(filter)"
      class="todos-filter-by-activity__button button"
      :class="buttonClasses(filter)"
    >
      {{ filter }}
    </button>
  </aside>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';
import { useTodosStore } from '@/stores/todosStore';
import { Filters } from '@/constants/Filters';
import { storeToRefs } from 'pinia';

const dataTodosStore = useTodosStore();
const { activeFilter, editableTodo } = storeToRefs(dataTodosStore);
const { setFilter } = dataTodosStore;

const filters = [
  Filters.ALL,
  Filters.ACTIVE,
  Filters.DONE,
];

const buttonClasses = (filter: Filters) => ({
  'button--primary': unref(activeFilter) === filter,
});

const todosFilterByActivityClasses = computed(() => ({
  'todos-filter-by-activity--disabled': unref(editableTodo).isEditing,
}));
</script>

<style scoped lang="scss">
  @import "@/components/TodosFilterByActivity/styles/todos-filter-by-activity";
</style>
