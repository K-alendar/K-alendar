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
    @State private var canReload = true
    
    var body: some View {
        VStack {
            Button("Reload") {
                if self.canReload {
                    self.loadData()
                }
            }.disabled(!self.canReload)
            List(companies, id: \.id) { company in
                CompanyRow(company: company)
            }.onAppear(perform: loadData)
        }
    }
    
    func loadData() {
        self.canReload = false
        self.companies = []
        CompanyController.fetchCompanyList { (result) in
            switch result {
            case .success(let companies):
                DispatchQueue.main.async {
                    self.companies = companies as! [CompanyListQuery.Data.Company]
                }
            case .failure(_):
                fatalError("Something went wrong...")
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
