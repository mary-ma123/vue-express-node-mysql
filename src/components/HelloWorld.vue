<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>hello hello</p>
	<Sun v-bind="$attrs" v-on="$listeners"></Sun>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Sun from "./sun.vue"; // @ is an alias to /src

@Component({
	components:{
		Sun
	}
})
export default class HelloWorld extends Vue {
	inheritAttrs = false;
	@Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
