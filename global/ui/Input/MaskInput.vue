<template>
  <input
    ref="maskedInput"
    v-bind="$attrs"
    @input="handleInput"
  >
</template>

<script setup lang="ts">
import { masks } from '~/global/ui/Input/lib'

defineOptions({
  name: 'MaskInputUi'
})

const props = defineProps<{
  mask: string
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement

  const maskedValue = applyMask(target.value);

  target.value = maskedValue;

  emit('update:modelValue', maskedValue);
}

function applyMask(value: string) {
  const maskedValue = [];
  let unmaskedIndex = 0;
  let maskIndex = 0;

  while (unmaskedIndex < value.length && maskIndex < props.mask.length) {
    const maskChar = props.mask[maskIndex];
    const unmaskedChar = value[unmaskedIndex];
    const maskDefinition = masks[maskChar as keyof typeof masks];

    if (maskDefinition) {
      if (maskDefinition.escape) {
        maskIndex++;
        maskedValue.push(value[unmaskedIndex]);
        unmaskedIndex++;
      } else if (maskDefinition.pattern.test(unmaskedChar)) {
        const transformedChar = maskDefinition.transform ? maskDefinition.transform(unmaskedChar) : unmaskedChar;
        maskedValue.push(transformedChar);
        unmaskedIndex++;
      } else {
        break;
      }
    } else {
      maskedValue.push(maskChar);
      if (maskChar === unmaskedChar) {
        unmaskedIndex++;
      }
    }
    maskIndex++;
  }

  return maskedValue.join("");
}

// import { masks } from "./masks";
//
// export default {
//   inheritAttrs: false,
//   props: {
//     mask: {
//       type: String,
//       required: true,
//     },
//   },
//   emits: ['update:modelValue'],
//   methods: {
//     handleInput(event) {
//       const maskedValue = this.applyMask(event.target.value);
//       event.target.value = maskedValue;
//       this.$emit('update:modelValue', maskedValue);
//     },
//     applyMask(value) {
//       const maskedValue = [];
//       let unmaskedIndex = 0;
//       let maskIndex = 0;
//
//       while (unmaskedIndex < value.length && maskIndex < this.mask.length) {
//         const maskChar = this.mask[maskIndex];
//         const unmaskedChar = value[unmaskedIndex];
//         const maskDefinition = masks[maskChar];
//
//         if (maskDefinition) {
//           if (maskDefinition.escape) {
//             maskIndex++;
//             maskedValue.push(value[unmaskedIndex]);
//             unmaskedIndex++;
//           } else if (maskDefinition.pattern.test(unmaskedChar)) {
//             const transformedChar = maskDefinition.transform ? maskDefinition.transform(unmaskedChar) : unmaskedChar;
//             maskedValue.push(transformedChar);
//             unmaskedIndex++;
//           } else {
//             break;
//           }
//         } else {
//           maskedValue.push(maskChar);
//           if (maskChar === unmaskedChar) {
//             unmaskedIndex++;
//           }
//         }
//         maskIndex++;
//       }
//
//       return maskedValue.join("");
//     }
//   },
// };
</script>

