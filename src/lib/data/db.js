import "fake-indexeddb/auto";
import Dexie from "dexie";
import { asQuestions } from './questions'
import { asAnswers } from "./answers";

export const db = new Dexie('asAssessment')

//Schema
db.version(3).stores({
  questions: '++id, title, category, created_at',
  answers: '++id, title',
  assessment: '++id, question_id, respondent_id, company_id, answer, category, created_at',
  company: '++id, name, sector, number_of_employees, members, created_at',
  respondent: '++id, first_name, last_name, email, telephone, role, created_at'
})

//Pre-populate the database with survey questions and answers
db.on('populate', (transaction) => {
    transaction.table('questions').bulkAdd(asQuestions)
    transaction.table('answers').bulkAdd(asAnswers)
})
//db.open()
