import { stdout } from "single-line-log";

export class ProgressBar {
  private value: number = 0;
  private total: number = 0;
  private width: number;
  private title: string;

  constructor(title: string, width: number) {
    this.width = width;
    this.title = title;
  }

  setValue(value: number) {
    this.value = value;
    this.render();
  }

  addValue(value: number) {
    this.value += value;
    this.render();
  }

  setTotal(value: number) {
    this.total = value;
    this.render();
  }

  finish() {
    this.value = this.total;
    this.render();
  }

  render() {
    if (this.total > 0 && this.value > 0) {
      const value = this.value > this.total ? this.total : this.value;
      const percent = Number((value / this.total).toFixed(4)); // 计算进度(子任务的 完成数 除以 总数)
      const cell_num = Math.floor(percent * this.width); // 计算需要多少个 > 符号来拼凑图案

      // 拼接黑色条
      let cell = "";
      for (let i = 0; i < cell_num; i++) {
        cell += ">";
      }

      // 拼接灰色条
      let empty = "";
      for (let i = 0; i < this.width - cell_num; i++) {
        empty += "-";
      }

      // 拼接最终文本
      const cmdText = `${this.title}: ${(100 * percent).toFixed(
        2
      )}% ${cell}${empty} ${value}/${this.total}`;

      // 在单行输出文本
      stdout(cmdText);
    }
  }
}
