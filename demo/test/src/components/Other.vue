<template>
  <div>
    <h1>Other</h1>
    <button @click="handleClick">去other</button>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$route)
  },

  methods: {
    handleClick () {
      this.$router.push({
        path: '/home',
        query: {
          home: 1
        }
      })
    }
  }
}
</script>
