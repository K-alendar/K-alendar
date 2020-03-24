//
//  ArtistController.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-22.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation

class ArtistController {
    static func fetchArtistDetails(id: Int, completion: @escaping (Result<Artist, Error>) -> Void) {
        print("Fetching...")
        let artistDetailsQuery: ArtistDetailsQuery = ArtistDetailsQuery(id: String(id))
        
        apollo.fetch(query: artistDetailsQuery) { (result) in
            var artistDetails: ArtistDetailsQuery.Data.Artist? = nil
            
            guard let data = try? result.get().data else { return }
            
            artistDetails = data.artist
            
            if let artist = artistDetails {
                let company = Company(name: artist.company.name)
                let socialLinks = SocialLinks(twitter: artist.socialLinks?.twitter, spotify: artist.socialLinks?.spotify, youtube: artist.socialLinks?.youtube)
                let artistImages = ArtistImages(icon: artist.images?.icon ?? "", banner: artist.images?.banner ?? "")
                
                if artist.isGroup {
                    print("Returning Group...")
                    let group = Group(id: Int(artist.id) ?? -1, startDate: Date(), endDate: Date(), company: company, socialLinks: socialLinks, images: artistImages, description: artist.description, englishName: artist.displayName, foreignName: artist.secondaryDisplayName, members: [Soloist]())
                    print(group)
                    completion(.success(group))
                } else {
                    print("Returning Group...")
                    let soloist = Soloist(id: Int(artist.id) ?? -1, startDate: Date(), endDate: Date(), company: company, socialLinks: socialLinks, images: artistImages, description: artist.description, stageName: artist.displayName, fullName: artist.secondaryDisplayName, isDebuted: false)
                    completion(.success(soloist))
                }
            }
        }
    }

}
