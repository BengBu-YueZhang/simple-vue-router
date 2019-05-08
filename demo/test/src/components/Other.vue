<template>
  <div>
    <h1>Other</h1>
    <button @click="handleClick">去other</button>
  </div>
</template>

<script>
export default {
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
