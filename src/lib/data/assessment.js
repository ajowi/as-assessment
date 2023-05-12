// @ts-nocheck
import { db } from "./db";
//import Dexie from "dexie";

export const asQuestions = db.questions.toArray()

export const asAnswers = db.answers.toArray()

export const companies = db.company.toArray()

export const respondents = db.respondent.toArray()

export const results = db.assessment.toArray()


export async function addResponse(data){
    let lastId = null
    try{
        lastId = await db.assessment.bulkAdd(data)
        console.log("Last assessment response added: " + lastId)
    } catch(error){
        console.error("Some assessment responses were not added. Error: " + error)
    }
    
    return lastId
}

export async function addRespondent(data){
    let lastId = null
    try {
        lastId = await db.respondent.add(data)
        console.log("Repondent added: " + lastId)
    } catch (error) {
        console.log("Adding Repondent failed: " + error)
    }

    return lastId
}

export async function addCompany(data){
    let lastId = null
    try {
        lastId = await db.company.add(data)
        console.log("Company added: " + lastId)
    } catch (error) {
        console.log("Adding Company failed: " + error)
    }

    return lastId
}

export async function findCompany(data){
    let company = await db.company.get(data)
    return company
}

export async function findRespondent(data){
    let respondent = await db.respondent.get(data)
    return respondent
}

export async function getResults(data){
    const results = await db.assessment.filter((result) => data.company_id == result.company_id)
        
    return results.toArray()
}

export async function hasSubmittedSurvey(data){
    const results = await db.assessment.filter((result) => data.respondent_id == result.respondent_id)

    return results.toArray().length == 0 ? false : true
}

export function companyExists(name){

}