//
//  Soloist.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-11.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation

class Soloist: Artist, ArtistProtocol {
    var stageName: String = ""
    var fullName: String = ""
    
    var displayName: String {
        return self.stageName
    }
    
    var secondaryDisplayName: String {
        return self.fullName
    }
    
    var isGroup: Bool {
        return false
    }
}


