// @generated
//  This file was automatically generated and should not be edited.

import Apollo
import Foundation

public final class ArtistDetailsQuery: GraphQLQuery {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    query ArtistDetails($id: ID!) {
      artist(id: $id) {
        __typename
        ...ArtistInfo
        groups {
          __typename
          id
          displayName
          secondaryDisplayName
          images {
            __typename
            cardFlat
          }
        }
        members {
          __typename
          id
          displayName
          images {
            __typename
            icon
          }
        }
      }
    }
    """

  public let operationName: String = "ArtistDetails"

  public let operationIdentifier: String? = "da0090621f4a8f0762a525c684880660eac46d54341195b43e66b72a2ba0ba91"

  public var queryDocument: String { return operationDefinition.appending(ArtistInfo.fragmentDefinition) }

  public var id: GraphQLID

  public init(id: GraphQLID) {
    self.id = id
  }

  public var variables: GraphQLMap? {
    return ["id": id]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("artist", arguments: ["id": GraphQLVariable("id")], type: .object(Artist.selections)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(artist: Artist? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "artist": artist.flatMap { (value: Artist) -> ResultMap in value.resultMap }])
    }

    public var artist: Artist? {
      get {
        return (resultMap["artist"] as? ResultMap).flatMap { Artist(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "artist")
      }
    }

    public struct Artist: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["Artist"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        GraphQLField("startDate", type: .nonNull(.scalar(String.self))),
        GraphQLField("endDate", type: .scalar(String.self)),
        GraphQLField("description", type: .nonNull(.scalar(String.self))),
        GraphQLField("isGroup", type: .nonNull(.scalar(Bool.self))),
        GraphQLField("displayName", type: .nonNull(.scalar(String.self))),
        GraphQLField("secondaryDisplayName", type: .nonNull(.scalar(String.self))),
        GraphQLField("company", type: .nonNull(.object(Company.selections))),
        GraphQLField("images", type: .object(Image.selections)),
        GraphQLField("socialLinks", type: .object(SocialLink.selections)),
        GraphQLField("groups", type: .list(.object(Group.selections))),
        GraphQLField("members", type: .list(.object(Member.selections))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(id: GraphQLID, startDate: String, endDate: String? = nil, description: String, isGroup: Bool, displayName: String, secondaryDisplayName: String, company: Company, images: Image? = nil, socialLinks: SocialLink? = nil, groups: [Group?]? = nil, members: [Member?]? = nil) {
        self.init(unsafeResultMap: ["__typename": "Artist", "id": id, "startDate": startDate, "endDate": endDate, "description": description, "isGroup": isGroup, "displayName": displayName, "secondaryDisplayName": secondaryDisplayName, "company": company.resultMap, "images": images.flatMap { (value: Image) -> ResultMap in value.resultMap }, "socialLinks": socialLinks.flatMap { (value: SocialLink) -> ResultMap in value.resultMap }, "groups": groups.flatMap { (value: [Group?]) -> [ResultMap?] in value.map { (value: Group?) -> ResultMap? in value.flatMap { (value: Group) -> ResultMap in value.resultMap } } }, "members": members.flatMap { (value: [Member?]) -> [ResultMap?] in value.map { (value: Member?) -> ResultMap? in value.flatMap { (value: Member) -> ResultMap in value.resultMap } } }])
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

      public var startDate: String {
        get {
          return resultMap["startDate"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "startDate")
        }
      }

      public var endDate: String? {
        get {
          return resultMap["endDate"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "endDate")
        }
      }

      public var description: String {
        get {
          return resultMap["description"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "description")
        }
      }

      public var isGroup: Bool {
        get {
          return resultMap["isGroup"]! as! Bool
        }
        set {
          resultMap.updateValue(newValue, forKey: "isGroup")
        }
      }

      public var displayName: String {
        get {
          return resultMap["displayName"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "displayName")
        }
      }

      public var secondaryDisplayName: String {
        get {
          return resultMap["secondaryDisplayName"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "secondaryDisplayName")
        }
      }

      public var company: Company {
        get {
          return Company(unsafeResultMap: resultMap["company"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "company")
        }
      }

      public var images: Image? {
        get {
          return (resultMap["images"] as? ResultMap).flatMap { Image(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "images")
        }
      }

      public var socialLinks: SocialLink? {
        get {
          return (resultMap["socialLinks"] as? ResultMap).flatMap { SocialLink(unsafeResultMap: $0) }
        }
        set {
          resultMap.updateValue(newValue?.resultMap, forKey: "socialLinks")
        }
      }

      public var groups: [Group?]? {
        get {
          return (resultMap["groups"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [Group?] in value.map { (value: ResultMap?) -> Group? in value.flatMap { (value: ResultMap) -> Group in Group(unsafeResultMap: value) } } }
        }
        set {
          resultMap.updateValue(newValue.flatMap { (value: [Group?]) -> [ResultMap?] in value.map { (value: Group?) -> ResultMap? in value.flatMap { (value: Group) -> ResultMap in value.resultMap } } }, forKey: "groups")
        }
      }

      public var members: [Member?]? {
        get {
          return (resultMap["members"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [Member?] in value.map { (value: ResultMap?) -> Member? in value.flatMap { (value: ResultMap) -> Member in Member(unsafeResultMap: value) } } }
        }
        set {
          resultMap.updateValue(newValue.flatMap { (value: [Member?]) -> [ResultMap?] in value.map { (value: Member?) -> ResultMap? in value.flatMap { (value: Member) -> ResultMap in value.resultMap } } }, forKey: "members")
        }
      }

      public var fragments: Fragments {
        get {
          return Fragments(unsafeResultMap: resultMap)
        }
        set {
          resultMap += newValue.resultMap
        }
      }

      public struct Fragments {
        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public var artistInfo: ArtistInfo {
          get {
            return ArtistInfo(unsafeResultMap: resultMap)
          }
          set {
            resultMap += newValue.resultMap
          }
        }
      }

      public struct Company: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["Company"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("name", type: .nonNull(.scalar(String.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(name: String) {
          self.init(unsafeResultMap: ["__typename": "Company", "name": name])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
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

      public struct Image: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["ArtistImages"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("banner", type: .scalar(String.self)),
          GraphQLField("icon", type: .scalar(String.self)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(banner: String? = nil, icon: String? = nil) {
          self.init(unsafeResultMap: ["__typename": "ArtistImages", "banner": banner, "icon": icon])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var banner: String? {
          get {
            return resultMap["banner"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "banner")
          }
        }

        public var icon: String? {
          get {
            return resultMap["icon"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "icon")
          }
        }
      }

      public struct SocialLink: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["SocialLinks"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("twitter", type: .scalar(String.self)),
          GraphQLField("youtube", type: .scalar(String.self)),
          GraphQLField("spotify", type: .scalar(String.self)),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(twitter: String? = nil, youtube: String? = nil, spotify: String? = nil, id: GraphQLID) {
          self.init(unsafeResultMap: ["__typename": "SocialLinks", "twitter": twitter, "youtube": youtube, "spotify": spotify, "id": id])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var twitter: String? {
          get {
            return resultMap["twitter"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "twitter")
          }
        }

        public var youtube: String? {
          get {
            return resultMap["youtube"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "youtube")
          }
        }

        public var spotify: String? {
          get {
            return resultMap["spotify"] as? String
          }
          set {
            resultMap.updateValue(newValue, forKey: "spotify")
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
      }

      public struct Group: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["Artist"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("displayName", type: .nonNull(.scalar(String.self))),
          GraphQLField("secondaryDisplayName", type: .nonNull(.scalar(String.self))),
          GraphQLField("images", type: .object(Image.selections)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, displayName: String, secondaryDisplayName: String, images: Image? = nil) {
          self.init(unsafeResultMap: ["__typename": "Artist", "id": id, "displayName": displayName, "secondaryDisplayName": secondaryDisplayName, "images": images.flatMap { (value: Image) -> ResultMap in value.resultMap }])
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

        public var displayName: String {
          get {
            return resultMap["displayName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "displayName")
          }
        }

        public var secondaryDisplayName: String {
          get {
            return resultMap["secondaryDisplayName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "secondaryDisplayName")
          }
        }

        public var images: Image? {
          get {
            return (resultMap["images"] as? ResultMap).flatMap { Image(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "images")
          }
        }

        public struct Image: GraphQLSelectionSet {
          public static let possibleTypes: [String] = ["ArtistImages"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("cardFlat", type: .scalar(String.self)),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(cardFlat: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "ArtistImages", "cardFlat": cardFlat])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var cardFlat: String? {
            get {
              return resultMap["cardFlat"] as? String
            }
            set {
              resultMap.updateValue(newValue, forKey: "cardFlat")
            }
          }
        }
      }

      public struct Member: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["Artist"]

        public static let selections: [GraphQLSelection] = [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
          GraphQLField("displayName", type: .nonNull(.scalar(String.self))),
          GraphQLField("images", type: .object(Image.selections)),
        ]

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(id: GraphQLID, displayName: String, images: Image? = nil) {
          self.init(unsafeResultMap: ["__typename": "Artist", "id": id, "displayName": displayName, "images": images.flatMap { (value: Image) -> ResultMap in value.resultMap }])
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

        public var displayName: String {
          get {
            return resultMap["displayName"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "displayName")
          }
        }

        public var images: Image? {
          get {
            return (resultMap["images"] as? ResultMap).flatMap { Image(unsafeResultMap: $0) }
          }
          set {
            resultMap.updateValue(newValue?.resultMap, forKey: "images")
          }
        }

        public struct Image: GraphQLSelectionSet {
          public static let possibleTypes: [String] = ["ArtistImages"]

          public static let selections: [GraphQLSelection] = [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("icon", type: .scalar(String.self)),
          ]

          public private(set) var resultMap: ResultMap

          public init(unsafeResultMap: ResultMap) {
            self.resultMap = unsafeResultMap
          }

          public init(icon: String? = nil) {
            self.init(unsafeResultMap: ["__typename": "ArtistImages", "icon": icon])
          }

          public var __typename: String {
            get {
              return resultMap["__typename"]! as! String
            }
            set {
              resultMap.updateValue(newValue, forKey: "__typename")
            }
          }

          public var icon: String? {
            get {
              return resultMap["icon"] as? String
            }
            set {
              resultMap.updateValue(newValue, forKey: "icon")
            }
          }
        }
      }
    }
  }
}

public final class CompanyListQuery: GraphQLQuery {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    query CompanyList {
      companies {
        __typename
        id
        name
      }
    }
    """

  public let operationName: String = "CompanyList"

  public let operationIdentifier: String? = "78c65663e205f2dc80f9db82a7110d6681dd8f46297f1e67296c1d36d6970068"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("companies", type: .list(.object(Company.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(companies: [Company?]? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "companies": companies.flatMap { (value: [Company?]) -> [ResultMap?] in value.map { (value: Company?) -> ResultMap? in value.flatMap { (value: Company) -> ResultMap in value.resultMap } } }])
    }

    public var companies: [Company?]? {
      get {
        return (resultMap["companies"] as? [ResultMap?]).flatMap { (value: [ResultMap?]) -> [Company?] in value.map { (value: ResultMap?) -> Company? in value.flatMap { (value: ResultMap) -> Company in Company(unsafeResultMap: value) } } }
      }
      set {
        resultMap.updateValue(newValue.flatMap { (value: [Company?]) -> [ResultMap?] in value.map { (value: Company?) -> ResultMap? in value.flatMap { (value: Company) -> ResultMap in value.resultMap } } }, forKey: "companies")
      }
    }

    public struct Company: GraphQLSelectionSet {
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

public struct ArtistInfo: GraphQLFragment {
  /// The raw GraphQL definition of this fragment.
  public static let fragmentDefinition: String =
    """
    fragment ArtistInfo on Artist {
      __typename
      id
      startDate
      endDate
      description
      isGroup
      displayName
      secondaryDisplayName
      company {
        __typename
        name
      }
      images {
        __typename
        banner
        icon
      }
      socialLinks {
        __typename
        twitter
        youtube
        spotify
        id
      }
    }
    """

  public static let possibleTypes: [String] = ["Artist"]

  public static let selections: [GraphQLSelection] = [
    GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
    GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    GraphQLField("startDate", type: .nonNull(.scalar(String.self))),
    GraphQLField("endDate", type: .scalar(String.self)),
    GraphQLField("description", type: .nonNull(.scalar(String.self))),
    GraphQLField("isGroup", type: .nonNull(.scalar(Bool.self))),
    GraphQLField("displayName", type: .nonNull(.scalar(String.self))),
    GraphQLField("secondaryDisplayName", type: .nonNull(.scalar(String.self))),
    GraphQLField("company", type: .nonNull(.object(Company.selections))),
    GraphQLField("images", type: .object(Image.selections)),
    GraphQLField("socialLinks", type: .object(SocialLink.selections)),
  ]

  public private(set) var resultMap: ResultMap

  public init(unsafeResultMap: ResultMap) {
    self.resultMap = unsafeResultMap
  }

  public init(id: GraphQLID, startDate: String, endDate: String? = nil, description: String, isGroup: Bool, displayName: String, secondaryDisplayName: String, company: Company, images: Image? = nil, socialLinks: SocialLink? = nil) {
    self.init(unsafeResultMap: ["__typename": "Artist", "id": id, "startDate": startDate, "endDate": endDate, "description": description, "isGroup": isGroup, "displayName": displayName, "secondaryDisplayName": secondaryDisplayName, "company": company.resultMap, "images": images.flatMap { (value: Image) -> ResultMap in value.resultMap }, "socialLinks": socialLinks.flatMap { (value: SocialLink) -> ResultMap in value.resultMap }])
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

  public var startDate: String {
    get {
      return resultMap["startDate"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "startDate")
    }
  }

  public var endDate: String? {
    get {
      return resultMap["endDate"] as? String
    }
    set {
      resultMap.updateValue(newValue, forKey: "endDate")
    }
  }

  public var description: String {
    get {
      return resultMap["description"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "description")
    }
  }

  public var isGroup: Bool {
    get {
      return resultMap["isGroup"]! as! Bool
    }
    set {
      resultMap.updateValue(newValue, forKey: "isGroup")
    }
  }

  public var displayName: String {
    get {
      return resultMap["displayName"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "displayName")
    }
  }

  public var secondaryDisplayName: String {
    get {
      return resultMap["secondaryDisplayName"]! as! String
    }
    set {
      resultMap.updateValue(newValue, forKey: "secondaryDisplayName")
    }
  }

  public var company: Company {
    get {
      return Company(unsafeResultMap: resultMap["company"]! as! ResultMap)
    }
    set {
      resultMap.updateValue(newValue.resultMap, forKey: "company")
    }
  }

  public var images: Image? {
    get {
      return (resultMap["images"] as? ResultMap).flatMap { Image(unsafeResultMap: $0) }
    }
    set {
      resultMap.updateValue(newValue?.resultMap, forKey: "images")
    }
  }

  public var socialLinks: SocialLink? {
    get {
      return (resultMap["socialLinks"] as? ResultMap).flatMap { SocialLink(unsafeResultMap: $0) }
    }
    set {
      resultMap.updateValue(newValue?.resultMap, forKey: "socialLinks")
    }
  }

  public struct Company: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Company"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("name", type: .nonNull(.scalar(String.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(name: String) {
      self.init(unsafeResultMap: ["__typename": "Company", "name": name])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
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

  public struct Image: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["ArtistImages"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("banner", type: .scalar(String.self)),
      GraphQLField("icon", type: .scalar(String.self)),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(banner: String? = nil, icon: String? = nil) {
      self.init(unsafeResultMap: ["__typename": "ArtistImages", "banner": banner, "icon": icon])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var banner: String? {
      get {
        return resultMap["banner"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "banner")
      }
    }

    public var icon: String? {
      get {
        return resultMap["icon"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "icon")
      }
    }
  }

  public struct SocialLink: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["SocialLinks"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
      GraphQLField("twitter", type: .scalar(String.self)),
      GraphQLField("youtube", type: .scalar(String.self)),
      GraphQLField("spotify", type: .scalar(String.self)),
      GraphQLField("id", type: .nonNull(.scalar(GraphQLID.self))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(twitter: String? = nil, youtube: String? = nil, spotify: String? = nil, id: GraphQLID) {
      self.init(unsafeResultMap: ["__typename": "SocialLinks", "twitter": twitter, "youtube": youtube, "spotify": spotify, "id": id])
    }

    public var __typename: String {
      get {
        return resultMap["__typename"]! as! String
      }
      set {
        resultMap.updateValue(newValue, forKey: "__typename")
      }
    }

    public var twitter: String? {
      get {
        return resultMap["twitter"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "twitter")
      }
    }

    public var youtube: String? {
      get {
        return resultMap["youtube"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "youtube")
      }
    }

    public var spotify: String? {
      get {
        return resultMap["spotify"] as? String
      }
      set {
        resultMap.updateValue(newValue, forKey: "spotify")
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
  }
}
