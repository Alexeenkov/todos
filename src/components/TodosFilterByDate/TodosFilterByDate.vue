<template>
  <div
    class="todos-filter-by-date"
    :class="todosFilterByDateClasses"
  >
    <VueDatePicker
      v-if="filteredDate"
      v-model="changedDate"
      :enableTimePicker="false"
      :format="formatDatepicker"
      :clearable="false"
      class="todos-filter-by-date__datepicker"
    />
    <button
      @click="toggleDateInput"
      type="button"
      class="todos-filter-by-date__button"
    >
      <i
        v-if="filteredDate"
        class="bi bi-x-lg"
      />
      <i
        v-else
        class="bi bi-funnel"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  unref,
  watch,
  computed,
} from 'vue';
import { useForm } from '@/features/useForm';
import { useTodosStore } from '@/stores/todosStore';
import { storeToRefs } from 'pinia';

const { parseDate } = useForm();
const dataTodosStore = useTodosStore();
const { filteredDate, editableTodo } = storeToRefs(dataTodosStore);
const { setFilteredDate } = dataTodosStore;

const changedDate = ref(new Date());
const { formatDatepicker } = parseDate(changedDate);

const todosFilterByDateClasses = computed(() => ({
  'todos-filter-by-date--disabled': unref(editableTodo).isEditing,
}));

const toggleDateInput = (): void => {
  if (unref(filteredDate)) {
    setFilteredDate(null);
    changedDate.value = new Date();
    return;
  }
  setFilteredDate(unref(changedDate));
};

watch(() => changedDate.value, () => {
  if (unref(filteredDate)) {
    setFilteredDate(unref(changedDate));
  }
});
</script>

<style scoped lang="scss">
  @import "@/components/TodosFilterByDate/styles/todos-filter-by-date";
</style>
