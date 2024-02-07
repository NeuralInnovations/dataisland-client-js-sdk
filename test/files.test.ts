import fs from "fs"
import { testInWorkspace } from "./setup"

test("Files", async () => {
  await testInWorkspace(async (app, org, ws) => {

    expect(app).not.toBeUndefined()
    expect(org).not.toBeUndefined()

    const buffer = fs.readFileSync("test/data/test_file.pdf")
    
    const file_obj = new File([new Uint8Array(buffer)], "test_file.pdf", {
      type: "application/pdf"
    })

    const filePromise = ws.files.upload(file_obj)
    await expect(filePromise).resolves.not.toThrow()
    const file = await filePromise

    expect(file).not.toBeUndefined()
    expect(file).not.toBeNull()
    expect(file.name).toBe("test_file.pdf")

    await file.update_status()

    expect(file.status).not.toBeUndefined()
    expect(file.status).not.toBeNull()
    if (!file.status.success && file.status.error) {
      console.error(file.status.error)
    }
    expect(file.status.success).toBe(true)
    expect(file.status.file_id).toBe(file.id)
    expect(file.status.file_parts_count).toBeGreaterThanOrEqual(file.status.completed_parts_count)

    while (
      file.status.success &&
      file.status.completed_parts_count !== file.status.file_parts_count
    ) {
      await new Promise(r => setTimeout(r, 1000))
      await file.update_status()
    }

    expect(file.status.success && file.status.completed_parts_count).toBe(file.status.file_parts_count)

    const queryPromise = ws.files.query("", 0, 20)
    await expect(queryPromise).resolves.not.toThrow()
    const filePage = await queryPromise
    expect(filePage).not.toBeUndefined()
    expect(filePage).not.toBeNull()
    expect(filePage.files.length).toBe(1)
    expect(filePage.pages).toBe(1)

    await expect(ws.files.delete(file.id)).resolves.not.toThrow()
  })
})
