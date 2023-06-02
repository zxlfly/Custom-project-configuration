<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps<{ msg: string; fullName: string }>()
const count = ref(0)
const add = () => {
	count.value += 1
	console.log(count.value)
}
const arr = computed(() => [0, 1, 2, 3])
const a = arr.value.length
console.log(a)
</script>

<template>
	<h1>{{ msg }}</h1>
	<h2>{{ a }}</h2>
	<div class="card">
		<button type="button" @click="add">count is {{ count }}</button>
		<p>
			Edit
			<code>components/HelloWorld.vue</code> to test HMR
		</p>
	</div>

	<p>
		Check out
		<a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
			>create-vue</a
		>, the official Vue + Vite starter
	</p>
	<p>
		Install
		<a href="https://github.com/vuejs/language-tools" target="_blank">
			Volar
		</a>
		in your IDE for a better DX
	</p>
	<p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
