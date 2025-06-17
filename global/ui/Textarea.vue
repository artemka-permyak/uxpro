<template>
  <div class="relative">
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      rows="4"
      class="t1sb peer w-full h-[7.2rem] pb-[1.6rem] bg-transparent border-b border-grey text-white resize-none outline-none focus:border-white transition-all placeholder:text-grey"
      @input="handleInput"
    />
    <label
      :for="id"
      class="t1sb absolute left-0 top-0 text-grey transition-all
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-grey peer-focus:top-0
      peer-focus:text-sm peer-focus:text-white"
    >
      {{ label }}
    </label>

    <transition name="fade">
      <span
        v-if="errorMessage"
        class="absolute bottom-[-.8rem] left-0 translate-y-[100%] text-red-500 text-[1.6rem] leading-[1.6rem]"
      >
        {{ errorMessage }}
      </span>
    </transition>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TextareaUi'
})

const props = defineProps<{
  label?: string,
  id: string,
  modelValue: string
  placeholder: string
  error?: string
}>()

const {
  label,
  id,
  modelValue,
  placeholder,
  error,
} = toRefs(props);

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const isEmptyAfterPressed = ref<boolean>(false);
const errorMessage = ref<string | null>(null)

function handleInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)

  if (!value) {
    isEmptyAfterPressed.value = true
    errorMessage.value = 'Обязательное поле'
  } else {
    isEmptyAfterPressed.value = false;
  }
}

watch(
  () => error.value,
  () => {
    errorMessage.value = error.value || null;
  }
)
</script>
