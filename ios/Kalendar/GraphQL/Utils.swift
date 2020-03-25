//
//  Utils.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-24.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation

class Utils {
    class func parseGQLDate(from date: String, inTimezone timezone: String = "UTC") -> Date? {
        let dateFormatter = DateFormatter()
        // "startDate": "1970-01-17T10:27:50.400Z"
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
//        dateFormatter.timeZone = TimeZone(abbreviation: timezone)
        print(date)
        return dateFormatter.date(from: date)
    }
}
