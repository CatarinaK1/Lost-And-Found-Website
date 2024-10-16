<script>
    export default {
    props: {
        image: {
        type: String,
        required: true
        },
        header: {
        type: String,
        required: true
        },
        text: {
        type: Array,
        required: true
        }
    }
    }
</script>



<style scoped>


/* Outer wrapper for controlling the background and spacing */
.about-mission-wrapper {
  background-color: #56B040;
  width: 100vw; /* Make background cover the full width */
  margin-left: calc(-50vw + 50%); /* Center it while keeping full width */
  padding: 60px 0; /* Increase padding for vertical space */
  overflow-x: hidden; /* Prevent horizontal scroll on small screens */
}

.about-mission-section {
  background-color: #56B040;
  display: flex;
  flex-direction: row; /* Default: display elements side by side */
  align-items: center;
  justify-content: space-between;
  margin-top: 10%;
  margin-bottom: 10%;
  flex-wrap: wrap; /* Ensure content wraps if necessary */
  max-width: 1200px; /* Limit the content width */
  margin: 0 auto; /* Center the content */
  padding: 0 20px; /* Optional padding for content inside */
}



/* Image section */
/* Wrapper to position the box and image */
.image-wrapper {
  position: relative;
  width: 50%; /* Adjust to fit */
}

/* The box behind the image */
.image-background {
  position: absolute;
  top: -30px; /* Adjust to move it slightly up */
  right: -30px; /* Adjust to move it slightly left */
  width: 80%;
  height: 100%;
  background-color: #ffff; /* Background color for the box */
  z-index: 1; /* Box goes below the image */
  border-radius: 5px; /* Optional: Add rounded corners */
}

/* The image itself */
.about-image {
  position: relative;
  width: 80%; /* Make image fit its container */
  height: auto;
  z-index: 2; /* Image goes above the background box */
}

/* Text section */
.text-section {
  width: 45%; /* Takes up remaining space */
  /* text-align: left; Align text to the left */
  padding: 0 20px;
}

h2 {
    font-size: 60px;
  margin-bottom: 10px;
}

hr {
  /* width: 100px; */
  border: 3px solid #ffff;
  margin-bottom: 10px;
}

p{
    margin-top: 4%;

}

</style>



<template>
  <div class="about-mission-wrapper">
    <div class="about-mission-section">
      <div class="text-section">
        <h2>{{ header }}</h2>
        <hr />
        <p v-for="(paragraph, index) in text" :key="index">{{ paragraph }}</p>
      </div>
      <div class="image-wrapper">
        <div class="image-background"></div> <!-- Box behind the image -->
        <img :src="image" alt="About Section Image" class="about-image" />
      </div>
    </div>
  </div>
</template>

  
