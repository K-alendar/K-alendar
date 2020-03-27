//
//  Soloist.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-11.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation

class Soloist: BaseArtist, Artist {
    var stageName: String
    var fullName: String
    var isDebuted: Bool
    var groups = [Group]()
    
    init(id: Int, startDate: Date, endDate: Date?, company: Company, socialLinks: SocialLinks, images: ArtistImages, description: String, stageName: String, fullName: String, isDebuted: Bool, groups: [Group]) {
        self.fullName = fullName
        self.stageName = stageName
        self.isDebuted = isDebuted
        
        super.init()
        self.id = id
        self.startDate = startDate
        self.endDate = endDate
        self.company = company
        self.socialLinks = socialLinks
        self.images = images
        self.description = description
        self.groups = groups
    }
    
    var displayName: String {
        return self.stageName
    }
    
    var secondaryDisplayName: String {
        return self.fullName
    }
    
    var isGroup: Bool {
        return false
    }
    
    var memberCount: Int {
        return -1
    }
    
    var members: [Soloist] {
        return []
    }
}
