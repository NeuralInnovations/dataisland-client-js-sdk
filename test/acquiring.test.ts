import { UnitTest, appTest } from "../src/unitTest"
import { testInOrganization } from "./setup"

test("Acquiring", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInOrganization(async (app, org) => {
      const plans = await org.acquiring.getPlans()

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

      const userPlan = await org.acquiring.getUserPlan()

      expect(userPlan).not.toBeUndefined()
      expect(userPlan).not.toBeNull()
    })
  })
})
