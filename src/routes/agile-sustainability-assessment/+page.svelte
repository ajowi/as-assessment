<script>
    // @ts-nocheck
    import Question from '$lib/components/Question.svelte';
    import { useForm, validators, Hint, required } from 'svelte-use-form';
	import { stringify } from 'postcss';
    import { Icon, ArrowRight, InformationCircle, ArrowDownTray, PaperAirplane } from "svelte-hero-icons"
	import Respondent from '$lib/components/Respondent.svelte';

    /** @type {import('./$types').PageData} */
    export let data

    /** @type {import('./$types').ActionData} */   
    export let form;

    export let asAnswers = data.asAnswers
    export let asssessmentQuestions = data.asssessmentQuestions
    export let currentCategory = data.currentCategory
    export let startedAssessment = data.startedAssessment
    export let assessmentComplete = data.assessmentComplete
    export let company = data.company
    export let respondent = data.respondent
    export let companies = data.companies
    console.log(companies);
    
</script>


<section class="py-10 items-center justify-center">
    <div class="w-4/6 mx-auto my-6">
        {#if form?.failed}
        <div class="w-75 mx-auto my-4 p-4 bg-red-400 text-white">
            <p class="text-center">{form?.message}</p>
        </div>
        {/if}
        <h1 class="text-3xl font-semibold text-slate-500 text-center mb-10">
            {#if assessmentComplete}
                Agile Sustainability Assessment - Complete!
            {:else}
                {#if !startedAssessment}
                    Agile Sustainability Assessment
                {:else}
                    <span class="uppercase text-cyan-500">{(company !== null) ? company.name : ''}</span> - Ongoing Assessment
                {/if}
            {/if}
        </h1>
    </div>
    <div class="md:w-4/6 m-auto w-full">
        <div class="w-full">
            <div class="container items-center justify-center">
                {#if assessmentComplete}
                    <div class="border shadow-2xl rounded-3xl mx-auto px-6 py-20 mb-6">
                        <h2 class="font-normal my-3 text-3xl text-cyan-500 pb-4 border-b-2 text-center">Thank you <span class="uppercase">{respondent.first_name}</span>, for participating in this survey!</h2>

                        <div class="my-5 justify-self-end mx-auto w-fit">
                            <a href="/download-report/{company.name}">
                                <button class="my-5 p-4 border-0 rounded-lg text-center text-xl text-white bg-cyan-500 hover:bg-cyan-600 form-input">
                                    Download Report
                                    <Icon src="{ArrowDownTray}" class="h-6 w-6 ml-1 inline" />
                                </button>
                            </a>
                        </div>
                    </div>
                    
                    
                {:else}
                    {#if !startedAssessment}
                        <Respondent {companies} {form}/>
                    {:else}
                        <form method="POST" class="border shadow-2xl rounded-3xl mx-auto p-6 mb-6">
                            <h2 class="font-normal my-3 text-3xl text-blue-500 pb-2 border-b-2 border-blue-500">
                                {currentCategory}
                                <Icon src="{InformationCircle}" class="h-8 w-8 float-right font-semibold inline" />
                            </h2>
                            {#each asssessmentQuestions as assessmentQuestion}
                                <Question {assessmentQuestion} {asAnswers}/>
                            {/each}
                            <input type="hidden" name="category_name" value="{currentCategory}" />
                            <input type="hidden" name="company_id" value="{(company !== null) ? company.name : ''}" />
                            <input type="hidden" name="respondent_id" value="{(respondent !== null) ? respondent.email : ''}" />
                            <div class="my-5 justify-self-end mx-auto w-fit">
                                <button name="submit-form" value="{currentCategory}" class="my-5 p-4 rounded-lg border-0 text-center text-xl text-white bg-cyan-500 hover:bg-cyan-600 form-input">
                                    Next Section
                                    <Icon src="{ArrowRight}" class="h-6 w-6 ml-1 inline" />
                                </button>

                            </div>
                        </form>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
</section>