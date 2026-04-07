//
//  DashkadeApp.swift
//  Dashkade
//
//  Created by LeanidHamburg on 07.04.26.
//

// DashkadeApp.swift
// Entry point

import SwiftUI

@main
struct DashkadeApp: App {
    var body: some Scene {
        WindowGroup {
            TranslatorScreen()
                .preferredColorScheme(.dark)
        }
    }
}
