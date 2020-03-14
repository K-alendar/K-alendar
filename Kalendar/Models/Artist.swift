//
//  Artist.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-11.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation
import SwiftUI

protocol Artist {
    var startDate: Date { get }
    var endDate: Date? { get set }
    var company: Company { get set }
    var socialLinks: SocialLinks { get }
    var images: ArtistImages { get }
    var description: String { get set }
    
    var displayName: String { get }
    var secondaryDisplayName: String { get }
    var isGroup: Bool { get }
    var getMemberNum: Int { get }
    var getMembers: [Soloist] { get }
}

class BaseArtist: Hashable {
    static func == (lhs: BaseArtist, rhs: BaseArtist) -> Bool {
        lhs.id == rhs.id
    }
    
    func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
    
    var id: Int = 0
    var startDate: Date = Date()
    var endDate: Date? = nil
    var company: Company = Company(name: "")
    var socialLinks: SocialLinks = SocialLinks(twitter: nil, spotify: nil, youtube: nil)
    var images: ArtistImages = ArtistImages()
    var description: String = ""
}
