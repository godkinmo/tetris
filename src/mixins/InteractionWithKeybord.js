export default {
  data: () => ({
    keyDownStatus: {
      'ArrowUp': false,
      'ArrowLeft': false,
      'ArrowRight': false,
      'ArrowDown': false,
    }
  }),

  mounted() {
    this.keyboardHandle()
  },

  methods: {
    keyboardHandle() {
      document.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp' && ! this.keyDownStatus['ArrowUp']) {
          this.handleKeyArrowUp()
        }
        if (e.key === 'ArrowLeft' && ! this.keyDownStatus['ArrowLeft']) {
          this.handleKeyArrowLeft()
          setTimeout(() => {
            this.keyDownStatus['ArrowLeft'] = false
          }, 250)
        }
        if (e.key === 'ArrowRight' && ! this.keyDownStatus['ArrowRight']) {
          this.handleKeyArrowRight()
          setTimeout(() => {
            this.keyDownStatus['ArrowRight'] = false
          }, 250)
        }
        if (e.key === 'ArrowDown' && ! this.keyDownStatus['ArrowDown']) {
          this.handleKeyArrowDown()
          setTimeout(() => {
            this.keyDownStatus['ArrowDown'] = false
          }, 250)
        }

        this.keyDownStatus[e.key] = true
      })

      document.addEventListener('keyup', e => {
        this.keyDownStatus[e.key] = false
      })
    },
  }
}
