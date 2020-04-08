//
//  ArtistCard.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-14.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import SwiftUI
import KingfisherSwiftUI

enum CardType {
    case Flat
    case Tall
}

struct ArtistCard: View {
    var displayName: String
    var secondaryDisplayName: String
    var companyName: String
    var imageURL: String
    var cardType: CardType = .Tall
    var width: CGFloat = 320
    
    var body: some View {
        ZStack {
            GeometryReader { proxy in
                KFImage(URL(string: self.imageURL)!)
                .resizable()
                .scaledToFill()
                    .frame(width: proxy.size.width, height: proxy.size.height)
                
                VStack(alignment: .center) {
                    Spacer()
                    HStack(alignment: .center) {
                        VStack(alignment: .leading) {
                            HStack {
                                Text(self.displayName)
                                    .font(.system(size: 25))
                                    .fontWeight(.bold)
                                    .foregroundColor(Color.white)
                                Text(self.secondaryDisplayName)
                                    .font(.headline)
                                    .fontWeight(.medium)
                                    .foregroundColor(Color.white)
                            }
                            Text(self.companyName)
                                .foregroundColor(Color(red: 0.9, green: 0.9, blue: 0.9, opacity: 1.0))
                        }
                        
                        Spacer()
                    }.padding(.all).frame(width: proxy.size.width).background(
                        LinearGradient(
                            gradient: Gradient(
                                colors: [Color(red: 0.0, green: 0.0, blue: 0.0, opacity: 0.0),
                                         Color(red: 0.0, green: 0.0, blue: 0.0, opacity: 0.5)]
                            ),
                            startPoint: .top, endPoint: .bottom)
                    )
                }
            }
        }
    .clipped()
        .frame(width: self.width, height: self.isFlat() ? 200 : 400)
    .overlay(RoundedRectangle(cornerRadius: 20)
    .stroke(Color.gray, lineWidth: 2)
        ).cornerRadius(20)
        
    }
    
    func isFlat() -> Bool {
        switch self.cardType {
        case .Tall:
            return false
        case .Flat:
            return true
        }
    }
}

struct ArtistCard_Previews: PreviewProvider {
    static var previews: some View {
        return List {
            ArtistCard(displayName: "Red Velvet", secondaryDisplayName: "레드 벨벳", companyName: "SM Entertainment", imageURL: "https://i.pinimg.com/736x/76/24/16/7624167282f635370b1a47018c0bd5ec.jpg")
            ArtistCard(displayName: "LOOΠΔ", secondaryDisplayName: "이달의 소녀", companyName: "Blockberry Creative", imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTXAqmgNWge9gOQMepaKdQNGhme7XGfhLu-BoTYiKJz06hP1tMR&usqp=CAU")
        }
    }
}
