import { stdout } from "./singleLineLog";

/**
 * 进度条
 */
export class ProgressBar {
  private value: number = 0;
  private total: number = 0;
  private width: number;
  private title: string;
  private message: string;

  /**
   * 构造函数
   * @param title 标题
   * @param width 宽度
   */
  constructor(title: string, width: number) {
    this.width = width;
    this.title = title;
  }

  /**
   * 设置进度值
   * @param value 进度值
   * @param message 消息文字
   */
  public setValue(value: number, message?: string) {
    this.value = value;
    this.message = message;
    this.render();
  }

  /**
   * 进度值加一个值
   * @param value
   * @param message 消息文字
   */
  public addValue(value: number, message?: string) {
    this.value += value;
    this.message = message;
    this.render();
  }

  /**
   * 设置最大值
   * @param value 最大值
   */
  public setTotal(value: number) {
    this.total = value;
    this.render();
  }

  /**
   * 完成，将进度值设为最大值 100%
   * @param message 消息文字
   */
  public finish(message?: string) {
    this.value = this.total;
    this.message = message;
    this.render();
  }

  private render() {
    if (this.total > 0) {
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
      )}% ${cell}${empty} ${value}/${this.total} ${this.message || ""}`;

      // 在单行输出文本
      stdout(cmdText);
    }
  }
}
