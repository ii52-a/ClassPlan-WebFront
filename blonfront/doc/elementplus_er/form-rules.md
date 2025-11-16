# rules

## 开始
### rules需要form具有一个ref标签,例如formRef tips:ref与model用处不同！
### 在选择验证的过程中添加prop表明验证的标题
### 在script中填写一个rules验证格式为rules=reative{title:[{验证内容}]}
### 验证使用formRef.value.validate()验证内容

## 使用
- 验证时可以添加{validator:()=>{}}定义验证内容
- 可以使用pattern添加正则表达式验证


## 错误记录
### prop必须加在form-item上，其为最小验证单元，不能一个form-item验证多个prop选项 (!!)
### 