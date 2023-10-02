<template>
  <div class="layout-default">
    <aside class="layout-default__filters">
      <slot name="filters"></slot>
    </aside>

    <main class="layout-default__main">
      <slot></slot>
    </main>

    <div class="layout-default__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "./styles/layout-default";
</style>
