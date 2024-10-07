import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import Navbar from '../Navbar.vue';

const routes = [
  { path: '/', component: { template: '<div>Home</div>' } },
  { path: '/auth', component: { template: '<div>Auth</div>' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('Navbar.vue', () => {
  let wrapper;

  beforeEach(async () => {
    router.push('/');
    await router.isReady();
    wrapper = shallowMount(Navbar, {
      global: {
        plugins: [router],
      },
    });
  });

  it('renders the navbar correctly', () => {
    expect(wrapper.find('nav').exists()).toBe(true);
  });

  it('shows "Login/Sign Up" link when not logged in', async () => {
    localStorage.removeItem('logged_in_user');
    wrapper.vm.checkAuthState();
    await wrapper.vm.$nextTick();
    const loginLink = wrapper
      .findAllComponents({ name: 'RouterLink' })
      .find(link => link.props().to === '/auth');
    expect(loginLink).toBeTruthy();
  });
});
