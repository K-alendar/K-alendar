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
    var logo: Image
    var large: Image
    
    init(logo: Image, large: Image) {
        self.logo = logo
        self.large = large
    }
    
    var logoAsCircle: some View {
        return self.logo.resizable().clipShape(Circle())
    }
}
