//
//  SocialLinks.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-11.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation
import SwiftUI

class SocialLinks {
    var twitterLink: String?
    var spotifyLink: String?
    var youtubeLink: String?
    
    init(twitterLink:String?, spotifyLink: String?, youtubeLink: String?) {
        self.twitterLink = twitterLink
        self.spotifyLink = spotifyLink
        self.youtubeLink = youtubeLink
    }
}
