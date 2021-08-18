<template>
  <div class="profile-card">{{ profile.name }}</div>
</template>

<script>
export default {
  name: 'ProfileCard',

  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.profile-card {
  height: 136px;
  background: #fafafa;
  margin-bottom: 20px;
}
</style>
