import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import SignUpForm from '../SignUpForm.vue';

describe('SignUpForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SignUpForm);
  });

  it('renders the sign-up form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('emits an event with user data when form is submitted', async () => {
    const usernameInput = wrapper.find('input[type="text"]');
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const form = wrapper.find('form');

    await usernameInput.setValue('testuser');
    await emailInput.setValue('test@example.com');
    await passwordInput.setValue('password123');

    await form.trigger('submit.prevent');

    expect(wrapper.emitted('signUp')).toBeTruthy();
    expect(wrapper.emitted('signUp')[0]).toEqual([
      {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      },
    ]);
  });

  it('displays an error message when username is missing', async () => {
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const form = wrapper.find('form');

    await emailInput.setValue('test@example.com');
    await passwordInput.setValue('password123');
    await form.trigger('submit.prevent');

    expect(wrapper.text()).toContain('Username is required.');
  });

  it('displays an error message when email is missing', async () => {
    const usernameInput = wrapper.find('input[type="text"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const form = wrapper.find('form');

    await usernameInput.setValue('testuser');
    await passwordInput.setValue('password123');
    await form.trigger('submit.prevent');

    expect(wrapper.text()).toContain('Email is required.');
  });

  it('displays an error message when password is missing', async () => {
    const usernameInput = wrapper.find('input[type="text"]');
    const emailInput = wrapper.find('input[type="email"]');
    const form = wrapper.find('form');

    await usernameInput.setValue('testuser');
    await emailInput.setValue('test@example.com');
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
