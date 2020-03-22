//
//  ArtistController.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-22.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation

class ArtistController {
    var artistDetailsGroup: ArtistDetailsQuery.Data.Artist.AsGroup
    var artistDetailsSoloist: ArtistDetailsQuery.Data.Artist.AsSoloist
    
    init() { }
    
    func ArtistDetails(id: Int) -> Artist? {
        let artistDetailsQuery: ArtistDetailsQuery = ArtistDetailsQuery(id: String(id))
        
        apollo.fetch(query: artistDetailsQuery) { [weak self] (result) in
            guard let data = try? result.get().data else { return }
            guard let self = self else { return }
            
        }
        
        if let group = artistDetails.asGroup {
            let company = Company(name: group.company.name)
            let socialLinks = SocialLinks(twitter: group.socialLinks?.twitter, spotify: group.socialLinks?.spotify, youtube: group.socialLinks?.spotify)
            
            return Group(id: Int(group.id)!, startDate: Date(), endDate: Date(), company: company, socialLinks: socialLinks, images: ArtistImages(), description: group.description, englishName: group.displayName, foreignName: group.secondaryDisplayName, members: [])
            
        } else if let soloist = artistDetails.asSoloist {
            let company = Company(name: soloist.company.name)
            let socialLinks = SocialLinks(twitter: soloist.socialLinks?.twitter, spotify: soloist.socialLinks?.spotify, youtube: soloist.socialLinks?.spotify)
            
            return Soloist(id: Int(soloist.id)!, startDate: Date(), endDate: Date(), company: company, socialLinks: socialLinks, images: ArtistImages(), description: soloist.description, stageName: soloist.displayName, fullName:  soloist.secondaryDisplayName, isDebuted: false)
        } else { return nil }
    }

}
