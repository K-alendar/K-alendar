//
//  Errors.swift
//  Kalendar
//
//  Created by John Ivison on 2020-04-07.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation
import SwiftUI
import Apollo

func gqlStringFrom(errors: [GraphQLError]) -> String {
    return errors.map { (error) -> String in
        return error.message ?? ""
    }.joined(separator: "\n")
}

enum UnexpectedError: Error {
    case unknown
    case known(reason: String)
}

extension UnexpectedError: LocalizedError {
    public var errorDescription: String? {
        switch self {
        case .unknown:
            return NSLocalizedString("Something went wrong...", comment: "Unexpected Error")
        case .known(let message):
            return NSLocalizedString(message, comment: "Unexpected Error")
        }
    }
}

enum ValidationError: Error {
    case company(errors: [GraphQLError])
}

extension ValidationError: LocalizedError {
    public var errorDescription: String? {
        switch self {
        case .company(let errors):
            return NSLocalizedString(gqlStringFrom(errors: errors), comment: "Unexpected Error")
        }
    }
}
