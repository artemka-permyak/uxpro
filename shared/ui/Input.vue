<template>
  <div class="relative">
    <input
      v-if="!mask"
      v-bind="$attrs"
      :id="id"
      v-model="modelValue"
      :type="type"
      :placeholder="placeholder"
      autocomplete="off"
      class="t1sb peer w-full bg-transparent border-b border-grey text-white outline-none focus:border-white transition-all pb-[1.6rem]"
      @input="handleInput"
    >
    <MaskInput
      v-else
      v-bind="$attrs"
      :id="id"
      v-model="modelValue"
      :mask="mask"
      :type="type"
      :placeholder="placeholder"
      autocomplete="off"
      class="t1sb peer w-full bg-transparent border-b border-grey text-white outline-none focus:border-white transition-all pb-[1.6rem]"
      @input="handleInput"
    />
    <label
      :for="id"
      class="t1sb absolute left-0 top-0 text-gray-500 transition-all
      peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-grey peer-focus:top-0
      peer-focus:text-white"
    >
      {{ label }}
    </label>

    <transition name="fade">
      <span
        v-if="error"
        class="absolute bottom-[-.8rem] left-0 translate-y-[100%] text-red-500 text-[1.6rem] leading-[1.6rem]"
      >
        {{ error }}
      </span>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { MaskInput } from 'vue-3-mask';

defineOptions({
  name: 'InputUi'
})

const PHONE_REGEX = /^\+7 \(\d{3}\) \d{3} \d{4}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const props = defineProps<{
  type?: 'email' | 'phone' | 'text',
  label?: string
  id: string,
  modelValue: string
  placeholder: string,
  error?: string,
}>();

const {
  label,
  type,
  id,
  modelValue,
  placeholder,
  error,
} = toRefs(props)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const mask = computed(() => {
  if (type.value === 'phone') {
    return '+7 (###) ### ####'
  } else {
    return ''
  }
})

// const isEmptyAfterPressed = ref<boolean>(false);
// const isPressed = ref<boolean>(false);
// const isMaskSuccess = ref<boolean>(false);
// const errorMessage = ref<string | null>(null)

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)

  // if (type.value === 'phone') {
  //   if (isMaskSuccess.value) {
  //     validatePhone(value)
  //     validatePhone(value.slice(0, value.length - 1))
  //   } else {
  //     validatePhone(value)
  //   }
  // } else if (type.value === 'email') {
  //   if (isMaskSuccess.value) {
  //     validateEmail(value)
  //     validateEmail(value.slice(0, value.length - 1))
  //   } else {
  //     validateEmail(value)
  //   }
  // }

  // if (!value) {
  //   isEmptyAfterPressed.value = true
  //   errorMessage.value = 'Обязательное поле'
  // } else {
  //   isEmptyAfterPressed.value = false;
  // }
}

// function validatePhone(value: string) {
//   if (PHONE_REGEX.test(value)) {
//     errorMessage.value = null;
//     isMaskSuccess.value = true;
//   } else {
//     errorMessage.value = 'Неверный формат номера телефона';
//     isMaskSuccess.value = false;
//   }
// }
//
// function validateEmail(value: string) {
//   if (EMAIL_REGEX.test(value)) {
//     errorMessage.value = null;
//     isMaskSuccess.value = true;
//   } else {
//     errorMessage.value = 'Неверный формат почты';
//     isMaskSuccess.value = false;
//   }
// }

// watch(
//   () => error.value,
//   () => {
//     errorMessage.value = error.value || null;
//   }
// )
</script>
