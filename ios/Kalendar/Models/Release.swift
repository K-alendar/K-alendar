//
//  Release.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-14.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation

// More of these can be added later...
enum ReleaseType {
    case Comeback
    case Repackage
    case Single
    case Debut
}

enum ReleaseStatus {
    case Delayed
    case Canceled
    case Postponed
    case Normal
    case Released
}

class Release {
    var artist: Artist
    var title: String
    var subtitle: String
    var date: Date
    var status: ReleaseStatus
    var type: ReleaseType
    
    init(artist: Artist, title: String, subtitle: String, date: Date, type: ReleaseType, status: ReleaseStatus = .Normal) {
        self.artist = artist
        self.title = title
        self.subtitle = subtitle
        self.date = date
        self.type = type
        self.status = status
    }
    
    var dayNumber: String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "dd"
        return dateFormatter.string(from: self.date)
    }
    
    var dayName: String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "E"
        return dateFormatter.string(from: self.date)
    }
    
    var time: String {
        switch self.status {
        case .Canceled:
            return "Canceled"
        case .Postponed:
            return "TBA"
        case .Released:
            return "Released!"
        case .Normal, .Delayed:
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "h:mm a"
            return "\(dateFormatter.string(from: self.date)) KST"
        }
    }
    
}
