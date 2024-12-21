<template>
  <SplitBlock
    id="contactUsFormWidget"
    class="px-gap mb:px-[1.6rem] "
  >
    <template #left>
      <span class="t1sb">
        {{ LABELS.title }}
      </span>
    </template>

    <template #right>
      <form
        class="flex flex-col gap-[6.4rem]"
        @submit.prevent="handleSubmitForm"
      >
        <component
          :is="input.component"
          v-for="input in FORM_INPUTS"
          :id="input.id"
          :key="input.id"
          :type="input.type"
          :error="input.error"
          :placeholder="input.placeholder"
          :model-value="input.value"
          @update:model-value="handleChangeInput(input, $event)"
        />

        <ButtonUi
          type="submit"
          size="large"
          class="only-desktop"
        >
          Отправить

          <ArrowRight
            width="20"
            height="20"
          />
        </ButtonUi>

        <ButtonUi
          type="submit"
          size="small"
          class="only-mobile"
        >
          <span class="text-[1.8rem] leading-[2.1rem]">
            Отправить
          </span>

          <ArrowRight
            width="16"
            height="16"
          />
        </ButtonUi>
      </form>
    </template>
  </SplitBlock>
</template>

<script setup lang="ts">
import ArrowRight from 'public/svgs/arrowRight.svg'
import { SplitBlock, InputUi, TextareaUi, ButtonUi } from '@/global/ui'
import { plural } from '@/global/lib'

defineOptions({
  name: 'ContactUsWidget',
})

const LABELS = {
  title: 'Оставьте свои данные здесь',
}

const REQUIRED_FIELD = 'Обязательное поле'

const formValues = ref({
  name: '',
  phone: '',
  email: '',
  comment: '',
})

const formErrors = ref({
  name: '',
  phone: '',
  email: '',
  comment: '',
})

const FORM_INPUTS = computed(() => {
  return [
    {
      id: 'name',
      placeholder: 'Имя',
      component: InputUi,
      required: true,
      error: formErrors.value.name,
      value: formValues.value.name,
      validation: {
        min: 2,
      },
    },

    {
      id: 'phone',
      type: 'phone',
      placeholder: 'Телефон',
      component: InputUi,
      required: true,
      error: formErrors.value.phone,
      value: formValues.value.phone,
      validation: {
        match: /^\+7 \(\d{3}\) \d{3} \d{4}.?$/,
      },
    },

    {
      id: 'email',
      type: 'email',
      placeholder: 'Почта',
      component: InputUi,
      required: true,
      error: formErrors.value.email,
      value: formValues.value.email,
      validation: {
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    },

    {
      id: 'comment',
      placeholder: 'Комментарий',
      component: TextareaUi,
      required: true,
      error: formErrors.value.comment,
      value: formValues.value.comment,
      validation: {
        min: 10,
      },
    },
  ]
})

async function handleSubmitForm() {
  if (validateForm()) {
    await $fetch('/api/sendMail', {
      method: 'post',
      body: formValues.value,
    })
  }
}

function validateForm() {
  const errorsRest = FORM_INPUTS.value
    .map(input => {
      if (input.validation) {
        const {
          min,
          match
        } = input.validation

        if (min) {
          if (input.value.length < min) {
            setError(input.id, `Минимальная длина ${min} символ${plural(min, ['', 'а', 'ов'])}`)
          } else {
            setError(input.id, '')
          }
        }

        if (match) {
          if (!match.test(input.value)) {
            setError(input.id, input.type === 'phone' ? 'Неправильный номер телефона' : 'Неправильный email')
          } else {
            setError(input.id, '')
          }
        }

        return input
      }

      setError(input.id, '')

      return null
    })
    .filter(Boolean)
    .filter(item => item?.error)

  const errorsRequired = FORM_INPUTS.value
    .filter(input => !input.value)

  if (errorsRequired.length) {
    errorsRequired.forEach(item => {
      setError(item.id, REQUIRED_FIELD)
    })

    return;
  }

  if (errorsRest.length) {
    return;
  }

  return true;
}

function setError(id: string, error: string) {
  formErrors.value[id as keyof typeof formErrors.value] = error
}

function handleChangeInput(input: any, value: string) {
  formValues.value[input.id as keyof typeof formValues.value] = value

  validateInput(input.id)
}

function validateInput(id: string) {
  const input = FORM_INPUTS.value.find(input => input.id === id)

  if (input) {
    if (input.validation) {
      const {
        min,
        match
      } = input.validation

      if (min) {
        if (input.value.length < min) {
          setError(input.id, `Минимальная длина ${min} символ${plural(min, ['', 'а', 'ов'])}`)
        } else {
          setError(input.id, '')
        }
      }

      if (match) {
        if (!match.test(input.value)) {
          setError(input.id, input.type === 'phone' ? 'Неправильный номер телефона' : 'Неправильный email')
        } else {
          setError(input.id, '')
        }
      }
    }

    if (!input.value) {
      setError(input.id, REQUIRED_FIELD)
    }
  }
}
</script>
