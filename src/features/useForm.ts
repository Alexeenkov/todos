import {
  computed,
  ComputedRef,
  Ref,
  unref,
} from 'vue';

interface DateParser {
  day: ComputedRef<string>
  month: ComputedRef<string>
  year: ComputedRef<string>
  formatDatepicker: ComputedRef<string>
}

export const useForm = () => {
  const parseDate = (date: Ref<Date>): DateParser => {
    const day = computed(() => unref(date).getDate().toString());
    const month = computed(() => (unref(date).getMonth() + 1).toString());
    const year = computed(() => unref(date).getFullYear().toString().slice(2));
    const formatDatepicker = computed(() => `${unref(day)}.${unref(month)}.${unref(year)}`);

    return {
      day,
      month,
      year,
      formatDatepicker,
    };
  };

  const validatesText = (text: string): boolean => {
    if (text.trim().length < 10) {
      return false;
    }
    return true;
  };

  return {
    parseDate,
    validatesText,
  };
};
