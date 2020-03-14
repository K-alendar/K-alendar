//
//  SocialLinksDisplay.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-14.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import SwiftUI

struct SocialLinksDisplay: View {
    var socialLinks: SocialLinks
    
    var body: some View {
        HStack {
            Button(action: {
                self.socialLinks.open(.Twitter)
            }) {
                Image("twitter")
            }
            
            Button(action: {
                self.socialLinks.open(.Youtube)
            }) {
                Image("youtube")
            }
            
            Button(action: {
                self.socialLinks.open(.Spotify)
            }) {
                Image("spotify")
            }
        }

    }
}

struct SocialLinksDisplay_Previews: PreviewProvider {
    static var previews: some View {
        return SocialLinksDisplay(
            socialLinks: SocialLinks(
                twitter: "https://twitter.com/RVsmtown",
                spotify: "https://open.spotify.com/artist/1z4g3DjTBBZKhvAroFlhOM",
                youtube: "https://www.youtube.com/user/SMTOWN"
            )
        )
    }
}
