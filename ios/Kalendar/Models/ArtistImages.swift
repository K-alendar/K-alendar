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
    var icon: Image
    var banner: Image
    var cardTall: Image
    var cardFlat: Image
    
    init(
        icon: Image = Image("default-logo"),
        banner: Image = Image("default-banner"),
        cardTall: Image = Image("default-cardTall"),
        cardFlat: Image = Image("default-cardFlat")
    ) {
        self.icon = icon
        self.banner = banner
        self.cardTall = cardTall
        self.cardFlat = cardFlat
    }
}
