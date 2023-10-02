import { defineStore } from 'pinia';
import {
  Ref,
  ref,
  computed,
  ComputedRef,
  unref,
  watch,
} from 'vue';
import { Todo } from '@/interfaces/Todo';
import { Stats } from '@/interfaces/Stats';
import { Filters } from '@/constants/Filters';
import { EditableTodo } from '@/interfaces/EditableTodo';
import { Times } from '@/constants/Times';

export const useTodosStore = defineStore('todos', () => {
  const todos: Ref<Todo[]> = ref([]);
  const activeFilter = ref(Filters.ALL);
  const isSortEarlyFirst = ref(true);
  const filteredDate: Ref<null | number> = ref(null);
  const editableTodo: Ref<EditableTodo> = ref({
    isEditing: false,
    id: null,
  });

  const checksIsTodayTodo = (todo: Todo): boolean => todo.date > unref(filteredDate)! && todo.date < unref(filteredDate)! + Times.MILLISECONDS_PER_DAY;

  const doneTodos: ComputedRef<Todo[]> = computed(() => unref(todos).filter((todo) => todo.completed));
  const activeTodos: ComputedRef<Todo[]> = computed(() => unref(todos).filter((todo) => !todo.completed));
  const todosOfTheDay: ComputedRef<Todo[]> = computed(() => unref(todos).filter(checksIsTodayTodo));
  const activeTodosOfTheDay: ComputedRef<Todo[]> = computed(() => unref(activeTodos).filter(checksIsTodayTodo));
  const doneTodosOfTheDay: ComputedRef<Todo[]> = computed(() => unref(doneTodos).filter(checksIsTodayTodo));

  const filteredTodos: ComputedRef<Todo[]> = computed(() => {
    switch (unref(activeFilter)) {
      case (Filters.DONE):
        return unref(filteredDate) ? unref(doneTodosOfTheDay) : unref(doneTodos);
      case (Filters.ACTIVE):
        return unref(filteredDate) ? unref(activeTodosOfTheDay) : unref(activeTodos);
      case Filters.ALL:
      default:
        return unref(filteredDate) ? unref(todosOfTheDay) : unref(todos);
    }
  });

  const stats: ComputedRef<Stats> = computed(() => ({
    active: unref(filteredDate) ? unref(activeTodosOfTheDay).length : unref(activeTodos).length,
    done: unref(filteredDate) ? unref(doneTodosOfTheDay).length : unref(doneTodos).length,
  }));

  const setFilteredDate = (date: Date | null): void => {
    if (!date) {
      filteredDate.value = null;
      return;
    }
    filteredDate.value = new Date(date.toDateString()).getTime();
  };

  const sortTodosByDate = (): void => {
    if (unref(isSortEarlyFirst)) {
      todos.value.sort((a: Todo, b: Todo) => a.date - b.date);
      return;
    }
    todos.value.sort((a: Todo, b: Todo) => b.date - a.date);
  };

  const toggleSortOrder = (): void => {
    isSortEarlyFirst.value = !unref(isSortEarlyFirst);
    sortTodosByDate();
  };

  const cancelEditTodo = () => {
    editableTodo.value.isEditing = false;
    editableTodo.value.id = null;
  };

  const setFilter = (filter: Filters): void => {
    activeFilter.value = filter;
    cancelEditTodo();
  };

  const removeTodo = (id: number): void => {
    todos.value = unref(todos).filter((todo: Todo) => todo.id !== id);
  };

  const addTodo = (todo: Todo): void => {
    unref(todos).push(todo);
  };

  const toggleTodo = (id: number): void => {
    const targetTodo = unref(todos).find((todo: Todo) => todo.id === id);

    if (targetTodo) {
      targetTodo.completed = !targetTodo.completed;
    }
  };

  const editTodo = (id: number): void => {
    editableTodo.value.isEditing = true;
    editableTodo.value.id = id;
  };

  const saveEditedTodo = (id: number, newText: string, date: Date): void => {
    const targetTodo = unref(todos).find((todo: Todo) => todo.id === id);

    if (targetTodo) {
      targetTodo.text = newText;
      targetTodo.date = date.getTime();
    }

    cancelEditTodo();
  };

  const resetFilters = (): void => {
    activeFilter.value = Filters.ALL;
    filteredDate.value = null;
  };

  const todosInLocalStorage = localStorage.getItem('todos');

  if (todosInLocalStorage) {
    todos.value = JSON.parse(todosInLocalStorage)._value;
    sortTodosByDate();
  }

  watch(() => todos, (state) => {
    localStorage.setItem('todos', JSON.stringify(state));
    sortTodosByDate();
  }, { deep: true });

  return {
    todos,
    activeFilter,
    isSortEarlyFirst,
    filteredDate,
    editableTodo,
    filteredTodos,
    stats,
    setFilteredDate,
    toggleSortOrder,
    setFilter,
    removeTodo,
    addTodo,
    editTodo,
    toggleTodo,
    cancelEditTodo,
    saveEditedTodo,
    resetFilters,
  };
});
