//
//  RegisterViewController.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-21.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation

func createCompany(name: String) -> CreateCompanyMutation.Data? {
    let createCompanyMutation: CreateCompanyMutation = CreateCompanyMutation(name: name)
    
    var company: CreateCompanyMutation.Data?
    
    apollo.perform(mutation: createCompanyMutation) { (result) in
        switch result {
        case .success(let graphQLResult):
            company = graphQLResult.data
        case .failure(let error):
            print(error.localizedDescription)
        }
    }
    return company
}



