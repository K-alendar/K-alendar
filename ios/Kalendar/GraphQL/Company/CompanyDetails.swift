//
//  CompanyDetails.swift
//  Kalendar
//
//  Created by John Ivison on 2020-04-07.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import SwiftUI
import Apollo

struct CompanyDetails: View {
    var id: String
    
    @State private var company = CompanyDetailsQuery.Data.Company(id: "", name: "")
    @State private var artists = [CompanyDetailsQuery.Data.Company.Artist]()
    @State private var isLoading = true
    
    var body: some View {
        return VStack(alignment: .leading) {
            if isLoading {
                Text("Loading...")
            } else {
                Text(company.name)
                    .font(.largeTitle)
                    .padding([.bottom])
                    
                
                if self.soloists.count == 0 && self.groups.count == 0 {
                    Text("This company doesn't have any artists 🤔")
                    Text("Try adding one?")
                }
                
                if self.groups.count > 0 {
                    Text("Groups").font(.title).foregroundColor(.gray)
                    ScrollView(.horizontal) {
                        HStack {
                            ForEach(self.groups, id: \.id) { artist in
                                ArtistCard(displayName: artist.displayName, secondaryDisplayName: artist.secondaryDisplayName, companyName: self.company.name, imageURL: artist.images?.cardFlat ?? "", cardType: .Flat)
                            }
                        }
                    }
                }
                
                if self.soloists.count > 0 {
                    Text("Soloists").font(.title).foregroundColor(.gray)
                    ScrollView(.horizontal) {
                        HStack {
                            ForEach(self.soloists, id: \.id) { artist in
                                ArtistCard(displayName: artist.displayName, secondaryDisplayName: artist.secondaryDisplayName, companyName: self.company.name, imageURL: artist.images?.cardFlat ?? "", cardType: .Flat)
                            }
                        }
                    }
                }
            }
            Spacer()
            }.onAppear(perform: self.loadData).padding()
    }
    
    var groups: [CompanyDetailsQuery.Data.Company.Artist] {
        return self.artists.filter({ (artist) -> Bool in
            return artist.isGroup
        })
    }
    
    var soloists: [CompanyDetailsQuery.Data.Company.Artist] {
        return self.artists.filter({ (artist) -> Bool in
            return !artist.isGroup
        })
    }
    
    func loadData() {
        self.isLoading = true
        CompanyController.fetchCompanyDetails(id: self.id) { (result) in
            self.isLoading = false
            switch result {
            case .success(let company):
                DispatchQueue.main.async {
                    self.company = company
                    self.artists = (company.artists ?? []) as! [CompanyDetailsQuery.Data.Company.Artist]
                }
            case .failure(let error):
                print(error)
            }
        }
    }
    
}

struct CompanyDetails_Previews: PreviewProvider {
    static var previews: some View {
        CompanyDetails(id: "1")
    }
}
