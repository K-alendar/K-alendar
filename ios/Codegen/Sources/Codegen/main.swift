import ApolloCodegenLib
import Foundation

let parentFolderOfScriptFile = FileFinder.findParentFolder()
let sourceRootURL = parentFolderOfScriptFile
  .deletingLastPathComponent() // Sources
  .deletingLastPathComponent() // Codegen
  .deletingLastPathComponent() // ios

let cliFolderURL = sourceRootURL
.appendingPathComponent("Codegen")
.appendingPathComponent("ApolloCLI")

let endpoint = URL(string: "http://localhost:4000/graphql")!

let output = sourceRootURL
.appendingPathComponent("Kalendar")

let options = ApolloSchemaOptions(endpointURL: endpoint,
outputFolderURL: output)

do {
  try ApolloSchemaDownloader.run(with: cliFolderURL,
                                 options: options)
} catch {
  exit(1)
}

let codegenOptions = ApolloCodegenOptions(targetRootURL: output)

do {
    try ApolloCodegen.run(from: output,
                          with: cliFolderURL,
                          options: codegenOptions)
} catch {
    exit(1)
}
