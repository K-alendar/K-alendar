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
            var companyList: [CompanyListQuery.Data.Company?] = []
            
            guard let data = try? result.get().data else { return }
            
            companyList = data.companies ?? []
            
            completion(.success(companyList))
        }
    }
}
