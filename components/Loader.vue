<template>
  <div class="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style lang="scss">
.loader {
  margin: 0 auto;
  position: relative;
  width: 80px;
  height: 35px;

  div {
    position: absolute;
    top: 1px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #888;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

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
