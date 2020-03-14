//
//  ArtistCard.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-14.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import SwiftUI

struct ArtistCard: View {
    var artist: Artist
    var isFlat: Bool = false
    
    var body: some View {
        ZStack {
            GeometryReader { proxy in
                (self.isFlat ? self.artist.images.cardFlat :
                    self.artist.images.cardTall)
                .resizable()
                .scaledToFill()
                    .frame(width: proxy.size.width, height: proxy.size.height)
                
                VStack(alignment: .center) {
                    Spacer()
                    HStack(alignment: .center) {
                        VStack(alignment: .leading) {
                            HStack {
                                Text(self.artist.displayName)
                                    .font(.system(size: 25))
                                    .fontWeight(.bold)
                                    .foregroundColor(Color.white)
                                Text(self.artist.secondaryDisplayName)
                                    .font(.headline)
                                    .fontWeight(.medium)
                                    .foregroundColor(Color.white)
                            }
                            Text(self.artist.company.name)
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
        .frame(width: 320, height: isFlat ? 200 : 400)
    .overlay(RoundedRectangle(cornerRadius: 20)
    .stroke(Color.gray, lineWidth: 2)
        ).cornerRadius(20)
        
    }
}

struct ArtistCard_Previews: PreviewProvider {
    static var previews: some View {
        let sampleData = SampleData()
        return ArtistCard(
            artist: sampleData.displayGroup,
            isFlat: true
        )
    }
}
