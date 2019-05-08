<template>
  <div>
    <h1>Home</h1>
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
      this.$router.push('/other')
    }
  }
}
</script>
