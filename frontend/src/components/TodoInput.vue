<template>
  <v-text-field
      :autofocus="autofocus"
      style="width: 300px"
      v-model="description"
      :rules="[rules.required]"
      variant="solo"
      counter="16"
      placeholder="Faire les courses"
      maxlength="16"
      :hint="hintMessage"
      @update:focused="updateHintMessageOnFocus"
      @keyup.enter="validate">
  </v-text-field>
</template>

<script lang="ts">
export default {
  name: "TodoInput"
}

</script>

<script setup lang="ts">
import {ref, watch} from "vue";
import {HintMessages} from "@/types/hintMessages";
import {onBeforeMount} from "vue";

const hintMessage = ref<HintMessages>(HintMessages.HIDDEN);
const description = ref<string>("");
const props = defineProps({
  autofocus: {type: Boolean, default: false},
  latestDescription: {type: String, default: ""},
  onSuccess: Boolean,
});


const emit = defineEmits<{
  (e: 'validate', value: string): void
}>()

onBeforeMount(async () => {
  description.value = props.latestDescription;
})

function updateHintMessageOnFocus(isFocused: boolean) {
  hintMessage.value = isFocused ? HintMessages.INFO : HintMessages.HIDDEN;
}

const rules = ref({
  required: (value: string) => !!value || 'Veuillez renseigner la tâche',
})

function validate() {
  if (description.value &&
      description.value !== "" &&
      description.value !== props.latestDescription) {
    emit('validate', description.value)
  }
}

watch(() => props.onSuccess, (isSuccess) => {
  hintMessage.value = HintMessages.HIDDEN;
  if (isSuccess) {
    hintMessage.value = HintMessages.UPDATE_SUCCESS;
  }
})

</script>

<style scoped>

</style>