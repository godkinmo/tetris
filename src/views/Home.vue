<template>
  <div class="h-screen overflow-hidden flex items-center justify-center">
    <div class="border relative" :style="gameBox">

      <!-- bg-grids -->
      <div class="absolute inset-left inset-top flex flex-col h-full">
        <div v-for="i in 20" class="flex flex-row">
          <div class="border border-gray-100 text-gray-300 flex items-center justify-center"
            v-for="i in 10"
            :style="gridBoxStyle"
          >
            0
          </div>
        </div>
      </div>

      <div class="absolute inset-left inset-top w-full h-full">
        <tetrix v-for="tetrix in tetrixes" :size="gridSize" :box="tetrix"></tetrix>
      </div>

      <div class="absolute inset-left inset-top w-full h-full">
        <tetrix :size="gridSize" :box="currentTetrix"></tetrix>
      </div>
    </div>
  </div>
</template>

<script>
  import TetrixTypes from '@/data/TetrixTypes'
  import Tetrix from '@/components/Tetrix.vue'

  import InteractionWithKeybord from '@/mixins/InteractionWithKeybord.js'

  export default {
    name: 'home',

    components: {
      Tetrix,
    },

    mixins: [
      InteractionWithKeybord
    ],

    data() {
      return {
        windowHeight: window.innerHeight,
        tetrixTypes: TetrixTypes,

        currentTetrix: {
          x: 5,
          y: 3,
          type: 'j',
          shapeArray: TetrixTypes['j'][0]
        },

        tetrixes: [],
      }
    },

    mounted() {
      let listener = () => {
        this.windowHeight = window.innerHeight
      }
      window.addEventListener('resize', listener)

      this.$once('hook:beforeDestroyed', () => {
        window.removeEventListener('resize', listener)
      })

      this.gameLoop()
    },

    computed: {
      gameBox() {
        // 10:20 = width:height
        let height = this.windowHeight * 0.9

        return {
          width: (height * 10 / 20) + 'px',
          height: height + 'px',
        }
      },

      gridSize() {
        return this.windowHeight * 0.9 / 20
      },

      gridBoxStyle() {
        return {
          width: `${this.gridSize}px`,
          height: `${this.gridSize}px`,
        }
      }
    },

    methods: {
      gameLoop() {
        setInterval(() => {
          this.handleKeyArrowDown()

          if (this.isCurrentTetrixStoped()) {
            console.log('render new ')
            // this.clearFinishRow()

            this.tetrixes.push(this.currentTetrix)

            this.renderNewTetrix()
          }
        }, 500)
      },

      isCurrentTetrixStoped() {
        this.currentTetrix.y += 1;

        if (this.isCurrentTetrixOverflowY()) {
          this.preventCurrentOverflowY()

          return true
        }
      },

      renderNewTetrix() {
        this.currentTetrix = {
          x: 5,
          y: 3,
          type: 't',
          shapeArray: TetrixTypes['t'][0]
        }
      },

      handleKeyArrowUp() {
        let type = this.tetrixTypes[this.currentTetrix.type]
        let currentIndex = type.indexOf(this.currentTetrix.shapeArray)
        this.currentTetrix.shapeArray = type[currentIndex+1 > type.length-1 ? 0 : currentIndex+1]

        this.preventCurrentOverflowX()
        this.preventCurrentOverflowY()
      },

      handleKeyArrowLeft() {
        this.currentTetrix.x -= 1
        if (this.currentTetrix.x < 0) {
          this.currentTetrix.x = 0
        }
      },

      handleKeyArrowRight() {
        this.currentTetrix.x += 1

        this.preventCurrentOverflowX()
      },

      handleKeyArrowDown() {
        this.currentTetrix.y += 1

        this.preventCurrentOverflowY()
      },

      preventCurrentOverflowX() {
        if (this.isCurrentTetrixOverflowX()) {
          do {
            this.currentTetrix.x -= 1
          } while (this.isCurrentTetrixOverflowX())
        }
      },

      preventCurrentOverflowY() {
        if (this.isCurrentTetrixOverflowY()) {
          do {
            this.currentTetrix.y -= 1
          } while (this.isCurrentTetrixOverflowY())
        }
      },

      isCurrentTetrixOverflowX() {
        let shapeArray = this.currentTetrix.shapeArray
        let width = 1

        for (let i = 0; i < shapeArray.length; i++) {
          if (shapeArray[i].length > width) {
            width = shapeArray[i].length
          }
        }

        return this.currentTetrix.x + (width-1) > 9
      },

      isCurrentTetrixOverflowY() {
        let height = this.currentTetrix.shapeArray.length

        return (this.currentTetrix.y + (height-1)) > 19
      },
    }
  }
</script>
