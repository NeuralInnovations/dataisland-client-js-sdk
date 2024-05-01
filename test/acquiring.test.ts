import { DebugCredential, dataIslandApp } from "../src"
import { UnitTest, appTest } from "../src/unitTest"
import { HOST, newTestUserToken, randomHash } from "./setup"



test("Acquiring", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    // make random name
    const randomName = `acq-test-${randomHash(20)}`
  
    // create app
    const app = await dataIslandApp(randomName, async builder => {
      builder.useHost(HOST)
      builder.useCredential(new DebugCredential(newTestUserToken()))
    })

    const plans = await app.acquiring.getPlans()

    expect(plans).not.toBeUndefined()
    expect(plans).not.toBeNull()

    expect(plans.plans).not.toBeUndefined()
    expect(plans.plans).not.toBeNull()
    expect(plans.plans.length).not.toBe(0)

    expect(plans.limitSegments).not.toBeUndefined()
    expect(plans.limitSegments).not.toBeNull()
    expect(plans.limitSegments.length).not.toBe(0)

    const plan = plans.plans[0]
    const segment = plans.limitSegments.find(segment => segment.key == plan.segmentKey)

    expect(segment).not.toBeUndefined()
    expect(segment).not.toBeNull()
  
    const userPlan = await app.acquiring.getUserPlan()

    expect(userPlan).not.toBeUndefined()
    expect(userPlan).not.toBeNull()
  })
})
  