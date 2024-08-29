import {appTest, UnitTest} from "../src/unitTest"
import {testInWorkspace} from "./setup"
import {LibrariesService} from "../src/services/librariesService"


test("Libraries", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInWorkspace(async (app, org, ws) => {
      const testLibraryName = "test"
      const testLibraryRegion = 0
      const libraryId = await app.libraries.createLibrary(testLibraryName, testLibraryRegion, true)

      expect(libraryId).not.toBeUndefined()
      expect(libraryId).not.toBeNull()
      expect(libraryId).not.toBe("")

      await expect(app.libraries.addOrgToLibrary(libraryId, org.id)).resolves.not.toThrow()

      let libraries = await app.libraries.getLibraries()

      let library = libraries.find(lib => lib.id === libraryId)

      expect(library).not.toBeUndefined()
      expect(library).not.toBeNull()

      expect(library.name).toBe(testLibraryName)
      expect(library.region).toBe(testLibraryRegion)

      let orgLib = library.organizations.find(o => o.id === org.id)
      expect(orgLib).not.toBeUndefined()
      expect(orgLib).not.toBeNull()

      await expect(ws.share(true)).resolves.not.toThrow()

      await app.resolve(LibrariesService).initialize()

      const libraryImpl = app.libraries.collection.find(lib => lib.id === libraryId)
      expect(libraryImpl).not.toBeUndefined()
      expect(libraryImpl).not.toBeNull()

      const page = await libraryImpl.query("", 0, 20)
      expect(page.folders.length).toBe(1)

      const orgFolder = page.folders[0]

      let orgFolderPage = await orgFolder.query("", 0, 20)
      // Check if workspace folder is available
      expect(orgFolderPage.folders.length).toBe(1)

      await expect(ws.share(false)).resolves.not.toThrow()

      orgFolderPage = await orgFolder.query("", 0, 20)
      // Check if workspace folder is available after sharing was turned off
      expect(orgFolderPage.folders.length).toBe(0)

      await expect(app.libraries.deleteOrgFromLibrary(libraryId, org.id)).resolves.not.toThrow()

      libraries = await app.libraries.getLibraries()
      library = libraries.find(lib => lib.id === libraryId)

      expect(library).not.toBeUndefined()
      expect(library).not.toBeNull()

      orgLib = library.organizations.find(o => o.id === org.id)
      expect(orgLib).toBeUndefined()

      await expect(app.libraries.deleteLibrary(libraryId)).resolves.not.toThrow()

      libraries = await app.libraries.getLibraries()

      library = libraries.find(lib => lib.id === libraryId)
      expect(library).toBeUndefined()
    })
  })
})
