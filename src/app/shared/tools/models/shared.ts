export interface RequestAccountsResponse{
    code: Number, // 200：ok 4000：in queue, no need to repeat commit， 4001：user rejected
    message: String
  }