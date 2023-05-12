<script>
    // @ts-nocheck
    import { Icon, ArrowRight, User, MagnifyingGlass, AtSymbol, PaperAirplane } from "svelte-hero-icons"
    import Company from "./Company.svelte";

    export let companies
    export let form
    /* FILTERING countres DATA BASED ON INPUT */	
    let filteredCompanies = [];
    // $: console.log(filteredCompanies)	

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

    const makeMatchBold = (str) => {
        // replace part of (country name === inputValue) with strong tags
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
        

    /* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */	
    let hiLiteIndex = null;
    //$: console.log(hiLiteIndex);	
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

<form method="POST" class="border shadow-2xl rounded-3xl mx-auto p-6 mb-6">
    <h2 class="font-normal my-3 text-3xl text-cyan-500 pb-4 border-b-2 border-cyan-500">
        Respondent Details
        <Icon src="{User}" class="h-8 w-8 float-right font-semibold inline" />
    </h2>
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div class="grid grid-cols-1 gap-6">
            <label class="block text-xl">
                <span class="text-slate-500">First name</span>
                <input type="text" class="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " placeholder="" name="first_name" tabindex="0"
                  value="{ form?.first_name ?? ''}" required>
            </label>
            <label class="block text-xl">
                <span class="text-slate-500">Last name</span>
                <input type="text" class="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " placeholder="" name="last_name" tabindex="0" 
                  value="{ form?.last_name ?? ''}" required>
            </label>
            <label class="block text-xl">
                <span class="text-slate-500">Email</span>
                <input type="email" class="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " placeholder="" name="email"   
                  value="{ form?.email ?? ''}" required>
            </label>
            <label class="block text-xl">
                <span class="text-slate-500">Telephone</span>
                <input type="text" class="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " placeholder="" name="telephone" 
                  value="{ form?.telephone ?? ''}">
            </label>
            
        </div>
        <div class="grid grid-cols-1 gap-6">
            <label class="block text-xl">
                <span class="text-slate-500">Company name</span>
                <input type="text" class="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                    "
                    id="company_name" 
                    name="company_name" required 
                    bind:this={searchInput}
                    bind:value={inputValue} 
                    on:input={filterCompanies}
                  >
                <!-- FILTERED LIST OF COUNTRIES -->
                {#if filteredCompanies.length > 0}
                    <ul id="autocomplete-items-list">
                        {#each filteredCompanies as country, i}
                            <Company itemLabel={country} highlighted={i === hiLiteIndex} on:click={() => setInputVal(country)} />
                        {/each}			
                    </ul>
                {/if}
            </label>
            
            <label class="block text-xl">
                <span class="text-slate-500">Sector</span>
                <select class="
                    block
                    w-full
                    mt-1
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " name="sector" required>
                  <option selected>--- Please select ---</option>
                  <option>Corporate event</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Other</option>
                </select>
            </label>
            <label class="block text-xl">
                <span class="text-slate-500">Role in company</span>
                <select class="
                    block
                    w-full
                    mt-1
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " name="role" required>
                  <option selected>--- Please select ---</option>
                  <option>Senior-level</option>
                  <option>Mid-level</option>
                  <option>Entry-level</option>
                  <option>Other</option>
                </select>
            </label>
        </div>
    </div>
    <div class="my-5 justify-self-end mx-auto w-fit">
        <button name="submit-form" value="respondent-info" class="my-5 p-4 rounded-lg border-0 text-center text-xl text-white bg-cyan-500 hover:bg-cyan-600 form-input">
            Start Assessment
            <Icon src="{ArrowRight}" class="h-6 w-6 ml-1 inline" />
        </button>

    </div>
</form>
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
</style>