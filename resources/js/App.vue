<template>
  <div id="page-wrapper">
    <!-- Header -->
    <div id="header">
      <!-- Nav -->
      <nav id="nav">
        <ul>
          <router-link to="/orders" tag="li" active-class="current" exact
            ><a>Orders</a></router-link
          >
        </ul>
      </nav>
    </div>

    <!-- Highlights -->
    <section class="wrapper style1">
      <div class="container">
        <!-- <h2>This is h3</h2> -->
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>