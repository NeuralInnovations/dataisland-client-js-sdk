import {appTest, UnitTest} from "../src/unitTest"
import {testInWorkspace} from "./setup"
import fs from "fs"
import {
  FileProcessingStage,
  FilesEvent,
  QueryFlowStatus,
  UploadFile
} from "../src"


test("QueryFlows", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInWorkspace(async (app, org, ws) => {
      expect(app).not.toBeUndefined()
      expect(org).not.toBeUndefined()

      const buffer2 = fs.readFileSync("test/data/test_file2.pdf")
      const file_obj: UploadFile = new File([new Uint8Array(buffer2)], "test_file2.pdf", {
        type: "application/pdf"
      })

      await ws.files.upload([file_obj])

      const files = await ws.files.query("", 0, 10)

      const file = files.files[0]
      let file_loaded = false

      file.subscribe((evt) => {
        if (evt.data.status > FileProcessingStage.PROCESSING) {
          file_loaded = true
        }
      }, FilesEvent.UPDATED)

      while (!file_loaded) {
        await new Promise(f => setTimeout(f, 500))
      }

      await expect(file.status).toBe(FileProcessingStage.DONE)

      const buffer = fs.readFileSync("test/data/test_csv.csv")
      const test_file: UploadFile = new File([new Uint8Array(buffer)], "test_csv.csv", {
        type: "application/csv"
      })

      const flow_id = await org.queryFlows.create( ws.id, file.id, test_file)

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

      await ws.files.delete([file.id])
      await expect(org.queryFlows.delete(flow_id)).resolves.not.toThrow()
    })
  })
})
