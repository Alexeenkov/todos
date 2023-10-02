<template>
  <section
    class="todos-form-add"
    :class="todosFormAddClasses"
  >
    <form
      v-if="isShowForm"
      @submit.prevent="addNewTask"
      class="todos-form-add__form"
    >
      <div class="todos-form-add__header">
        <span class="todos-form-add__title">
          Enter the task text
        </span>
        <button
          @click="closeForm"
          type="button"
          class="todos-form-add__close"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="todos-form-add__input-container">
        <div class="todos-form-add__input todos-form-add__input--focus">
          <input
            v-autofocus
            v-model="todoText"
          />
        </div>
        <VueDatePicker
          v-model="changedDate"
          :enableTimePicker="false"
          :minDate="dateToday"
          :format="formatDatepicker"
          :clearable="false"
          class="todos-form-add__datepicker"
        />
        <div
          v-if="showError"
          class="todos-form-add__error"
        >
          The length of the task must exceed 10 characters
        </div>
      </div>
      <button class="button button--filled">
        Add task
      </button>
    </form>
    <button
      v-else
      @click="showForm"
      class="todos-form-add__show-form"
    >
      <i class="bi bi-plus-lg"></i>
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import { useTodosStore } from '@/stores/todosStore';
import { useForm } from '@/features/useForm';
import { storeToRefs } from 'pinia';

const { parseDate, validatesText } = useForm();
const dataTodosStore = useTodosStore();
const { editableTodo } = storeToRefs(dataTodosStore);
const { addTodo, cancelEditTodo, resetFilters } = dataTodosStore;

const isVisibleForm = ref(false);
const showError = ref(false);
const todoText = ref('');
const dateToday = new Date();
const changedDate = ref(dateToday);
const { formatDatepicker } = parseDate(changedDate);

const isShowForm = computed(() => unref(isVisibleForm) && !unref(editableTodo).isEditing);
const todosFormAddClasses = computed(() => ({
  'todos-form-add--disabled': unref(editableTodo).isEditing,
}));

const showForm = (): void => {
  isVisibleForm.value = true;
  cancelEditTodo();
};

const closeForm = (): void => {
  isVisibleForm.value = false;
};

const addNewTask = (): void => {
  if (!validatesText(unref(todoText))) {
    showError.value = true;
    return;
  }

  addTodo({
    id: Date.now(),
    text: todoText.value,
    completed: false,
    date: changedDate.value.getTime(),
  });

  showError.value = false;
  todoText.value = '';
  closeForm();
  resetFilters();
};
</script>

<style scoped lang="scss">
  @import "@/components/TodosFormAdd/styles/todos-form-add";
</style>
