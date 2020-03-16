//
//  SocialLinks.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-11.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation
import SwiftUI

enum Links {
    case Twitter
    case Spotify
    case Youtube
}

class SocialLinks {
    var twitter: String?
    var spotify: String?
    var youtube: String?
    
    init(twitter:String?=nil, spotify: String?=nil, youtube: String?=nil) {
        self.twitter = twitter
        self.spotify = spotify
        self.youtube = youtube
    }
    
    func returnString(of link: Links) -> String {
        switch link {
            case .Twitter:
                if let twitter = self.twitter {
                    return twitter
                }
            case .Youtube:
                if let youtube = self.youtube {
                    return youtube
                }
            case .Spotify:
                if let spotify = self.spotify {
                    return spotify
                }
        }
        return ""
    }
    
    func checkIsValid(with link: Links) -> Bool {
        if let _ = URL(string: self.returnString(of: link)) {
            return true
        }
        return false
    }
    
    func open(_ link: Links) -> Void {
        if let url = URL(string: self.returnString(of: link)) {
            UIApplication.shared.open(url)
        }
    }
    
}
