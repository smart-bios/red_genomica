export default function ({ store }) {
    // check if server refreshed the token and retrive it
    this.$store.dispatch("autoLogin");
}