<script setup>
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div
    class="CustomInput"

  >
    <label :for="name">{{ label }}</label>
    <input
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />
  </div>
</template>

<style scoped>
.CustomInput {
  position: relative;
  margin-bottom: calc(1em * 1.5);
  width: 100%;
}

label {
  display: block;
  margin-bottom: 4px;
  width: 100%;
}

input {
  border-radius: 5px;
  border: 2px solid transparent;
  padding: 15px 10px;
  outline: none;
  background-color: #f2f5f7;
  width: 100%;
  transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
}

input:focus {
  border-color: var(--primary-color);
}

.has-error {
  background-color: var(red);
  color: var(red);
  border: 5px solid red;
}

.has-error :focus {
  border-color: var(--error-color);
}
</style>
