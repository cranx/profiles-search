<template>
  <div class="loader" :class="{ 'is-small': isSmall }">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',

  props: {
    isSmall: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.loader {
  margin: 0 auto;
  position: relative;
  width: 80px;
  height: 35px;
  will-change: auto;

  div {
    position: absolute;
    top: 1px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #888;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    will-change: auto;

    &:nth-child(1) {
      left: 8px;
      animation: ellipsis1 0.5s infinite;
    }

    &:nth-child(2) {
      left: 8px;
      animation: ellipsis2 0.5s infinite;
    }

    &:nth-child(3) {
      left: 32px;
      animation: ellipsis2 0.5s infinite;
    }

    &:nth-child(4) {
      left: 56px;
      animation: ellipsis3 0.5s infinite;
    }
  }

  &.is-small {
    width: 40px;

    div {
      height: 6px;
      width: 6px;

      &:nth-child(1) {
        left: 4px;
      }

      &:nth-child(2) {
        left: 4px;
        animation: ellipsis2-small 0.5s infinite;
      }

      &:nth-child(3) {
        left: 16px;
        animation: ellipsis2-small 0.5s infinite;
      }

      &:nth-child(4) {
        left: 28px;
      }
    }
  }

  @keyframes ellipsis2-small {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(12px, 0);
    }
  }

  @keyframes ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
}
</style>
