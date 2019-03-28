<template>
  <div :style="styleObj" class="absolute">
    <div v-for="i in box.shapeArray.length" class="flex flex-row opacity-25">
      <div
        v-for="j in box.shapeArray[i-1].length"
        :style="boxStyle"
        :class="{ 'bg-gray-300': box.shapeArray[i-1][j-1] === 1 }"
        class="flex items-center justify-center"
      >
        {{ box.shapeArray[i-1][j-1] }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['size', 'box'],

    computed: {
      styleObj() {
        return {
          left: `${this.size * (this.box.x)}px`,
          top: `${this.size * (this.box.y)}px`,
        }
      },
      boxStyle() {
        return {
          height: `${this.size}px`,
          width: `${this.size}px`,
        }
      }
    }
  }
</script>
