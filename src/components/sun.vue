<template>
	<div>
		<p>sun组件</p>
		<p>来自爷爷辈:{{ $attrs.info }}</p>
		<button @click="$emit('sunchangedata','孙子说爷爷是好人')">点击更改爷爷辈信息</button>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export default class Sun extends Vue {
  
}
</script>

<style>
</style>
