<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'vue-property-decorator'

@Component
export default class About extends Vue {
  @Provide() public name = 'About'
  @Provide() public msg = 'about'

  created (): void {
    // getAccessToken().then(() => {
    // getTicket().then((res) => {
    //   console.info(res)
    //   debugger
    //   // let sig = getSignature()
    // })
    // })
  }

  mounted () {
    console.info('mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
