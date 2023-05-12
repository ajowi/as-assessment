<script>
    import "../app.css";
    import { Icon, Bars3 } from "svelte-hero-icons";
    import { onMount } from "svelte";
    import logo from '$lib/assets/logo.png';

    onMount(() => {
        let menu = document.querySelector(".mobile-menu-button");
        const mobileMn = document.querySelector(".mobile-menu ul");
        menu?.addEventListener('click', function(){
            displayMobileMenu(mobileMn)
        }, false);
    });

    /**
	 * @param {Element|null} mobMn
	 */
    function displayMobileMenu(mobMn)
    { 
        mobMn?.classList.toggle("hidden");
    }

</script>
<div class="min-h-screen">
    <div class="bg-white">
    <header class="box-border bg-white px-16 py-4 mx-auto max-w-6xl leading-6">
        <div class="items-center flex space-x-7 justify-between">
            <div class="py-1">
                <a href="/" class="flex items-center py-4 px-2">
                    <img src="{logo}" alt="Logo" class="md:h-20 md:w-20 h-16 w-16 mr-2" />
                </a>
            </div>
            <nav class="py-1">
                <menu class="hidden md:flex items-center space-x-4">
                    <li class="list-none">
                        <a href="/" class="tracking-normal py-2 px-3 font-semibold text-orange-500 hover:text-orange-600 decoration-2 decoration-tetiary content-center h-full">Home</a>
                    </li>
                    <li class="list-none">
                        <a href="/agile-sustainability-assessment" class="tracking-normal py-2 px-3 font-semibold text-orange-500 hover:text-orange-600 decoration-2 decoration-tetiary content-center h-full">Start Assessment</a>
                    </li>
                    <li class="menu-item">
                        <a href="/download-report" class="tracking-normal py-2 px-3 font-semibold text-orange-500 hover:text-orange-600 decoration-2 decoration-tetiary content-center">Sustainability Report</a>
                    </li>
                    <li class="menu-item">
                        <a href="/contact" class="tracking-normal md:shrink-0 py-2 px-3 font-semibold text-orange-500 hover:text-orange-600 decoration-2 decoration-tetiary content-center">Contact</a>
                    </li>
                </menu>
                
            </nav>
            <div class="hidden md:flex justify-self-end py-1">
                <div>
                    <!-- <form>
                        <input type="search" name="search" class="h-9 border rounded-3xl bg-white border-primary px-3" placeholder="Search..." />
                    </form> -->
                </div>    
            </div>
            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
                <button class="outline-none mobile-menu-button">
                    <Icon src="{Bars3}" class="h-6 w-6 text-primary" />
                </button>
            </div>
        </div>
        <div class="mobile-menu">
            <ul class="hidden">
                <li class="active">
                    <a href="/" class="block tracking-normal py-2 px-3 font-semibold text-orange-500 hover:text-orange-600 hover:underline hover:underline-offset-4 hover:decoration-tetiary hover:decoration-2">Home</a>
                </li>
                <li class="active">
                    <a href="/agile-sustainability-assessment" class="block tracking-normal py-2 px-3 font-semibold text-orange-500 hover:text-orange-600 hover:underline hover:underline-offset-4 hover:decoration-tetiary hover:decoration-2">Start Assessment</a>
                </li>
                <li class="">
                    <a href="/download-report" class="block tracking-normal py-2 px-3 font-semibold text-orange-500 hover:text-orange-600 hover:underline hover:underline-offset-4 hover:decoration-tetiary hover:decoration-2">Sustainability Report</a>
                </li>
                <li class="">
                    <a href="/contact" class="block tracking-normal md:shrink-0 py-2 px-3 font-semibold text-orange-500 hover:text-orange-600 hover:underline hover:underline-offset-4 hover:decoration-tetiary hover:decoration-2">Contact</a>
                </li>
            </ul>
        </div>
    </header>
</div>
    <main>
        <slot />
    </main>
    <footer>

    </footer>
</div>