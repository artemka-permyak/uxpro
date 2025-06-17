<template>
  <div class="relative">
    <input
      v-if="!mask"
      v-bind="$attrs"
      :id="id"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      autocomplete="off"
      class="t1sb peer w-full bg-transparent border-b rounded-none border-grey text-white outline-none focus:border-white transition-all pb-[1.6rem] placeholder:text-grey"
      @input="handleInput"
    >

    <MaskInputUi
      v-else
      v-bind="$attrs"
      :id="id"
      :model-value="modelValue"
      :mask="mask"
      :type="type"
      :placeholder="placeholder"
      autocomplete="off"
      class="t1sb peer w-full bg-transparent border-b rounded-none border-grey text-white outline-none focus:border-white transition-all pb-[1.6rem] placeholder:text-grey"
      @update:model-value="handleUpdateModelValue"
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
import MaskInputUi from '@/global/ui/Input/MaskInput.vue'

defineOptions({
  name: 'InputUi'
})

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

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

function handleUpdateModelValue(value: string) {
  emit('update:modelValue', value)
}
</script>
