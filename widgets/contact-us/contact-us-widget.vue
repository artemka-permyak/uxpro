<template>
  <div
    id="contactUsFormWidget"
    class="flex flex-col gap-size-8"
  >
    <div class="flex justify-between border-b border-dark-grey pb-size-8 px-size-8 max-xl-plus:flex-col max-xl-plus:gap-size-8 max-xl-plus:px-size-6">
      <h2
        class="text-h2 only-desktop"
        v-html="LABELS.title"
      />

      <h1
        class="text-h1 only-mobile"
        v-html="LABELS.mobileTitle"
      />

      <div class="flex gap-size-6 max-xl-plus:flex-col max-xl-plus:gap-size-4">
        <NuxtImg
          :src="getDomainLink('/images/contacts/sergey-logo.png')"
          alt="Сергей UxPro"
          class="w-[9rem] h-[9rem] rounded-full"
        />

        <div class="flex flex-col gap-[.8rem]">
          <div
            class="text-[1.6rem] leading-[2.2rem] only-desktop"
            v-html="LABELS.description"
          />

          <div
            class="text-[1.6rem] leading-[2.2rem] only-mobile"
            v-html="LABELS.mobileDescription"
          />

          <Link
            :href="SOCIAL_LINKS_TO.TELEGRAM"
            target="_blank"
            icon="arrow-right"
            class="self-start"
            content-class="!gap-size-2"
          >
            {{ LABELS.telegram }}
          </Link>
        </div>

        <EmailAndPhone class="xl-plus:hidden" />

        <DownloadPresentationFeature class="self-start xl-plus:hidden" />
      </div>
    </div>

    <div class="flex flex-col gap-size-16">
      <form
        class="relative flex flex-col gap-size-16 px-size-8 grow max-xl-plus:gap-size-8 max-xl-plus:px-size-6"
        @submit.prevent="handleSubmitForm"
      >
        <div class="w-[50%] max-xl-plus:w-full">
          <div
            v-for="input in FORM_INPUTS"
            :key="input.id"
            :class="['pb-size-16 last:pb-0 max-xl-plus:pb-size-8', input.class]"
          >
            <component
              :is="input.component"
              :id="input.id"
              :type="input.type"
              :error="input.error"
              :placeholder="input.placeholder"
              :model-value="input.value"
              @update:model-value="handleChangeInput(input, $event)"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 max-xl-plus:grid-cols-1 gap-size-8">
          <div class="flex flex-col gap-size-16 max-xl-plus:gap-size-8">
            <p class="text-grey">
              Нажимая «Отправить», вы соглашаетесь с <RouterLink
                to="/policy"
                target="_blank"
                class="text-white underline"
              >
                политикой конфиденциальности
              </RouterLink>
            </p>

            <ButtonUi
              type="submit"
              class="w-full"
            >
              Отправить
            </ButtonUi>
          </div>

          <div class="w-full flex flex-col gap-size-4 items-end grow w-[50%] max-xl-plus:hidden">
            <EmailAndPhone />

            <DownloadPresentationFeature />
          </div>
        </div>

        <transition name="fade">
          <div
            v-if="['success', 'error'].includes(formState)"
            class="absolute top-0 left-0 bottom-0 right-0 text-white bg-black flex flex-col gap-size-8 items-center justify-center"
          >
            <Check
              v-if="formState === 'success'"
              width="120"
              height="120"
            />

            <Close
              v-if="formState === 'error'"
              width="120"
              height="120"
            />

            <h3 class="text-h3">
              {{ formState === 'success' ? 'Сообщение было отправлено' : 'Произошла ошибка при отправке сообщения' }}
            </h3>

            <button
              type="button"
              class="border-b border-b-white"
              @click="handleResetForm"
            >
              {{ formState === 'success' ? 'Отправить еще' : 'Попробовать еще раз' }}
            </button>
          </div>
        </transition>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Close from '@/global/assets/svg/close.svg'
import Check from '@/global/assets/svg/check.svg'
import { InputUi, TextareaUi, ButtonUi, Link, Icon } from '@/global/ui'
import { getDomainLink, plural } from '@/global/lib'
import { SOCIAL_LINKS_TO } from '~/global/const/contacts'
import { EmailAndPhone } from '~/global/ui/contact-links'
import { DownloadPresentationFeature } from '~/features'

defineOptions({
  name: 'ContactUsWidget',
})

const LABELS = {
  title: 'Давайте познакомимся<br> и обсудим ваш проект!',
  mobileTitle: 'Давайте познакомимся и&nbsp;обсудим ваш проект!',
  description: 'Хотите обсудить сотрудничество напрямую?<br> Свяжитесь со мной — буду рад помочь!',
  mobileDescription: 'Хотите обсудить сотрудничество напрямую? Свяжитесь со мной — буду рад помочь!',
  telegram: 'Telegram',
}

const REQUIRED_FIELD = 'Обязательное поле'

const formValues = ref(getDefaultFormValues())

const formErrors = ref(getDefaultFormErrors())

const formState = ref<'success' | 'idle' | 'error'>('idle')

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
      class: 'inline-block w-[50%] pr-size-4 max-xl-plus:block max-xl-plus:w-full max-xl-plus:pr-0'
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
      class: 'inline-block w-[50%] pl-size-4 max-xl-plus:block max-xl-plus:w-full max-xl-plus:pl-0',
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

function getDefaultFormValues() {
  return {
    name: '',
    phone: '',
    email: '',
    comment: '',
  }
}

function getDefaultFormErrors() {
  return {
    name: '',
    phone: '',
    email: '',
    comment: '',
  }
}

async function handleSubmitForm() {
  if (validateForm()) {
    await $fetch('/api/sendMail', {
      method: 'post',
      body: formValues.value,
    })
      .then(() => {
        formState.value = 'success'
      })
      .catch(() => {
        formState.value = 'error'
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

function handleResetForm() {
  formState.value = 'idle'

  formValues.value = getDefaultFormValues()

  nextTick(() => {
    formErrors.value = getDefaultFormErrors()
  })
}
</script>
