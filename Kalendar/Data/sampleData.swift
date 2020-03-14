//
//  sampleData.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-14.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import Foundation
import SwiftUI

class SampleData {
    var yearDateFormatter = DateFormatter()
    var displayGroup: Group = Group(
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
                    icon: Image("redVelvet"),
                    banner: Image("redVelvetLarge"),
                    cardTall: Image("redVelvetCardTall"),
                    cardFlat: Image("redVelvetCardFlat")
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

    
    init() {
        displayGroup.addNewMember(startDate: Date(), endDate: nil, socialLinks: SocialLinks(), images: ArtistImages(icon: Image("yeri"), banner: Image("")), description: "Yeri", stageName: "Yeri", fullName: "김예림", isDebuted: true)

        displayGroup.addNewMember(startDate: Date(), endDate: nil, socialLinks: SocialLinks(), images: ArtistImages(icon: Image("seulgi"), banner: Image("")), description: "It's Seulgi", stageName: "Seulgi", fullName: "강슬기", isDebuted: false)

        displayGroup.addNewMember(startDate: Date(), endDate: nil, socialLinks: SocialLinks(), images: ArtistImages(icon: Image("irene"), banner: Image("")), description: "It's Irene", stageName: "Irene", fullName: "배주현", isDebuted: false)

        displayGroup.addNewMember(startDate: Date(), endDate: nil, socialLinks: SocialLinks(), images: ArtistImages(icon: Image("joy"), banner: Image("")), description: "It's Joy", stageName: "Joy", fullName: "박수영", isDebuted: false)

        displayGroup.addNewMember(startDate: Date(), endDate: nil, socialLinks: SocialLinks(), images: ArtistImages(icon: Image("wendy"), banner: Image("")), description: "It's Wendy", stageName: "Wendy", fullName: "손승완", isDebuted: false)

        yearDateFormatter.dateFormat = "yyyy"
    }
}





