//
//  CompanyList.swift
//  Kalendar
//
//  Created by John Ivison on 2020-04-06.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import SwiftUI

struct CompanyList: View {
    @State private var companies = [CompanyListQuery.Data.Company]()
    @State private var isLoading = true
    @State private var canReload = true

    @State private var error: Error?
    @State private var showError = false
    var body: some View {
        VStack {
            NavigationView {
                VStack {
                    if self.showError {
                        Text(error?.localizedDescription ?? "Unknown Error")
                    }
                    
                    if self.isLoading {
                        Text("Loading..")
                    }
                    Button("Reload") {
                        if self.canReload {
                            self.loadData()
                        }
                    }.disabled(!self.canReload)
                    
                    List(companies, id: \.id) { company in
                        NavigationLink(destination: CompanyDetails(id: company.id)) {
                            CompanyRow(company: company)
                        }
                    }
                }
                .navigationBarTitle("Companies")
            }
        }.onAppear(perform: loadData)
    }
    
    func loadData() {
        self.canReload = false
        self.isLoading = true
        self.companies = []
        CompanyController.fetchCompanyList { (result) in
            self.isLoading = false
            switch result {
            case .success(let companies):
                DispatchQueue.main.async {
                    self.companies = companies as! [CompanyListQuery.Data.Company]
                }
            case .failure(let error):
                self.error = error
                self.showError = true
            }
            self.canReload = true
        }
    }
}

struct CompanyList_Previews: PreviewProvider {
    static var previews: some View {
        CompanyList()
    }
}
