<template>
    <div class="Film">
        <h4>{{ film.title }}</h4>
        <p>{{ film.director }}</p>
        <p>{{ film.producer }}</p>
        <p>{{ film.release_date }}</p>
    </div>
</template>

<script>
export default {
    name: 'AppFilm',
    props: {
        film: { type: Object, required: true },
    },
}
</script>

<style lang="scss" scoped>
.Film {
    width: 100%;
    height: 250px;
    border: 2px solid #eee;
    padding: 10px;
}
</style>


