<template>
  <div>
    <div class="flex items-center justify-center text-5xl my-6 gap-5">
      <div>
        <Icon
          name="material-symbols:person"
          width="256"
          height="256"
          style="color: black"
        />
      </div>
      <p>username</p>
    </div>
    <h3 class="text-center">My links</h3>
    <div class="flex flex-col items-center">
      <NuxtLink to="https://www.instagram.com/username" class="link"
        >Instagram</NuxtLink
      >
      <NuxtLink to="/link/2" class="link">Link 2</NuxtLink>
      <NuxtLink to="/link/3" class="link">Link 3</NuxtLink>
    </div>
  </div>
</template>
