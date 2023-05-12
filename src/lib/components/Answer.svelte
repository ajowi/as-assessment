<script>
	import { space } from "postcss/lib/list";

    /**
	 * @type {any}
	 */
     export let asAnswers
     /**
	 * @type {any}
	 */
      export let assessmentQuestion

</script>
<div class="content-center px-5 mb-4 md:flex">
{#each asAnswers as asAnswer}
<div>
    <label class="inline-flex">  
        <input type="radio" name="{assessmentQuestion.category+assessmentQuestion.id}" value="{asAnswer.title}" class="form-radio text-xl" required />
        <span class="mx-4 text-lg italic font-light">{asAnswer.title}</span>
    </label>
</div>
{/each}
</div>