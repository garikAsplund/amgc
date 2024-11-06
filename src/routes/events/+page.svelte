<script>
  const events = [
    {
      title: "Weddings",
      description: "Our all-in-one venue offers stunning mountain views, full-service catering, and bar service for your perfect day. Choose from all-inclusive packages or venue-only options.",
      icon: "💍"
    },
    {
      title: "Private Events",
      description: "Host your family reunions, bridal & baby showers, retirement parties, and milestone celebrations with scenic Wallowa Mountain views. We provide catering and professional service so you can focus on your guests.",
      icon: "🎉"
    },
    {
      title: "Business Functions",
      description: "Perfect for corporate retreats, fundraisers, and meetings. Professional atmosphere meets mountain beauty.",
      icon: "💼"
    }
  ];
</script>

<section class="max-w-4xl mx-auto px-4 py-12">
  <header class="text-center mb-12">
    <h1 class="text-3xl font-bold mb-4 dark:text-gray-300">More Than Just Golf</h1>
    <p class="text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
      Alpine Meadows hosts unforgettable events against breathtaking mountain views.
      From intimate gatherings to grand celebrations, we provide top-notch catering
      and comprehensive event services.
    </p>
  </header>

  <div class="grid md:grid-cols-3 gap-8">
    {#each events as event}
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div class="text-4xl mb-4 text-center">{event.icon}</div>
        <h2 class="text-xl font-semibold mb-3 text-center dark:text-gray-200">{event.title}</h2>
        <p class="text-gray-600 dark:text-gray-400">{event.description}</p>
      </div>
    {/each}
  </div>

  <div class="mt-12 text-center">
    <p class="text-lg font-medium mb-4 dark:text-gray-300">Call for booking</p>
    <p class="md:hidden">
      <a 
        href="tel:541-426-3246" 
        class="inline-block bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
      >
        Call (541) 426-3246
      </a>
    </p>
    <p class="hidden md:block text-lg dark:text-gray-300">
      (541) 426-3246
    </p>
  </div>
</section>
