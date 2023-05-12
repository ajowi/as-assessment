// @ts-nocheck
import { 
    getResults,
    asQuestions, 
    asAnswers,  
    results,
    findCompany,
    companies,
    respondents } from '$lib/data/assessment'
import { paginate } from '$lib/utils'
import { error, fail } from '@sveltejs/kit'
import { categories } from '$lib/data/categories'

//let all_results = results
let companyResults = null
let company = null
let assessmentExists = false
let chartData = []

/** @type {import('./[page]/$types').PageServerLoad} */
export async function load() {
    console.log(companies._value)
    return {
        categories,
        paginate,
        company,
        companyResults,
        companies: companies._value,
        assessmentExists,
        chartData,
        answers: asAnswers._value
    }
    
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData()
        const comp = await findCompany({name: data.get('company_name')})
        if(comp !== undefined){
            company = comp
            const res = results?._value
            const assessment = await getResults({company_id: comp.id})
            companyResults ??= assessment
            //console.log({companyResults})
            if(companyResults !== undefined){
                let fresults
                categories.forEach((category) => {
                    fresults = filterResults(companyResults, category.name, asQuestions?._value, asAnswers?._value)
                    chartData.push({
                        category: category.name,
                        results: fresults,
                    })
                });

                console.log(chartData)
            }
            assessmentExists = true
            
        }
        
    }
}

function filterResults(results, category, questions, answers){
    let finalResults = []
    const filtered = results.filter((result) => category === result.category)
    let categoryQuestions = getQuestions(category, questions)    
        categoryQuestions.forEach((question) => {
            const filtered2 = filtered.filter((result2) => question.id === result2.question_id).map((result2) => {
                return { 
                    answer: result2.answer,
                    question: question.title,
                    category: result2.category
                }
            })
                  
            let neverCount = filtered2.filter((result) =>  'Never' == result.answer)
            let rarelyCount = filtered2.filter((result) =>  'Rarely' == result.answer)
            let sometimeCount = filtered2.filter((result) =>  'Sometime' == result.answer)
            let oftenCount = filtered2.filter((result) =>  'Often' == result.answer)
            let alwaysCount = filtered2.filter((result) =>  'Always' == result.answer)
            let assessmentAnswers = {
                category: question.category,
                neverCount: neverCount.length,
                rarelyCount: rarelyCount.length,
                sometimeCount: sometimeCount.length,
                oftenCount: oftenCount.length,
                alwaysCount: alwaysCount.length,
            }
            //console.log(assessmentAnswers)
            finalResults.push({
                question: question,
                filtered2: filtered2,
                assessmentAnswers: assessmentAnswers
            })
        })
        
    return finalResults
    
}

function getQuestions(category, questions){
    let assQuestions = questions
        ?.filter((query) => category === query.category)
        .map((query) => {
            return {
                id: query.id,
                title: query.title,
                category: query.category
            }
    })
    
    return assQuestions
}