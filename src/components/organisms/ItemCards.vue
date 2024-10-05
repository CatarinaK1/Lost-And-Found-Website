<script setup>
import ItemCard from '@/components/molecules/ItemCard.vue';
import FilterMenu from '@/components/molecules/FilterMenu.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const found_items = ref([]);
const filtered_items = ref([]);
const filters = ref({ category: '', name: '', startDate: '', endDate: '' });
const categoryOptions = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('/api/found_items');
    found_items.value = response.data;
    filtered_items.value = found_items.value;


    const categories = new Set(found_items.value.map(item => item.category));
    categoryOptions.value = Array.from(categories);
  } catch (error) {
    console.error('Error fetching items', error);
  }
});

const applyFilters = () => {
  filtered_items.value = found_items.value.filter((item) => {
    const matchesCategory = filters.value.category ? item.category === filters.value.category : true;

    const matchesName = filters.value.name ? item.name.includes(filters.value.name) : true;

    const matchesStartDate = filters.value.startDate ? new Date(item.found_date) >= new Date(filters.value.startDate) : true;
    const matchesEndDate = filters.value.endDate ? new Date(item.found_date) <= new Date(filters.value.endDate) : true;

    return matchesCategory && matchesName && matchesStartDate && matchesEndDate;
  });
};

const onFilterChanged = (newFilters) => {
  filters.value = newFilters;
  applyFilters();
};
</script>

<template>
  <section class="bg-my-white px-8 py-10">
    <FilterMenu :categories="categoryOptions" @filter-changed="onFilterChanged" />

    <div class="m-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <ItemCard v-for="item in filtered_items" :key="item.id" :details="item" />
      </div>
    </div>
  </section>
</template>