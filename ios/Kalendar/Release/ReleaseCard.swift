//
//  ReleaseCard.swift
//  Kalendar
//
//  Created by John Ivison on 2020-03-14.
//  Copyright © 2020 John Ivison. All rights reserved.
//

import SwiftUI

struct ReleaseCard: View {
    let release: Release
    
    var body: some View {
        HStack {
            VStack(alignment: .center) {
                Text(release.dayNumber)
                    .font(.system(size: 60))
                Text(release.dayName)
                    .font(.system(size: 35))
                    .offset(y: -15)
                    .padding(.bottom, -15)
            }
            .padding(.trailing, 8.0)
            
            VStack(alignment: .leading) {
                HStack {
                    Text(release.artist.displayName)
                        .fontWeight(.bold)
                    
                    Text(release.artist.secondaryDisplayName)
                        .font(.subheadline)
                        .foregroundColor(Color.gray)
                    
                    if release.type == ReleaseType.Debut {
//                        Image("debut")
                    }
                }
                Text(release.title)
                    .foregroundColor(Color.gray)
                Text(release.subtitle)
                    .font(.caption)
                    .foregroundColor(Color.gray)
                Spacer()
                Text(release.time)
                    .font(.caption)
                    .foregroundColor(Color.black)
            }
            .padding(.bottom, 5.0)
            .padding(.top, 9.0)
            
        Spacer()
        }
        .padding([.top, .bottom, .trailing], 5.0)
            .padding(.leading, 10.0)
            .frame(width: 300, height: 100)
        .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.black, lineWidth: 1))
    }
}

struct ReleaseCard_Previews: PreviewProvider {
    static var previews: some View {
        let sampleData = SampleData()
        
        return List {
            ReleaseCard(release: sampleData.displayRelease)
            ReleaseCard(release: sampleData.displayRelease1)
            ReleaseCard(release: sampleData.displayRelease2)
        }
    }
}
