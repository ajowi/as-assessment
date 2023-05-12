<script>
    import { Icon, ArrowRight } from "svelte-hero-icons"
</script>
<section class="py-10 items-center justify-center">
    <div class="w-4/6 mx-auto my-6">
        <h1 class="text-3xl font-semibold text-slate-500 text-center mb-10">
            Agile Alliance - Agile Sustainability Assessment
        </h1>
    </div>
    <div class="md:w-4/6 m-auto w-full">
        <div class="w-full">
            <div class="container items-center justify-center">
                <div class="border shadow-2xl rounded-3xl mx-auto px-6 py-6 mb-6">
                    <h2 class="font-normal my-3 text-3xl text-cyan-500 pb-4 border-b-2 border-cyan-500">What is it?</h2>

                    <div class="my-5 justify-self-end mx-auto w-fit">
                        <a href="/agile-sustainability-assessment">
                            <button class="my-5 p-4 rounded-lg border-0 text-center text-xl text-white bg-cyan-500 hover:bg-cyan-600 form-input">
                                Start Now!
                                <Icon src="{ArrowRight}" class="h-6 w-6 ml-1 inline" />
                            </button>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

<style lang="postcss">
:global(html) {
    background-color: theme(colors.gray.100);
}
  </style>