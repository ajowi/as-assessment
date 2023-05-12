<script>
// @ts-nocheck
    import Answer from './Answer.svelte';
    export let assessmentQuestion, asAnswers
</script>

<div class="hover:bg-zinc-100 p-2">
    <h4 class="font-normal my-3 text-xl">{assessmentQuestion.title}</h4>
    <Answer assessmentQuestion={assessmentQuestion} {asAnswers} />
</div>

