<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Users, Plus, Search, Edit, Trash2, Shield, Mail, Phone, X } from 'lucide-vue-next'
import { users, userRoles } from '@/data/mockData'
import type { User, Role } from '@/interfaces/interfaces'

const searchQuery = ref('')
const selectedRole = ref<Role | 'All'>('All')
const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isManageRolesModalOpen = ref(false)
const selectedUser = ref<User | null>(null)

// Form data
const formData = ref({
  email: '',
  name: '',
  phone: ''
})

const userRolesData = ref<{ userId: number; roles: Role[] }>({
  userId: 0,
  roles: []
})

const roles: Role[] = ['Admin', 'Scheduler', 'Agent', 'Customer']

const getUserRoles = (userId: number): Role[] => {
  return userRoles.filter((ur) => ur.userId === userId).map((ur) => ur.role)
}

const filteredUsers = computed(() => {
  let filtered = users

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (user) =>
        user.email.toLowerCase().includes(query) ||
        user.name.toLowerCase().includes(query) ||
        user.phone?.toLowerCase().includes(query)
    )
  }

  if (selectedRole.value !== 'All') {
    filtered = filtered.filter((user) => getUserRoles(user.userId).includes(selectedRole.value as Role))
  }

  return filtered
})

const openCreateModal = () => {
  formData.value = {
    email: '',
    name: '',
    phone: ''
  }
  isCreateModalOpen.value = true
}

const openEditModal = (user: User) => {
  selectedUser.value = user
  formData.value = {
    email: user.email,
    name: user.name,
    phone: user.phone || ''
  }
  isEditModalOpen.value = true
}

const openManageRolesModal = (user: User) => {
  selectedUser.value = user
  userRolesData.value = {
    userId: user.userId,
    roles: getUserRoles(user.userId)
  }
  isManageRolesModalOpen.value = true
}

const closeModal = () => {
  isCreateModalOpen.value = false
  isEditModalOpen.value = false
  isManageRolesModalOpen.value = false
  selectedUser.value = null
}

const handleCreate = () => {
  console.log('Creating user:', formData.value)
  // TODO: Implement actual create logic
  closeModal()
}

const handleUpdate = () => {
  console.log('Updating user:', selectedUser.value?.userId, formData.value)
  // TODO: Implement actual update logic
  closeModal()
}

const handleUpdateRoles = () => {
  console.log('Updating roles:', userRolesData.value)
  // TODO: Implement actual update roles logic
  closeModal()
}

const handleDelete = (userId: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    console.log('Deleting user:', userId)
    // TODO: Implement actual delete logic
  }
}

const toggleRole = (role: Role) => {
  const index = userRolesData.value.roles.indexOf(role)
  if (index > -1) {
    userRolesData.value.roles.splice(index, 1)
  } else {
    userRolesData.value.roles.push(role)
  }
}

const getRoleBadgeColor = (role: Role) => {
  const colors: Record<Role, string> = {
    Admin: 'text-red-600 bg-red-50',
    Scheduler: 'text-blue-600 bg-blue-50',
    Agent: 'text-green-600 bg-green-50',
    Customer: 'text-gray-600 bg-gray-50'
  }
  return colors[role]
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Users & Roles Management</h1>
        <p class="mt-2 text-sm text-gray-600">
          View users, assign roles, and manage permissions
        </p>
      </div>
      <Button @click="openCreateModal" class="flex items-center space-x-2">
        <Plus class="w-4 h-4" />
        <span>Add User</span>
      </Button>
    </div>

    <!-- Filters -->
    <Card>
      <CardContent class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              v-model="searchQuery"
              placeholder="Search by name, email, or phone..."
              class="pl-10"
            />
          </div>
          <Select v-model="selectedRole">
            <SelectTrigger>
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Roles</SelectItem>
              <SelectItem v-for="role in roles" :key="role" :value="role">
                {{ role }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    <!-- Users Table -->
    <Card>
      <CardContent class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roles
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in filteredUsers" :key="user.userId" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span class="text-white text-sm font-medium">
                        {{ user.name.charAt(0) }}
                      </span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                      <div class="text-xs text-gray-500">ID: {{ user.userId }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center text-sm text-gray-900 mb-1">
                    <Mail class="w-4 h-4 mr-2 text-gray-400" />
                    {{ user.email }}
                  </div>
                  <div v-if="user.phone" class="flex items-center text-xs text-gray-500">
                    <Phone class="w-3 h-3 mr-2 text-gray-400" />
                    {{ user.phone }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="role in getUserRoles(user.userId)"
                      :key="role"
                      :class="[
                        'inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full',
                        getRoleBadgeColor(role)
                      ]"
                    >
                      {{ role }}
                    </span>
                    <span
                      v-if="getUserRoles(user.userId).length === 0"
                      class="text-xs text-gray-400 italic"
                    >
                      No roles assigned
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(user.createdAt).toLocaleDateString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="openManageRolesModal(user)"
                    class="text-purple-600 hover:text-purple-900 mr-3"
                    title="Manage Roles"
                  >
                    <Shield class="w-4 h-4" />
                  </button>
                  <button
                    @click="openEditModal(user)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                    title="Edit"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="handleDelete(user.userId)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="filteredUsers.length === 0" class="text-center py-12 text-gray-500">
            <Users class="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No users found</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Create/Edit User Modal -->
    <div
      v-if="isCreateModalOpen || isEditModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <Card class="w-full max-w-lg">
        <CardHeader class="flex flex-row items-center justify-between">
          <CardTitle>{{ isCreateModalOpen ? 'Create New User' : 'Edit User' }}</CardTitle>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="name">Full Name</Label>
            <Input id="name" v-model="formData.name" placeholder="John Doe" />
          </div>

          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input id="email" v-model="formData.email" type="email" placeholder="john@example.com" />
          </div>

          <div class="space-y-2">
            <Label for="phone">Phone Number</Label>
            <Input id="phone" v-model="formData.phone" placeholder="+63 912 345 6789" />
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <Button variant="outline" @click="closeModal">Cancel</Button>
            <Button @click="isCreateModalOpen ? handleCreate() : handleUpdate()">
              {{ isCreateModalOpen ? 'Create User' : 'Update User' }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Manage Roles Modal -->
    <div
      v-if="isManageRolesModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click.self="closeModal"
    >
      <Card class="w-full max-w-lg">
        <CardHeader class="flex flex-row items-center justify-between">
          <CardTitle>Manage Roles - {{ selectedUser?.name }}</CardTitle>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-3">
            <Label>Select Roles</Label>
            <div class="space-y-2">
              <div
                v-for="role in roles"
                :key="role"
                class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                @click="toggleRole(role)"
              >
                <div class="flex items-center space-x-3">
                  <div
                    :class="[
                      'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                      userRolesData.roles.includes(role)
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    ]"
                  >
                    <svg
                      v-if="userRolesData.roles.includes(role)"
                      class="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ role }}</p>
                    <p class="text-xs text-gray-500">
                      {{
                        role === 'Admin'
                          ? 'Full system access'
                          : role === 'Scheduler'
                            ? 'Manage flight schedules'
                            : role === 'Agent'
                              ? 'Handle bookings and check-ins'
                              : 'Standard customer access'
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <Button variant="outline" @click="closeModal">Cancel</Button>
            <Button @click="handleUpdateRoles">Update Roles</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
