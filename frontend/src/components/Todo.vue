<template>
  <v-list-item>
    <template v-slot:prepend>
      <v-icon icon="mdi-check-circle" :color="isDone ? 'green' : 'red'"/>
    </template>
    <v-list-item-title v-text="description"></v-list-item-title>
    <template v-slot:append>
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-icon icon="mdi-trash-can-outline"
                  v-bind="props"
                  :color="isHovering ? 'red-accent-4' : undefined"/>
        </template>
      </v-hover>
    </template>
  </v-list-item>

</template>

<script lang="ts">
export default {
  name: "Todo"
}

/**
 * Interface must be declared outside script setup, otherwise Volar warning appears
 * (https://github.com/vuejs/language-tools/issues/1232)
 */
interface TodoProps {
  description: string,
  isDone: boolean
}
</script>

<script setup lang="ts">
defineProps<TodoProps>();
</script>

<style scoped>

</style>