<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const category = ref('');
const name = ref('');
const startDate = ref('');
const endDate = ref('');

const emit = defineEmits(['filter-changed']);

watch([category, name, startDate, endDate], () => {
  emit('filter-changed', { category: category.value, name: name.value, startDate: startDate.value, endDate: endDate.value });
});
</script>

<template>
  <div class="filter-menu flex items-center justify-start space-x-4 p-4 bg-gray-100 rounded-lg mb-4">
    <div class="flex-grow">
      <label class="block text-gray-700 mb-1">Category:</label>
      <select v-model="category" class="border p-2 rounded w-full">
        <option value="">All Categories</option>
        <option v-for="option in props.categories" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>

    <div class="flex-grow">
      <label class="block text-gray-700 mb-1">Name:</label>
      <input
        v-model="name"
        type="text"
        placeholder="Enter name"
        class="border p-2 rounded w-full"
      />
    </div>

    <div class="flex-grow">
      <label class="block text-gray-700 mb-1">Start Date:</label>
      <input
        v-model="startDate"
        type="date"
        class="border p-2 rounded w-full"
      />
    </div>

    <div class="flex-grow">
      <label class="block text-gray-700 mb-1">End Date:</label>
      <input
        v-model="endDate"
        type="date"
        class="border p-2 rounded w-full"
      />
    </div>
  </div>
</template>

<style scoped>
.filter-menu {
  max-width: 100%;
}
</style>