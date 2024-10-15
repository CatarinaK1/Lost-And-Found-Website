<script>
    export default {
    props: {
        text: {
        type: String,
        required: true
        },
        linkText: {
        type: String,
        required: true
        },
        linkTo: {
        type: String,
        required: true
        }
    }
    }
</script>

<style scoped>
    .Register-Now-Link {
    text-align: center;
    margin-top: 40px;
    }

    .link {
    color: #42b983;
    font-weight: bold;
    text-decoration: none;
    }

    .link:hover {
    text-decoration: underline;
    }
</style>


<template>
    <div class="Register-Now-Link">
      <p>{{ text }}</p>
      <router-link :to="linkTo" class="link">
        {{ linkText }}
      </router-link>
    </div>
  </template>
  
