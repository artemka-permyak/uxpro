import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header-store', {
  state: () => ({
    title: '' as string
  }),

  getters: {
    getTitle: state => state.title
  },

  actions: {
    changeTitle (title: string) {
      this.title = title
    }
  }
})
