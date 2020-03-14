//
//  ArtistDetails.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-11.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import SwiftUI

struct ArtistDetails: View {
    var artist: ArtistProtocol
    let yearDateFormatter: DateFormatter
    
    var body: some View {
        VStack(alignment: .leading) {
            VStack {
                artist.images.large
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .cornerRadius(15)
            }.edgesIgnoringSafeArea(.top)
                
            HStack(alignment: .bottom) {
                artist.images.logo
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
                            .font(.title)
                            .bold()
                        Text(artist.secondaryDisplayName)
                            .font(.headline)
                            .foregroundColor(Color(hue: 1.0, saturation: 0.0, brightness: 0.456))
                    }
                    Text(artist.company.name)
                        .foregroundColor(Color.gray)
                        .padding(.bottom, 3.0)
                }
                
            }.padding(.leading).offset(y: -94)
            
            
            VStack(alignment: .leading) {
                HStack() {
                    Image("members")
                    artist.isGroup ? Text("\(artist.getMemberNum) members")
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
                        ForEach(artist.getMembers, id: \.id) { member in
                            VStack {
                                ZStack {
                                    GeometryReader { proxy in
                                        member.images.logo
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
            .offset(y: -94)
            
            Spacer()
        }
    }
}

struct ArtistDetails_Previews: PreviewProvider {
    static var previews: some View {
        let displayGroup = Group(
                    id: 1,
                    startDate: Date(timeIntervalSinceNow: -249000000),
                    endDate: nil,
                    company: Company(name: "SM Entertainment"),
                    socialLinks: SocialLinks(
                        twitter: "https://twitter.com/RVsmtown",
                        spotify: "https://open.spotify.com/artist/1z4g3DjTBBZKhvAroFlhOM",
                        youtube: "https://www.youtube.com/user/SMTOWN"
                    ),
                    images: ArtistImages(
                        logo: Image("redVelvet"),
                        large: Image("redVelvetLarge")
                    ),
                    description: """
        Red Velvet (Hangul: 레드벨벳) is a South Korean girl group formed by SM Entertainment. The group debuted on August 1, 2014, with the digital single "Happiness" and four group members: Irene, Seulgi, Wendy, and Joy. In March 2015, Yeri was added into the group.

        Since their debut, Red Velvet has released two studio albums, two reissue albums, and nine extended plays in Korean, with eleven of them topping South Korea's Gaon Album Chart. Their singles "Happiness", "Ice Cream Cake", "Dumb Dumb", "Russian Roulette", "Rookie", "Peek-a-Boo", "Bad Boy", and "Psycho" have all charted in the top five on Gaon Digital Chart, while their singles "Red Flavor" and "Power Up" topped the chart upon release. Additionally, they made their Japanese debut in July 2018 with the extended play #Cookie Jar.

        Regarded as one of the most popular K-pop groups worldwide by Time and Billboard, Red Velvet has received several awards for music, choreography, and popularity, including the Golden Disc New Artist Award in 2015 and the Mnet Asian Music Award for Best Female Group in 2017.
        """,
                    englishName: "Red Velvet",
                    foreignName: "레드 벨벳",
                    members: []
                    )
        
        displayGroup.addNewMember(startDate: Date(), endDate: nil, socialLinks: SocialLinks(), images: ArtistImages(logo: Image("yeri"), large: Image("")), description: "Yeri", stageName: "Yeri", fullName: "김예림", isDebuted: true)
        
        displayGroup.addNewMember(startDate: Date(), endDate: nil, socialLinks: SocialLinks(), images: ArtistImages(logo: Image("seulgi"), large: Image("")), description: "It's Seulgi", stageName: "Seulgi", fullName: "강슬기", isDebuted: false)
        
        displayGroup.addNewMember(startDate: Date(), endDate: nil, socialLinks: SocialLinks(), images: ArtistImages(logo: Image("irene"), large: Image("")), description: "It's Irene", stageName: "Irene", fullName: "배주현", isDebuted: false)
        
        displayGroup.addNewMember(startDate: Date(), endDate: nil, socialLinks: SocialLinks(), images: ArtistImages(logo: Image("joy"), large: Image("")), description: "It's Joy", stageName: "Joy", fullName: "박수영", isDebuted: false)
        
        displayGroup.addNewMember(startDate: Date(), endDate: nil, socialLinks: SocialLinks(), images: ArtistImages(logo: Image("wendy"), large: Image("")), description: "It's Wendy", stageName: "Wendy", fullName: "손승완", isDebuted: false)
        
        let yearDateFormatter = DateFormatter()
        yearDateFormatter.dateFormat = "yyyy"
        
        return ArtistDetails(artist:
            displayGroup,
            yearDateFormatter: yearDateFormatter
        )
    }
}
