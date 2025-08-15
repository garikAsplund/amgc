<script lang="ts">
  import SuperDebug, { superForm } from 'sveltekit-superforms';
  import { schema } from '$lib/schema';
  import { zod } from 'sveltekit-superforms/adapters';
  import { Mail } from 'lucide-svelte';

  let { data } = $props();
  let isLoading = $state(false);
  let { form, errors, message, enhance } = superForm(data.form, {
    validators: zod(schema),
    schema,
    dataType: 'json'
  });

  async function handleSubmit() {
    isLoading = true;
  }
</script>

<section class="flex flex-col items-center dark:bg-current">
  <div class="my-8 w-full max-w-md space-y-6 px-4">
    <h2 class="text-center text-lg font-semibold dark:text-gray-100">
      Sign up for our newsletter!
    </h2>

    {#if $message}
      <p class="rounded bg-green-700 px-4 py-2 text-center text-sm text-white">
        {$message}
      </p>
    {:else}
      <form
        method="POST"
        use:enhance
        onsubmit={handleSubmit}
        class="flex flex-col space-y-4"
      >
        <div class="flex flex-col">
          <label for="fullName" class="mb-1 font-medium dark:text-gray-100">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            bind:value={$form.fullName}
            required
            disabled={isLoading}
            class="rounded-md border bg-white/90 px-3 py-2 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800/90 dark:text-gray-100"
          />
          {#if errors.fullName}
            <p class="mt-1 text-sm text-red-600">{errors.fullName}</p>
          {/if}
        </div>

        <div class="flex flex-col">
          <label for="email" class="mb-1 font-medium dark:text-gray-100">
            Email Address
          </label>
            <input
              id="email"
              type="email"
              name="email"
              bind:value={$form.email}
              required
              autocomplete="email"
              disabled={isLoading}
              class="rounded-md border bg-white/90 py-2 px-3 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800/90 dark:text-gray-100"
            />
          {#if errors.email}
            <p class="mt-1 text-sm text-red-600">{errors.email}</p>
          {/if}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          class=" rounded-md bg-green-700 px-4 py-2 font-medium text-white transition hover:bg-green-600 dark:bg-green-700/80"
        >
          {#if isLoading}Submitting...{:else}Subscribe{/if}
        </button>
      </form>
    {/if}

    <div class="mt-4 text-center">
      <a
        href="/newsletters/august-2025.pdf"
        target="_blank"
        class="text-base hover:underline dark:text-gray-100"
      >
        Read our latest newsletter
      </a>
    </div>
  </div>
</section>

<style>
	@media (prefers-color-scheme: dark) {
		input:-webkit-autofill {
			-webkit-box-shadow: 0 0 0px 1000px #1a1a1a inset; /* Sets a custom background color for autofill */
			-webkit-text-fill-color: #f1f1f1; /* Ensures text color stays consistent */
		}

		input:-webkit-autofill:focus {
			-webkit-box-shadow: 0 0 0px 1000px #1a1a1a inset;
			-webkit-text-fill-color: #f1f1f1;
		}
	}
</style>