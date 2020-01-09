import { ProgressBar } from "../src";
import { expect } from "chai";
import "mocha";

async function delay(mills: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, mills);
  });
}

describe("index", function() {
  before(() => {
    // clearTestFiles();
    // initTestFiles();
  });

  after(() => {
    // clearTestFiles();
  });

  it("ProgressBar ", async () => {
    const p = new ProgressBar("进度", 50);
    p.setTotal(100);

    for (let i = 0; i < 100; i++) {
      await delay(100);
      p.setValue(i);
    }
    p.finish();
  });
});
