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

class Group: BaseArtist, Artist {
    var englishName: String
    var foreignName: String
    var members: [Soloist]
    
    init(id: Int, startDate: Date, endDate: Date?, company: Company, socialLinks: SocialLinks, images: ArtistImages, description: String, englishName: String, foreignName: String, members: [Soloist]) {
        self.englishName = englishName
        self.foreignName = foreignName
        self.members = members
        
        super.init()
        self.id = id
        self.startDate = startDate
        self.endDate = endDate
        self.company = company
        self.socialLinks = socialLinks
        self.images = images
        self.description = description
    }
    
    func addNewMember(startDate: Date, endDate: Date?, socialLinks: SocialLinks, images: ArtistImages, description: String, stageName: String, fullName: String, isDebuted: Bool) {
        self.members.append(
            Soloist(id: Int.random(in: 1...1000000), startDate: startDate, endDate: endDate, company: self.company, socialLinks: socialLinks, images: images, description: description, stageName: stageName, fullName: fullName, isDebuted: isDebuted, groups: [])
        )
    }
    
    func addMember(member: Soloist) {
        self.members.append(member)
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
    
    var memberCount: Int {
        return self.members.count
    }
    
}


