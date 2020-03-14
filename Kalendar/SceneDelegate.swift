//
//  SceneDelegate.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-09.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import UIKit
import SwiftUI

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?


    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        // Use this method to optionally configure and attach the UIWindow `window` to the provided UIWindowScene `scene`.
        // If using a storyboard, the `window` property will automatically be initialized and attached to the scene.
        // This delegate does not imply the connecting scene or session are new (see `application:configurationForConnectingSceneSession` instead).

        // Create the SwiftUI view that provides the window contents.
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
        
        let contentView = ContentView(artist: displayGroup, yearDateFormatter: yearDateFormatter)
        

        // Use a UIHostingController as window root view controller.
        if let windowScene = scene as? UIWindowScene {
            let window = UIWindow(windowScene: windowScene)
            window.rootViewController = UIHostingController(rootView: contentView)
            self.window = window
            window.makeKeyAndVisible()
        }
    }

    func sceneDidDisconnect(_ scene: UIScene) {
        // Called as the scene is being released by the system.
        // This occurs shortly after the scene enters the background, or when its session is discarded.
        // Release any resources associated with this scene that can be re-created the next time the scene connects.
        // The scene may re-connect later, as its session was not neccessarily discarded (see `application:didDiscardSceneSessions` instead).
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        // Called when the scene has moved from an inactive state to an active state.
        // Use this method to restart any tasks that were paused (or not yet started) when the scene was inactive.
    }

    func sceneWillResignActive(_ scene: UIScene) {
        // Called when the scene will move from an active state to an inactive state.
        // This may occur due to temporary interruptions (ex. an incoming phone call).
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
        // Called as the scene transitions from the background to the foreground.
        // Use this method to undo the changes made on entering the background.
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        // Called as the scene transitions from the foreground to the background.
        // Use this method to save data, release shared resources, and store enough scene-specific state information
        // to restore the scene back to its current state.
    }


}

