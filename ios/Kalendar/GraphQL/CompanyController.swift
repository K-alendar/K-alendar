//
//  CompanyController.swift
//  Kalendar
//
//  Created by John Ivison on 2020-04-06.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation

class CompanyController {
    static func fetchCompanyList(completion: @escaping (Result<[CompanyListQuery.Data.Company?], Error>) -> Void) {
        let companyListQuery = CompanyListQuery()
        
        apollo.clearCache()
        apollo.fetch(query: companyListQuery) { (result) in
            switch result {
            case .success(let graphQLResult):
                if let companyList = graphQLResult.data?.companies {
                    completion(.success(companyList))
                } else if let errors = graphQLResult.errors {
                    completion(.failure(ValidationError.company(errors: errors)))
                } else {
                    completion(.failure(UnexpectedError.unknown))
                }
            case .failure(let error):
                fatalError(error.localizedDescription)
            }
        }
    }

    static func fetchCompanyDetails(id: String, completion: @escaping (Result<CompanyDetailsQuery.Data.Company, Error>) -> Void) {
        let companyDetailsQuery = CompanyDetailsQuery(id: id)
        
        apollo.clearCache()
        apollo.fetch(query: companyDetailsQuery) { (result) in
            switch result {
            case .success(let graphQLResult):
                if let companyDetails = graphQLResult.data?.company {
                    completion(.success(companyDetails))
                } else if let errors = graphQLResult.errors {
                    completion(.failure(ValidationError.company(errors: errors)))
                } else {
                    completion(.failure(UnexpectedError.unknown))
                }
            case .failure(let error):
                fatalError(error.localizedDescription)
            }
        }
    }
}
