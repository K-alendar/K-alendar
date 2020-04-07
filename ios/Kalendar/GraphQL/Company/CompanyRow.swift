//
//  CompanyRow.swift
//  Kalendar
//
//  Created by John Ivison on 2020-04-06.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import SwiftUI

struct CompanyRow: View {
    var company: CompanyListQuery.Data.Company
    
    var body: some View {
        HStack {
            Text(company.name)
            Spacer()
        }
    }
}

struct CompanyRow_Previews: PreviewProvider {
    static var previews: some View {
        CompanyRow(company: CompanyListQuery.Data.Company(id: "2", name: "SM Entertainment"))
    }
}
