import { Context, DebugCredential, UserEvent, UserInfoResponse, dataIslandApp } from "../src"
import { UserProfileImpl } from "../src/storages/user/userProfile.impl" // Update the import path based on your project structure
import { UnitTest, appTest } from "../src/unitTest"
import { HOST, newTestUserToken, randomHash } from "./setup"

test("UserProfile", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    // make random name
    const randomName = `org-test-${randomHash(20)}`

    // create app
    const app = await dataIslandApp(randomName, async builder => {
      builder.useHost(HOST)
      builder.useCredential(new DebugCredential(newTestUserToken()))
    })

    const userProfile = app.userProfile

    const updatedName = "newName"
    const updatedId = "newId"
    const updatedEducationInstitution = "newEducationInstitution"

    await userProfile.updateUser(updatedName, updatedId, updatedEducationInstitution)

    expect(userProfile.name).toBe(updatedName)
    expect(userProfile.binanceId).toBe(updatedId)
    expect(userProfile.educationalInstitution).toBe(updatedEducationInstitution)
  })})

describe("UserProfileImpl", () => {
  let userProfile: UserProfileImpl
  let contextMock: Context

  beforeEach(() => {
    // Создаем заглушки для зависимостей
    contextMock = {
      resolve: jest.fn(() => ({
        requestBuilder: jest.fn(() => ({
          searchParam: jest.fn(() => ({
            sendGet: jest.fn()
          }))
        }))
      }))
    } as any

    userProfile = new UserProfileImpl(contextMock)
  })

  const mockUserInfoResponse: UserInfoResponse = {
    adminInOrganization: ["123"],
    organizations: [],
    user: {
      id: "user123",
      profile: {
        name: "John Doe",
        email: "john.doe@example.com",
        binanceId: "12345"
      },
      isAnonymousMode: false,
      isDeleted: false,
      created_at: 0,
      modified_at: 0
    }
  }

  it("should initialize from UserInfoResponse", async () => {
    userProfile.initFrom(mockUserInfoResponse)
    expect(userProfile.id).toEqual("user123")
    expect(userProfile.name).toEqual("John Doe")
    expect(userProfile.email).toEqual("john.doe@example.com")
    expect(userProfile.isDeleted).toBeFalsy()
    expect(userProfile.createdAt).toEqual(new Date(0))
    expect(userProfile.modifiedAt).toEqual(new Date(0))
  })

  it("should throw error when accessing properties without initialization", () => {
    expect(() => userProfile.id).toThrow("The profile is not loaded.")
    expect(() => userProfile.name).toThrow("The profile is not loaded.")
    expect(() => userProfile.email).toThrow("The profile is not loaded.")
    expect(() => userProfile.isDeleted).toThrow("The profile is not loaded.")
    expect(() => userProfile.createdAt).toThrow("The profile is not loaded.")
    expect(() => userProfile.modifiedAt).toThrow("The profile is not loaded.")
  })

  it("should dispatch UserEvent.CHANGED when initialized", () => {
    const mockDispatch = jest.spyOn(userProfile, "dispatch")
    userProfile.initFrom(mockUserInfoResponse)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: UserEvent.CHANGED,
      data: userProfile
    })
  })
})
