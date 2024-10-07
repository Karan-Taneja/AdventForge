import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Auth from '@/pages/Auth.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Mock components
vi.mock('@/components/LoginForm.vue', () => ({
  default: {
    name: 'LoginForm',
    template: '<div class="login-form"></div>',
  },
}));

vi.mock('@/components/SignUpForm.vue', () => ({
  default: {
    name: 'SignUpForm',
    template: '<div class="sign-up-form"></div>',
  },
}));

describe('Auth.vue', () => {
  let router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [],
    });
    vi.spyOn(router, 'push').mockImplementation(() => {});
  });

  it('renders LoginForm and SignUpForm components', () => {
    const wrapper = mount(Auth, {
      global: {
        plugins: [router],
        stubs: {
          LoginForm: true,
          SignUpForm: true,
        },
      },
    });

    expect(wrapper.find('login-form-stub').exists()).toBe(true);
    expect(wrapper.find('sign-up-form-stub').exists()).toBe(true);
  });

  it('redirects to home page if logged_in_user is found in local storage', () => {
    // Mock local storage
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      if (key === 'logged_in_user') {
        return 'user';
      }
      return null;
    });

    mount(Auth, {
      global: {
        plugins: [router],
      },
    });

    expect(router.push).toHaveBeenCalledWith('/');
  });

  it('does not redirect if logged_in_user is not found in local storage', () => {
    // Mock local storage
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null);

    mount(Auth, {
      global: {
        plugins: [router],
      },
    });

    expect(router.push).not.toHaveBeenCalled();
  });
});
