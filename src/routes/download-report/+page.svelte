<script>
    // @ts-nocheck
    import { Icon, ArrowRight, InformationCircle, ArrowDownTray, ChartPie, TableCells } from "svelte-hero-icons"
    import Company from "$lib/components/Company.svelte";

    /** @type {import('./$types').PageData} */
    export let data

    /** @type {import('./$types').ActionData} */   
    // export let form
    $: company = data.company
    // export let categories = data.categories
    $: results = data.chartData
    $: assessmentExists = data.assessmentExists
    $: companies = data.companies
    $: answers = data.answers

    let filteredCompanies = [];

    const filterCompanies = () => {
        let storageArr = []
        if (inputValue) {
            companies.forEach(company => {
                if (company.name.toLowerCase().startsWith(inputValue.toLowerCase())) {
                    storageArr = [...storageArr, makeMatchBold(company.name)];
                }
            });
        }
        filteredCompanies = storageArr;
    }	


    /* HANDLING THE INPUT */
    let searchInput; // use with bind:this to focus element
    let inputValue = "";
        
    $: if (!inputValue) {
        filteredCompanies = [];
        hiLiteIndex = null;
    }

    const clearInput = () => {
        inputValue = "";	
        searchInput.focus();
    }
        
    const setInputVal = (companyName) => {
        inputValue = removeBold(companyName);
        filteredCompanies = [];
        hiLiteIndex = null;
        document.querySelector('#company_name').focus();
    }	

    const submitValue = () => {
        if (inputValue) {
            console.log(`${inputValue} is submitted!`);
            setTimeout(clearInput, 1000);
        } else {
            alert("You didn't type anything.")
        }
    }

    const makeMatchBold = (str) => {
        // replace part of (company name === inputValue) with strong tags
        let matched = str.substring(0, inputValue.length);
        let makeBold = `<strong>${matched}</strong>`;
        let boldedMatch = str.replace(matched, makeBold);
        return boldedMatch;
    }

    const removeBold = (str) => {
        //replace < and > all characters between
        return str.replace(/<(.)*?>/g, "");
        // return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
    }	
        

    /* NAVIGATING OVER THE LIST OF COMPANIES W HIGHLIGHTING */	
    let hiLiteIndex = null;
    $: hiLitedCompany = filteredCompanies[hiLiteIndex]; 	
        
    const navigateList = (e) => {
        if (e.key === "ArrowDown" && hiLiteIndex <= filteredCompanies.length-1) {
            hiLiteIndex === null ? hiLiteIndex = 0 : hiLiteIndex += 1
        } else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
            hiLiteIndex === 0 ? hiLiteIndex = filteredCompanies.length-1 : hiLiteIndex -= 1
        } else if (e.key === "Enter") {
            setInputVal(filteredCompanies[hiLiteIndex]);
        } else {
            return;
        }
    } 
</script>

<svelte:window on:keydown={navigateList} />

<section class="py-10 items-center justify-center">
    <div class="w-4/6 mx-auto my-6">
        <!-- {#if form?.failed}
        <div class="w-75 mx-auto my-4 p-4 bg-red-400 text-white">
            <p class="text-center">{form?.message}</p>
        </div>
        {/if} -->
        <h2 class="text-3xl font-semibold text-zinc-500 text-center mb-10">
            {#if !assessmentExists}
                Agile Sustainability Report
            {:else}
                <span class="uppercase text-cyan-500">{(company !== null) ? company.name : ''}</span> - Agile Sustainability Report
            {/if}
        </h2>
    </div>
    <div class="md:w-4/6 m-auto w-full">
        <div class="w-full">
            <div class="container items-center justify-center">
                {#if assessmentExists}
                    <div class="border shadow-2xl rounded-3xl mx-auto px-6 pt-6 pb-20 mb-6">
                        <h2 class="font-normal mb-3 text-2xl text-cyan-500 pb-4 border-b-2 text-center">
                            Thank you for participating!
                            <span class="float-right bg-slate-200 rounded-lg p-1 z-20">
                                <a href="./" class="text-slate-600 hover:text-blue-500"><Icon src="{ChartPie}" class="h-6 w-6 mx-1 inline" /></a>
                                <a href="./" class="text-slate-600  hover:text-blue-500"><Icon src="{TableCells}" class="h-6 w-6 mx-1 inline" /></a>

                            </span>
                            
                        </h2>

                        <div class="my-5 justify-self-end mx-auto w-fit">
                            <!-- <p>{ JSON.stringify(results) }</p> -->
                            {#each results as result, index}
                            <!-- <h4>{result.category}</h4> -->
                            <table class="border-collapse border border-slate-300 shadow-md my-8 bg-white z-20">
                                <caption class="caption-top text-cyan-600 dark:text-slate-400 pb-4 text-sm">
                                    Table { index + 1 } : Overall assessment of your { result.category } sustainability measures.
                                  </caption>
                                <thead class="bg-slate-50">
                                    <tr>
                                        <th class="border border-slate-300 p-3 text-left text-slate-600">{result.category.toUpperCase()} Focus Area</th>
                                        {#each answers as answer}
                                            <th class="border border-slate-300 p-3 text-center text-slate-600">{answer.title}</th>
                                        {/each}
                                    </tr>
                                </thead>
                                <tbody>
                                {#each result.results as companyResult}
                                    {#if result.category == companyResult.question.category}
                                        <tr>
                                            <td class="border border-slate-300 p-3 text-slate-500">{companyResult.question.title}</td>
                                            <!-- {JSON.stringify(companyResult.assessmentAnswers)} -->
                                            <td class="border border-slate-300 p-3 text-center text-slate-500">{companyResult.assessmentAnswers.neverCount}</td>
                                            <td class="border border-slate-300 p-3 text-center text-slate-500">{companyResult.assessmentAnswers.rarelyCount}</td>
                                            <td class="border border-slate-300 p-3 text-center text-slate-500">{companyResult.assessmentAnswers.sometimeCount}</td>
                                            <td class="border border-slate-300 p-3 text-center text-slate-500">{companyResult.assessmentAnswers.oftenCount}</td>
                                            <td class="border border-slate-300 p-3 text-center text-slate-500">{companyResult.assessmentAnswers.alwaysCount}</td>
                                            
                                        </tr>
                                    {/if}
                                {/each}
                                </tbody>
                            </table>
                            {/each}
                            <p class="text-center">
                                <a href="/download-report/{company.name}">
                                    <button class="my-5 p-4 border-0 rounded-lg text-center text-xl text-white bg-cyan-500 hover:bg-cyan-600 form-input">
                                        Download Report
                                        <Icon src="{ArrowDownTray}" class="h-6 w-6 ml-1 inline" />
                                    </button>
                                </a>
                            </p>
                        </div>
                    </div>
                {:else}
                    <form method="POST" class="border shadow-2xl rounded-3xl mx-auto p-6 mb-6">
                        <h2 class="font-normal my-3 text-3xl text-cyan-500 pb-2 border-b-2 border-cyan-500">
                            Get your Report
                            <Icon src="{InformationCircle}" class="h-8 w-8 float-right font-semibold inline" />
                        </h2>
                        <div class="flex place-content-center align-middle gap-6 w-3/4 mx-auto my-10">
                            <label class="text-xl w-8/12 text-slate-500">
                                <!-- <span class="text-gray-700">Company name</span> -->
                                <input type="text" class="
                                    w-full
                                    rounded-lg
                                    border-gray-300
                                    shadow-sm
                                    text-lg
                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                    "
                                    placeholder="Enter your company name"
                                    id="company_name" 
                                    name="company_name" required
                                    bind:this={searchInput}
                                    bind:value={inputValue} 
                                    on:input={filterCompanies}
                                >
                                <!-- FILTERED LIST OF COMPANIES -->
                                {#if filteredCompanies.length > 0}
                                    <ul id="autocomplete-items-list">
                                        {#each filteredCompanies as company, i}
                                            <Company itemLabel={company} highlighted={i === hiLiteIndex} on:click={() => setInputVal(company)} />
                                        {/each}			
                                    </ul>
                                {/if}
                            </label>
                            <button name="submit-form" class="inline h-fit p-3 rounded-lg border-0 text-center text-xl text-white bg-cyan-500 hover:bg-cyan-600 form-input">
                                Submit
                                <Icon src="{ArrowRight}" class="h-6 w-6 ml-1 inline" />
                            </button>
                        </div>

                    </form>
                {/if}
            </div>
        </div>
    </div>
</section>
<style>
    #autocomplete-items-list {
        position: relative;
        margin: 0;
        padding: 0;
        top: 0;
        width: 100%;
        border: 1px solid #ddd;
        background-color: #ddd;
    }
    #autocomplete-items-list:hover{
        background-color: rgb(59 130 246 / var(--tw-bg-opacity));
    }
</style>