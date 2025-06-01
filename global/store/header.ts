import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header-store', {
  state: () => ({
    title: '' as string,
    isShowStickyHeader: false,
  }),

  getters: {
    getTitle: state => state.title,
  },

  actions: {
    changeTitle(title: string) {
      this.title = title
    },

    changeShowStickyHeader(value: boolean) {
      this.isShowStickyHeader = value
    }
  }
})
