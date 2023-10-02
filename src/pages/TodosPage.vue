<template>
  <LayoutDefault class="todos-page">
    <template #filters>
      <TodosFilterByActivity class="todos-page__filter-activity"/>
      <TodosFilterByDate class="todos-page__filter-date"/>
      <TodosSortBtn class="todos-page__sort"/>
    </template>

    <TodosList/>
    <TodosFormAdd/>

    <template #footer>
      <TodosFooter/>
    </template>
  </LayoutDefault>
</template>

<script setup lang="ts">
import TodosFilterByActivity from '@/components/TodosFilterByActivity/TodosFilterByActivity.vue';
import TodosList from '@/components/TodosList/TodosList.vue';
import TodosFormAdd from '@/components/TodosFormAdd/TodosFormAdd.vue';
import TodosFooter from '@/components/TodosFooter/TodosFooter.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import TodosSortBtn from '@/components/TodosSortBtn/TodosSortBtn.vue';
import TodosFilterByDate from '@/components/TodosFilterByDate/TodosFilterByDate.vue';
</script>

<style scoped lang="scss">
  @import "@/pages/styles/todos-page";
</style>
