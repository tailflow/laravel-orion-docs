<template>
  <div class="supported-by--container">
    <a href="https://geecko.com?utm_campaign=opensource&utm_source=laravel-orion&utm_medium=docs" target="_blank">
      <img src="https://res.cloudinary.com/dudxt4lp6/image/upload/v1639908579/Laravel%20Orion/logo_geecko_hcuz34.svg"
        width="300">
    </a>
    <a href="https://laraveldaily.com?utm_campaign=opensource&utm_source=laravel-orion&utm_medium=docs" target="_blank">
      <img src="https://res.cloudinary.com/dudxt4lp6/image/upload/v1667408230/Laravel%20Orion/logo_laraveldaily_p3d00p.png"
        height="100">
    </a>
  </div>
</template>

<script>
export default {
  name: "SupportedBy"
}
</script>

<style scoped>
.supported-by--container {
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
}

img {
  margin-right: 2rem;
}

@media only screen and (max-width: 600px)  {
  .supported-by--container {
    flex-direction: column;
    margin-top: unset;
  }

  img {
    margin-right: unset;
    margin-top: 1rem;
  }
}
</style>
