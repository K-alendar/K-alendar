// @generated
//  This file was automatically generated and should not be edited.

import Apollo
import Foundation

public final class CreateCompanyMutation: GraphQLMutation {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    mutation CreateCompany($name: String!) {
      createCompany(name: $name) {
        __typename
        id
        name
      }
    }
    """

  public let operationName: String = "CreateCompany"

  public let operationIdentifier: String? = "e36d7a93f0292b1752e8c7458eb76f84ec1dd87560bc65176a40f0696d8b8202"

  public var name: String

  public init(name: String) {
    self.name = name
  }

  public var variables: GraphQLMap? {
    return ["name": name]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Mutation"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("createCompany", arguments: ["name": GraphQLVariable("name")], type: .object(CreateCompany.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(createCompany: CreateCompany? = nil) {
      self.init(unsafeResultMap: ["__typename": "Mutation", "createCompany": createCompany.flatMap { (value: CreateCompany) -> ResultMap in value.resultMap }])
    }

    public var createCompany: CreateCompany? {
      get {
        return (resultMap["createCompany"] as? ResultMap).flatMap { CreateCompany(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "createCompany")
      }
    }

    public struct CreateCompany: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["Company"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("name", type: .nonNull(.scalar(String.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, name: String) {
        self.init(unsafeResultMap: ["__typename": "Company", "id": id, "name": name])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var id: GraphQLID {
        get {
          return resultMap["id"]! as! GraphQLID
        }
        set {
          resultMap.updateValue(newValue, forKey: "id")
        }
      }

      public var name: String {
        get {
          return resultMap["name"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "name")
        }
      }
    }
  }
}
