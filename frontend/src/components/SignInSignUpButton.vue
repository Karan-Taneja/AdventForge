<template>
    <button 
      :class="[
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
        size === 'small' ? 'text-sm' : 
        size === 'large' ? 'text-lg' : '', 
        variant === 'secondary' ? 'bg-gray-500 hover:bg-gray-700' : '' 
      ]"
      @click="handleClick"
    >
      {{ label }}
    </button>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name:   
   'SignInSignUpButton',
    props: {
      label: {
        type: String,
        required: true
      },
      provider: {
        type: String,
        default: null 
      },
      variant: {
        type: String,
        default: 'primary'
      },
      size: {
        type: String,
        default: 'medium'
      }
    },
    emits: ['click'],
    methods: {
      handleClick() {
        this.$emit('click', this.provider); 
      }
    }
  });
  </script>