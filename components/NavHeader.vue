<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/registry/new-york-v4/ui/navigation-menu'

const { path } = useRoute()
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList class="gap-2 *:data-[slot=navigation-menu-item]:h-7 **:data-[slot=navigation-menu-link]:py-1 **:data-[slot=navigation-menu-link]:font-medium">
      <NavigationMenuItem>
        <NavigationMenuLink as-child :data-active="path === '/dashboard'">
          <NuxtLink to="/dashboard">
            Dashboard
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink as-child :data-active="path === '/dashboard/charts'">
          <NuxtLink to="/dashboard/charts">
            Charts
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink as-child :data-active="path === '/dashboard/forms'">
          <NuxtLink to="/dashboard/forms">
            Forms
          </NuxtLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
