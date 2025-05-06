import { appTest, UnitTest } from "../src/unitTest"
import { testInWorkspace } from "./setup"
import fs from "fs"
import {
  QueryFlowState,
  UploadFile
} from "../src"

test.skip("QueryFlows", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInWorkspace(async (app, org, ws) => {
      expect(app).not.toBeUndefined()
      expect(org).not.toBeUndefined()

      const buffer = fs.readFileSync("test/data/test_file2.pdf")
      const test_file: UploadFile = new File([new Uint8Array(buffer)], "test_file2.pdf", {
        type: "application/pdf"
      })

      const table_buffer = fs.readFileSync("test/data/test_csv.csv")
      const table_test_file: UploadFile = new File([new Uint8Array(table_buffer)], "test_csv.csv", {
        type: "application/csv"
      })

      const flow_name = "test"

      const flow_id = await org.queryFlows.create(flow_name, [ws.id], test_file, table_test_file)

      expect(flow_id).not.toBeUndefined()
      expect(flow_id).not.toBeNull()

      const flow_obj = (await org.queryFlows.getQueryFlows()).find(obj => obj.id === flow_id)

      expect(flow_obj).not.toBeUndefined()
      expect(flow_obj).not.toBeNull()
      expect(flow_obj!.name).toBe(flow_name)

      let flow_ended = false

      if (flow_obj!.state !== QueryFlowState.IN_PROGRESS) {
        flow_ended = true
      } else {
        flow_obj!.subscribe((evt) => {
          if (evt.data.state !== QueryFlowState.IN_PROGRESS) {
            flow_ended = true
          }
        })
      }

      while (!flow_ended) {
        await new Promise(f => setTimeout(f, 1000))
      }

      expect(flow_obj!.state).toBe(QueryFlowState.DONE)

      await expect(org.queryFlows.delete(flow_id)).resolves.not.toThrow()
    })
  })
})
