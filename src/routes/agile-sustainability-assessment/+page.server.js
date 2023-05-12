// @ts-nocheck
import { 
    asQuestions, 
    asAnswers, 
    addResponse, 
    addCompany, 
    addRespondent, 
    findCompany, 
    findRespondent,
    hasSubmittedSurvey,
    companies } from '$lib/data/assessment'
import { paginate } from '$lib/utils'
import { error, fail } from '@sveltejs/kit'
import { categories } from '$lib/data/categories'

let categoryIndex = 0
let currentCategory = categories[categoryIndex].name
let assessmentComplete = false
let hasResponded = false
let startedAssessment = false
let company = null
let respondent = null

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        // TODO start the assessment
        const data = await request.formData()
        const submittedForm = data.get('submit-form')

        if(submittedForm == 'respondent-info'){
            let fname = data.get('first_name');
            let lname = data.get('last_name');
            let emailAddress = data.get('email');
            let tel = data.get('telephone');
            let role = data.get('role');
            let members = []

            //Check if this respondent already submitted an assessment
            respondent = await findRespondent({email: emailAddress})
            if(respondent !== undefined){
                const assessmentExists = await hasSubmittedSurvey({respondent_id: respondent.id})
                console.log(assessmentExists)
                if(assessmentExists){
                    hasResponded = true
                    return fail(400, {failed: true, message: 'Sorry ' + respondent.first_name + ', you have already taken this survey.'})
                }
            }
            

            //Save respondent
            let respondentId = await addRespondent({
                first_name: fname,
                last_name: lname, 
                email: emailAddress, 
                telephone: tel, 
                role: role, 
                created_at: new Date()
            })
            if(respondentId !== null){
                respondent = await findRespondent({email: emailAddress})
                if(respondent !== undefined){
                    members.push(respondent)
                }
                 
                //Save company
                let companyId = await addCompany({
                    name: data.get('company_name'), 
                    sector: data.get('sector'), 
                    number_of_employees: 0, 
                    members: members, 
                    created_at: new Date()
                })
                if(companyId !== null){
                    company = await findCompany({name: data.get('company_name')})
                    startedAssessment = true
                }
                else
                    return fail(400, {failed: true, message: 'There was an error adding company information. Please try again.'})
                
                console.log(company)
            }
            else
                return fail(400, {failed: true, message: 'There was an error adding respondent information. Please try again.'})

        }
        else{
            const category = data.get('category_name')
            const company_name = data.get('company_id')
            const respondent_email = data.get('respondent_id')
            company = await findCompany({name: company_name})
            respondent = await findRespondent({email: respondent_email})
            let submitedCategory = categories.find((query) => category == query.name)
            let submittedCategoryIndex = categories.findIndex((element) => element === submitedCategory)
            let categoryQuestions = getQuestions(category, asQuestions?._value)
            let assessment = []

            categoryQuestions.forEach(question => {
                let formField = question.category + question.id
                let ans = data.get(formField)
                assessment.push(
                    {
                        question_id: question.id,
                        respondent_id: respondent.id,
                        company_id: company.id, 
                        answer: ans,
                        category: category,
                        created_at: new Date() 
                    }
                )
            });

            //Save assessment
            let lastResponse = addResponse(assessment)
            console.log(lastResponse)
            if((submittedCategoryIndex + 1) < categories.length)
                currentCategory = categories[submittedCategoryIndex + 1].name
            else
                assessmentComplete = true
        }
        
        console.log(company)
        console.log(respondent)
    }
};

/** @type {import('./[page]/$types').PageServerLoad} */
export async function load() {
    let asssessmentQuestions = getQuestions(currentCategory, asQuestions?._value)

    return {
        categories,
        currentCategory,
        asssessmentQuestions,
        asAnswers,
        paginate,
        assessmentComplete,
        startedAssessment,
        company,
        respondent,
        companies,
        hasResponded
    }
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

function respondentExists(){

}
