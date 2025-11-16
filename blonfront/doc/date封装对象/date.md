# date
## 错误记录
### 创建对象
- const date = new Date(2025, 2, 15, 14, 30, 20);  其中2表示3月份,从0为1月
- console.log(date.toLocaleDateString()); 输出：2025/3/15
### 比较
- 使用比较运算符对一个Date对象比较，本质是比较其时间戳