<template>
    <div class="lds-facebook"><div></div><div></div><div></div></div>
</template>

<style scoped>
  .lds-facebook {
  display: inline-block;
  position: relative;
  width: 4em;
  height: 4em;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: .5em;
  width: 1em;
  background: #fff;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: .5em;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 2em;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 3.5em;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: .5em;
    height: 4em;
  }
  50%, 100% {
    top: 1.5em;
    height: 2em;
  }
}
</style>
