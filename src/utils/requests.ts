import {
  PaginatedRequestParams,
  PaginatedResponse,
  RequestByEmployeeParams,
  SetTransactionApprovalParams,
  SuccessResponse,
  Transaction,
  Employee,
} from "./types"
import mockData from "../mock-data.json"

const TRANSACTIONS_PER_PAGE = 5

export const data: { employees: Employee[]; transactions: Transaction[] } = {
  employees: mockData.employees,
  transactions: mockData.transactions,
}

export const getEmployees = (): Employee[] => data.employees

export var isEndPage = false
export const getTransactionsPaginated = ({
  page,
}: PaginatedRequestParams): PaginatedResponse<Transaction[]> => {
  if (page === null) {
    throw new Error("Page cannot be null")
  }
  const start = 0 // start as 0
  const end = page * TRANSACTIONS_PER_PAGE + TRANSACTIONS_PER_PAGE // increasing end

  if (start > data.transactions.length) {
    throw new Error(`Invalid page ${page}`)
  }
  const nextPage = end < data.transactions.length ? page + 1 : null

  if(end>=data.transactions.length){
    isEndPage=true
  }else{
    isEndPage =false
  }
  return {
    nextPage,
    data: data.transactions.slice(start, end),
  }
}

export const getTransactionsByEmployee = ({ employeeId }: RequestByEmployeeParams) => {
  isEndPage=true
  if (!employeeId) {
    throw new Error("Employee id cannot be empty")
  }

  return data.transactions.filter((transaction) => transaction.employee.id === employeeId)
}

export const setTransactionApproval = ({
  transactionId,
  value,
}: SetTransactionApprovalParams): SuccessResponse => {
  const transaction = data.transactions.find(
    (currentTransaction) => currentTransaction.id === transactionId
  )
  if (transaction) {
    transaction.approved = value
    return { success: true }
  }

  return { success: false }
}
