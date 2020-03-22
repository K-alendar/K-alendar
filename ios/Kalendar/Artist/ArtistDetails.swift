//
//  ArtistDetails.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-11.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import SwiftUI
import Apollo

struct ArtistDetails: View {
    var artist: Artist
//    var artist: ArtistDetailsQuery.Data.Artist
    let yearDateFormatter: DateFormatter
    
    var body: some View {
        VStack(alignment: .leading) {
            VStack {
                artist.images.banner
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .cornerRadius(15, corners: [.bottomLeft, .bottomRight])
            }
                
            HStack(alignment: .bottom) {
                artist.images.icon
                    .resizable()
                    .frame(width: 100, height: 100)
                    .clipShape(Circle())
                    .overlay(
                        Circle().stroke(Color.gray, lineWidth: 1))
                    .shadow(radius: 10)
                    .padding(.trailing, 2)

                VStack(alignment: .leading) {
                    HStack {
                        Text(artist.displayName)
                            .font(.system(size: 30))
                            .bold()
                        Text(artist.secondaryDisplayName)
                            .font(.headline)
                            .foregroundColor(Color(hue: 1.0, saturation: 0.0, brightness: 0.456))
                    }
                    Text(artist.company.name)
                        .foregroundColor(Color.gray)
                        .padding(.bottom, 3.0)
                }
                
            }.padding(.leading).offset(y: -50).padding(.bottom, -50)
            
            
            VStack(alignment: .leading) {
                HStack() {
                    Image("members")
                    artist.isGroup ? Text("\(artist.memberCount) members")
                        .font(.subheadline)
                        .fontWeight(.light)
                        .foregroundColor(Color.gray) : Text("")
                    
                    Image("debut")
                    Text(yearDateFormatter.string(from: artist.startDate))
                    .font(.subheadline)
                    .fontWeight(.light)
                        .foregroundColor(Color.gray)
                        .lineLimit(2)
                    
                    Spacer()
                    
                    SocialLinksDisplay(socialLinks: artist.socialLinks)

                }
                
                Text("About")
                    .font(.title)
                
                GeometryReader { geometry in
                    ScrollView(showsIndicators: true) {
                        Text(self.artist.description)
                            .font(.body)
                            .multilineTextAlignment(.leading)
                            .padding(.trailing, 15.0)
                            
                    }
                }
                
                if artist.isGroup {
                    ScrollView (.horizontal, showsIndicators: false) {
                    HStack {
                        ForEach(artist.members, id: \.id) { member in
                            VStack {
                                ZStack {
                                    GeometryReader { proxy in
                                        member.images.icon
                                        .resizable()
                                        .scaledToFill()
                                            .frame(width: proxy.size.width, height: proxy.size.height)
                                            .cornerRadius(50)
                                        VStack {
                                            Spacer()

                                        }
                                    }
                                }.frame(width:150.0)
                                .clipped()
                                .aspectRatio(1, contentMode: .fit)
                                
                               Text(member.displayName)
                                    .fontWeight(.medium)
                                    .background(Color(red: 1.0, green: 1.0, blue: 1.0, opacity: 0.6))
                            }
                            
                        }
                    }
                    }
                }
            }
            .padding(.horizontal, 25.0)
            
            Spacer()
        }
                    .edgesIgnoringSafeArea(.top)
    }
}

struct ArtistDetails_Previews: PreviewProvider {
    static var previews: some View {
        let sampleData = SampleData()
        
        return ArtistDetails(artist:
            sampleData.displayGroup,
             yearDateFormatter: sampleData.yearDateFormatter
        )
    }
}
