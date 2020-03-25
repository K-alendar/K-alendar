//
//  ArtistImages.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-11.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation
import SwiftUI

class ArtistImages {
    var icon: String
    var banner: String
    var cardTall: String
    var cardFlat: String
    
    init(
        icon: String = "",
        banner: String = "",
        cardTall: String = "",
        cardFlat: String = ""
    ) {
        self.icon = icon
        self.banner = banner
        self.cardTall = cardTall
        self.cardFlat = cardFlat
    }
}
