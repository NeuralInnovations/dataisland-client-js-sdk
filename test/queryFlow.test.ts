import {appTest, UnitTest} from "../src/unitTest"
import {testInWorkspace, uploadTestFile} from "./setup"
import fs from "fs"
import {
  QueryFlowStatus,
  UploadFile
} from "../src"


test("QueryFlows", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInWorkspace(async (app, org, ws) => {
      expect(app).not.toBeUndefined()
      expect(org).not.toBeUndefined()

      const file = await uploadTestFile(org, ws,"test/data/test_file2.pdf", "application/pdf")

      const buffer = fs.readFileSync("test/data/test_csv.csv")
      const test_file: UploadFile = new File([new Uint8Array(buffer)], "test_csv.csv", {
        type: "application/csv"
      })

      const flow_id = await org.queryFlows.create( ws.id, file, test_file)

      expect(flow_id).not.toBeUndefined()
      expect(flow_id).not.toBeNull()

      const flow_obj = org.queryFlows.collection.find(obj => obj.id === flow_id)

      expect(flow_obj).not.toBeUndefined()
      expect(flow_obj).not.toBeNull()

      let flow_ended = false

      if (flow_obj.status !== QueryFlowStatus.IN_PROGRESS){
        flow_ended = true
      }else {
        flow_obj.subscribe((evt) => {
          if (evt.data.status !== QueryFlowStatus.IN_PROGRESS){
            flow_ended = true
          }
        })
      }

      while (!flow_ended) {
        await new Promise(f => setTimeout(f, 1000))
      }

      expect(flow_obj.status).toBe(QueryFlowStatus.DONE)

      await ws.files.delete([file])
      await expect(org.queryFlows.delete(flow_id)).resolves.not.toThrow()
    })
  })
})
