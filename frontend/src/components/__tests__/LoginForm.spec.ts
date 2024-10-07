import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import LoginForm from '../LoginForm.vue';

describe('LoginForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(LoginForm);
  });

  it('renders the login form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('emits an event with user data when form is submitted', async () => {
    const usernameOrEmailInput = wrapper.find('input[type="text"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const form = wrapper.find('form');

    await usernameOrEmailInput.setValue('test@example.com');
    await passwordInput.setValue('password123');

    await form.trigger('submit.prevent');

    expect(wrapper.emitted('login')).toBeTruthy();
    expect(wrapper.emitted('login')[0]).toEqual([
      { usernameOrEmail: 'test@example.com', password: 'password123' },
    ]);
  });

  it('displays an error message when username or email is missing', async () => {
    const form = wrapper.find('form');

    await form.trigger('submit.prevent');

    expect(wrapper.text()).toContain('Username or email is required.');
  });

  it('displays an error message when password is missing', async () => {
    const usernameOrEmailInput = wrapper.find('input[type="text"]');
    const form = wrapper.find('form');

    await usernameOrEmailInput.setValue('test@example.com');
    await form.trigger('submit.prevent');

    expect(wrapper.text()).toContain('Password is required.');
  });

  it('toggles password visibility when button is clicked', async () => {
    const passwordInput = wrapper.find('input[type="password"]');
    const toggleButton = wrapper.find('button[type="button"]');

    expect(passwordInput.attributes('type')).toBe('password');

    await toggleButton.trigger('click');

    expect(passwordInput.attributes('type')).toBe('text');

    await toggleButton.trigger('click');

    expect(passwordInput.attributes('type')).toBe('password');
  });
});
