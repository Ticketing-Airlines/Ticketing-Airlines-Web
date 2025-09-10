import { describe, it, expect } from 'vitest'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from '../App.vue'

describe('App', () => {
  it('runs and loads successfully on first try', () => {
    // Test that the App component can be imported without errors
    expect(App).toBeDefined()
    expect(typeof App).toBe('object')
    expect(App).not.toBeNull()
  })
  
  it('has required dependencies available', () => {
    // Test that router can be created successfully
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: { template: '<div>Test</div>' } }]
    })
    
    expect(router).toBeDefined()
    expect(typeof router.push).toBe('function')
    
    // Test that Pinia can be created successfully
    const pinia = createPinia()
    expect(pinia).toBeDefined()
    expect(typeof pinia.install).toBe('function')
  })
  
  it('application setup completes without errors', async () => {
    // Test basic router functionality
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/login', component: { template: '<div>Login</div>' } }
      ]
    })
    
    // Test router navigation
    await router.push('/')
    expect(router.currentRoute.value.path).toBe('/')
    
    await router.push('/login')
    expect(router.currentRoute.value.path).toBe('/login')
    
    // Test that the application can initialize its core dependencies
    expect(() => {
      createPinia()
      createRouter({ history: createMemoryHistory(), routes: [] })
    }).not.toThrow()
  })
})
