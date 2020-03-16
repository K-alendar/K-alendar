//
//  ContentView.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-09.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import SwiftUI

struct ContentView: View {
    @State private var selection = 0
    
    var artist: Artist
    let yearDateFormatter: DateFormatter
 
    var body: some View {
//        TabView(selection: $selection){
            ArtistDetails(artist: artist, yearDateFormatter: yearDateFormatter)
//                .tabItem {
//                    VStack {
//                        Image("first")
//                        Text("First")
//                    }
//                }
//                .tag(0)
//
//            Text("Second View")
//                .font(.title)
//                .tabItem {
//                    VStack {
//                        Image("second")
//                        Text("Second")
//                    }
//                }
//                .tag(1)
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        let sampleData = SampleData()
        
        return ContentView(artist: sampleData.displayGroup, yearDateFormatter: sampleData.yearDateFormatter)
    }
}
