import { StepType, StepTypeInfo } from "../src/dto/chatResponse"

test("chatResponse", async () => {
  const stepTypes = ["GENERATE_ANSWER", "DONE", "FINALIZE_RESULT", "PREPARE", "SOURCES"]

  for (const stepType of stepTypes) {
    const currentStepType = StepType[stepType]
    const hasTokensResult = StepTypeInfo.hasTokens(currentStepType)
    const hasSourcesResult = StepTypeInfo.hasSources(currentStepType)

    if (
      stepType === "GENERATE_ANSWER" 
        || stepType === "DONE"
        || stepType === "FINALIZE_RESULT"
    ) {
      expect(hasTokensResult).toBe(true)
    } else if (
      stepType === "SOURCES"
    ) {
      expect(hasSourcesResult).toBe(true)
    } else {
      expect(hasTokensResult).toBe(false)
      expect(hasSourcesResult).toBe(false)
    }
  }
    
})
