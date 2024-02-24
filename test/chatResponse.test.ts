import { StepType, StepTypeInfo } from "../src"

test("chatResponse", async () => {
  function enumToValues(enumType: any) {
    return Object.keys(enumType)
      .filter(key => isNaN(Number(key)))
      .map(key => enumType[key])
  }

  const stepTypes: StepType[] = enumToValues(StepType)

  for (const stepType of stepTypes) {
    const currentStepType = stepType
    const hasTokensResult = StepTypeInfo.hasTokens(currentStepType)
    const hasSourcesResult = StepTypeInfo.hasSources(currentStepType)

    if (
      [
        StepType.GENERATE_ANSWER,
        StepType.DONE,
        StepType.FINALIZE_RESULT
      ].includes(stepType)
    ) {
      expect(hasTokensResult).toBe(true)
    } else if (
      [StepType.SOURCES].includes(stepType)
    ) {
      expect(hasSourcesResult).toBe(true)
    } else {
      expect(hasTokensResult).toBe(false)
      expect(hasSourcesResult).toBe(false)
    }
  }

})
