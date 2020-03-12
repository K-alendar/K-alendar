//
//  Group.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-11.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation

//var id: Int = 0
//var startDate: Date = Date()
//var endDate: Date = Date()
//var company: Company = Company()
//var socialLinks: SocialLinks = SocialLinks()
//var images: ArtistImages = ArtistImages()
//var description: String = ""

class Group: Artist, ArtistProtocol {
    var englishName: String
    var foreignName: String
    
    init(id: Int, startDate: Date, endDate: Date?, company: Company, socialLinks: SocialLinks, images: ArtistImages, description: String, englishName: String, foreignName: String) {
        self.englishName = englishName
        self.foreignName = foreignName
        
        super.init()
        self.id = id
        self.startDate = startDate
        self.endDate = endDate
        self.company = company
        self.socialLinks = socialLinks
        self.images = images
        self.description = description
    }
    
    var displayName: String {
        return self.englishName
    }
    
    var secondaryDisplayName: String {
        return self.foreignName
    }
    
    var isGroup: Bool {
        return true
    }
}


