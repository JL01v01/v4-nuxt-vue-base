<script setup lang="ts">
import { Package, TrendingUp, Clock, CheckCircle, MapPin, Search, Plus, Calendar, Truck, ArrowUpRight, AlertCircle } from 'lucide-vue-next'

// Mock data for courier dashboard
const stats = [
  {
    title: 'Total Shipments',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Package,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30'
  },
  {
    title: 'In Transit',
    value: '184',
    change: '+8.2%',
    trend: 'up',
    icon: Truck,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30'
  },
  {
    title: 'Delivered Today',
    value: '89',
    change: '+23.1%',
    trend: 'up',
    icon: CheckCircle,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/30'
  },
  {
    title: 'Pending Pickup',
    value: '24',
    change: '-4.3%',
    trend: 'down',
    icon: Clock,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30'
  }
]

const recentShipments = [
  {
    trackingNumber: 'DHL8472639185',
    status: 'In Transit',
    statusColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30',
    destination: 'New York, USA',
    estimatedDelivery: '2025-10-22',
    sender: 'Tech Supplies Inc.',
    progress: 65
  },
  {
    trackingNumber: 'DHL2847561920',
    status: 'Out for Delivery',
    statusColor: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30',
    destination: 'London, UK',
    estimatedDelivery: '2025-10-21',
    sender: 'Global Trading Co.',
    progress: 90
  },
  {
    trackingNumber: 'DHL5938274615',
    status: 'Delivered',
    statusColor: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30',
    destination: 'Tokyo, Japan',
    estimatedDelivery: '2025-10-20',
    sender: 'Express Parts Ltd.',
    progress: 100
  },
  {
    trackingNumber: 'DHL7261849302',
    status: 'Processing',
    statusColor: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30',
    destination: 'Berlin, Germany',
    estimatedDelivery: '2025-10-23',
    sender: 'Manufacturing Hub',
    progress: 25
  },
  {
    trackingNumber: 'DHL4829561037',
    status: 'In Transit',
    statusColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30',
    destination: 'Sydney, Australia',
    estimatedDelivery: '2025-10-24',
    sender: 'Pacific Imports',
    progress: 55
  }
]

const activeDeliveries = [
  {
    tracking: 'DHL2847561920',
    destination: 'London, UK',
    currentLocation: 'Distribution Center - London',
    timeline: [
      { status: 'Order Placed', time: '10:30 AM', date: 'Oct 19', completed: true },
      { status: 'Picked Up', time: '2:15 PM', date: 'Oct 19', completed: true },
      { status: 'In Transit', time: '8:45 AM', date: 'Oct 20', completed: true },
      { status: 'Out for Delivery', time: '7:20 AM', date: 'Oct 21', completed: true },
      { status: 'Delivered', time: 'Expected 2:00 PM', date: 'Oct 21', completed: false }
    ]
  },
  {
    tracking: 'DHL8472639185',
    destination: 'New York, USA',
    currentLocation: 'International Hub - Frankfurt',
    timeline: [
      { status: 'Order Placed', time: '9:00 AM', date: 'Oct 20', completed: true },
      { status: 'Picked Up', time: '11:30 AM', date: 'Oct 20', completed: true },
      { status: 'In Transit', time: '6:15 PM', date: 'Oct 20', completed: true },
      { status: 'Customs Clearance', time: 'In Progress', date: 'Oct 21', completed: false },
      { status: 'Delivered', time: 'Expected Tomorrow', date: 'Oct 22', completed: false }
    ]
  }
]

const quickActions = [
  {
    title: 'Create Shipment',
    description: 'Create a new shipment order',
    icon: Plus,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-950/50'
  },
  {
    title: 'Track Package',
    description: 'Track your shipment status',
    icon: Search,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    hoverColor: 'hover:bg-green-100 dark:hover:bg-green-950/50'
  },
  {
    title: 'Schedule Pickup',
    description: 'Schedule a package pickup',
    icon: Calendar,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    hoverColor: 'hover:bg-purple-100 dark:hover:bg-purple-950/50'
  }
]
</script>

<template>
  <div class="flex flex-1 flex-col gap-6 p-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p class="text-muted-foreground mt-1">Welcome back! Here's your shipment overview</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
          <Calendar class="h-4 w-4" />
          <span>Last 30 days</span>
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-muted-foreground">{{ stat.title }}</p>
            <div class="flex items-baseline gap-2 mt-2">
              <h3 class="text-3xl font-bold tracking-tight">{{ stat.value }}</h3>
              <span
                :class="[
                  'text-xs font-medium',
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                ]"
              >
                {{ stat.change }}
              </span>
            </div>
          </div>
          <div :class="['rounded-lg p-3', stat.bgColor]">
            <component :is="stat.icon" :class="['h-6 w-6', stat.color]" />
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid gap-4 md:grid-cols-3">
      <button
        v-for="action in quickActions"
        :key="action.title"
        :class="[
          'rounded-xl border bg-card p-6 text-left shadow-sm transition-all',
          action.hoverColor,
          'hover:shadow-md hover:scale-[1.02]'
        ]"
      >
        <div class="flex items-start gap-4">
          <div :class="['rounded-lg p-3', action.bgColor]">
            <component :is="action.icon" :class="['h-5 w-5', action.color]" />
          </div>
          <div class="flex-1">
            <h4 class="font-semibold">{{ action.title }}</h4>
            <p class="text-sm text-muted-foreground mt-1">{{ action.description }}</p>
          </div>
          <ArrowUpRight class="h-4 w-4 text-muted-foreground" />
        </div>
      </button>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Recent Shipments -->
      <div class="rounded-xl border bg-card shadow-sm">
        <div class="p-6 border-b">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold">Recent Shipments</h3>
              <p class="text-sm text-muted-foreground mt-1">Track your latest deliveries</p>
            </div>
            <button class="text-sm font-medium text-primary hover:underline">View All</button>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div
              v-for="shipment in recentShipments"
              :key="shipment.trackingNumber"
              class="rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-mono text-sm font-semibold">{{ shipment.trackingNumber }}</span>
                    <span
                      :class="[
                        'text-xs px-2 py-0.5 rounded-full font-medium',
                        shipment.statusColor
                      ]"
                    >
                      {{ shipment.status }}
                    </span>
                  </div>
                  <p class="text-sm text-muted-foreground">{{ shipment.sender }}</p>
                </div>
              </div>

              <div class="flex items-center gap-2 text-sm mb-3">
                <MapPin class="h-4 w-4 text-muted-foreground" />
                <span>{{ shipment.destination }}</span>
                <span class="text-muted-foreground">•</span>
                <Calendar class="h-4 w-4 text-muted-foreground" />
                <span class="text-muted-foreground">{{ shipment.estimatedDelivery }}</span>
              </div>

              <!-- Progress Bar -->
              <div class="relative pt-1">
                <div class="flex mb-2 items-center justify-between">
                  <div>
                    <span class="text-xs font-semibold inline-block text-muted-foreground">
                      Progress
                    </span>
                  </div>
                  <div class="text-right">
                    <span class="text-xs font-semibold inline-block">
                      {{ shipment.progress }}%
                    </span>
                  </div>
                </div>
                <div class="overflow-hidden h-2 text-xs flex rounded-full bg-muted">
                  <div
                    :style="{ width: shipment.progress + '%' }"
                    :class="[
                      'shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500',
                      shipment.progress === 100 ? 'bg-green-500' : shipment.progress >= 75 ? 'bg-blue-500' : 'bg-amber-500'
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Deliveries Timeline -->
      <div class="rounded-xl border bg-card shadow-sm">
        <div class="p-6 border-b">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold">Active Deliveries</h3>
              <p class="text-sm text-muted-foreground mt-1">Real-time tracking updates</p>
            </div>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-6">
            <div
              v-for="delivery in activeDeliveries"
              :key="delivery.tracking"
              class="rounded-lg border p-4"
            >
              <div class="flex items-center justify-between mb-4">
                <div>
                  <span class="font-mono text-sm font-semibold">{{ delivery.tracking }}</span>
                  <div class="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin class="h-3 w-3" />
                    <span>{{ delivery.destination }}</span>
                  </div>
                </div>
                <Truck class="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>

              <div class="flex items-center gap-2 mb-4 p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                <AlertCircle class="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span class="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {{ delivery.currentLocation }}
                </span>
              </div>

              <!-- Timeline -->
              <div class="space-y-3">
                <div
                  v-for="(event, index) in delivery.timeline"
                  :key="index"
                  class="flex gap-3"
                >
                  <div class="flex flex-col items-center">
                    <div
                      :class="[
                        'h-2 w-2 rounded-full border-2',
                        event.completed
                          ? 'bg-green-500 border-green-500'
                          : 'bg-background border-muted-foreground/30'
                      ]"
                    />
                    <div
                      v-if="index < delivery.timeline.length - 1"
                      :class="[
                        'w-0.5 h-8 mt-1',
                        event.completed ? 'bg-green-500' : 'bg-border'
                      ]"
                    />
                  </div>
                  <div class="flex-1 pb-2">
                    <div class="flex items-baseline justify-between">
                      <span
                        :class="[
                          'text-sm font-medium',
                          event.completed ? 'text-foreground' : 'text-muted-foreground'
                        ]"
                      >
                        {{ event.status }}
                      </span>
                      <span class="text-xs text-muted-foreground">
                        {{ event.time }} • {{ event.date }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alerts Section -->
    <div class="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900 p-6">
      <div class="flex items-start gap-4">
        <div class="rounded-lg p-2 bg-amber-100 dark:bg-amber-900/50">
          <AlertCircle class="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div class="flex-1">
          <h4 class="font-semibold text-amber-900 dark:text-amber-100">Attention Required</h4>
          <p class="text-sm text-amber-800 dark:text-amber-200 mt-1">
            3 shipments require customs documentation. Please upload the necessary documents to avoid delays.
          </p>
          <button class="mt-3 text-sm font-medium text-amber-900 dark:text-amber-100 hover:underline">
            Review Shipments →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
