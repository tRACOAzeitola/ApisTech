import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "Inventario"
    self.dependencyProvider = RCTAppDependencyProvider()
    self.initialProps = [:]
    
    // Configuração explícita da StatusBar
    if #available(iOS 13.0, *) {
        UIApplication.shared.statusBarStyle = .lightContent
    } else {
        UIApplication.shared.statusBarStyle = .lightContent
    }
    
    // Substituir performExpiringActivityWithReason por beginBackgroundTask
    if #available(iOS 13.0, *) {
        var backgroundTask: UIBackgroundTaskIdentifier = .invalid
        backgroundTask = application.beginBackgroundTask { 
            application.endBackgroundTask(backgroundTask)
            backgroundTask = .invalid
        }
    }
    
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    #if DEBUG
      return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
      return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
