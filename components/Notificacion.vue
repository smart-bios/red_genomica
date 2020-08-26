<template>
    <b-alert show dismissible variant="danger" style="max-width: 30rem;"> {{ message }} <b>&rArr;</b></b-alert>
</template>

<script>
export default {
  name: 'Notification',
  props: ['message']
}
</script>