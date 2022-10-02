<script lang="ts">
  import Images from '/images.svg';
</script>

<header class="navbar justify-content-start ps-3">
  <span class="navbar-brand"><img src={Images} alt="" /> ImgConv{' '}</span>
  <a class="nav-link" href="/">Start</a>
  <a class="nav-link" href="/about">Über</a>
</header>

<style>
  .navbar {
  background-color: #00818b;
  border-bottom: 1px solid black;
}

.navbar-brand {
  color: #fff !important;
  margin: 0 .5rem 0 0;
}

.navbar-brand img {
  filter: invert(1);
}

.navbar-brand::after {
    content: ' |';
}


a.nav-link {
  color: white !important;
  text-transform: uppercase;
  padding: 0 .5rem;
  font-weight: bold;
}

a.nav-link:link, a:active {
    color: white !important;
}

a.nav-link:hover {
  text-decoration: underline;
  color: white !important;
}
</style>